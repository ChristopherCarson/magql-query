import * as R from 'ramda'
import { VariableType } from 'json-to-graphql-query'

/*
create
edit
index
select
detail
tooltip
check_delete
delete
search
*/

const QueryType = {
  INDEX: 'index',
  DETAIL: 'detail',
  SELECT: 'select',
  TOOLTIP: 'tooltip',
  INDEX_REL: 'indexRelationship',
  DETAIL_REL: 'detailRelationship',
  SELECT_REL: 'selectRelationship',
  SEARCH: 'search',
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  DELETE_CASCADES: 'deleteCascades'
}

// begin conveyor util functions

const getField = (schema, modelName, fieldName) =>
  R.pipe(getFields, R.prop(fieldName))(schema, modelName)

const getFields = (schema, modelName) =>
  getModelAttribute(schema, modelName, 'fields')

const getModelAttribute = (schema, modelName, attributeName) =>
  R.pipe(getModel, R.prop(attributeName))(schema, modelName)

const getModel = (schema, modelName) => R.prop(modelName, schema)

const getTooltipFields = (schema, modelName, customProps = null) => {
  return getShownFields({ schema, modelName, type: 'showTooltip', customProps })
}

const getShownFields = ({
  schema,
  modelName,
  type,
  node,
  data,
  user,
  customProps
}) => {
  const fieldOrder = R.prop('fieldOrder', getModel(schema, modelName))
  return R.filter(fieldName => {
    let show
    switch (type) {
      case 'showCreate':
      case 'showDetail':
        show = R.propOr(
          !R.equals('id', fieldName),
          type,
          getField(schema, modelName, fieldName)
        )
        break
      case 'showIndex':
      case 'showTooltip':
        show = R.propOr(false, type, getField(schema, modelName, fieldName))
        break
      default:
        show = R.prop(type, getField(schema, modelName, fieldName))
    }
    if (R.type(show) === 'Function') {
      show = show({
        schema,
        modelName,
        fieldName,
        node,
        data,
        user,
        customProps
      })
    }
    return show
  }, fieldOrder)
}

const getType = ({ schema, modelName, fieldName }) => {
  const field = getField(schema, modelName, fieldName)
  if (isRel(field)) {
    return R.path(['type', 'type'], field)
  }
  return R.prop('type', field)
}

const getSearchable = (schema, modelName) => {
  return R.propOr(false, 'searchable', getModel(schema, modelName))
}

// end conveyor util functions

const isRel = field => {
  return typeof R.prop('type', field) === 'object'
}

const getRequiredFields = model =>
  R.union(['__typeName', 'id'], R.pathOr([], ['queryRequired'], model))

const getRelTableFields = ({ fieldName, model }) =>
  R.pathOr([], ['fields', fieldName, 'type', 'tableFields'], model)

const getQueryName = (schema, modelName, queryType) => {
  const model = getModel(schema, modelName)
  switch (queryType) {
    case QueryType.INDEX:
    case QueryType.SELECT:
      return model.queryAllName
    case QueryType.DETAIL:
    case QueryType.TOOLTIP:
      return model.queryName
    case QueryType.CREATE:
    case QueryType.UPDATE:
    case QueryType.DELETE:
      return R.path([modelName, 'queryName'], schema)
    default:
      return queryType
  }
}

const getSortVariable = modelName => `${modelName}Sort`

const getListVariables = modelName => ({
  filter: `${modelName}Filter`,
  sort: `[${getSortVariable(modelName)}!]`
})

const detailVariables = {
  id: 'Int!'
}

const getVariables = ({ modelName, queryType }) => {
  switch (queryType) {
    case QueryType.INDEX:
      return getListVariables(modelName)
    case QueryType.DELETE:
    case QueryType.DETAIL:
    case QueryType.TOOLTIP:
      return detailVariables
    case QueryType.SELECT:
      return { sort: `[${getSortVariable(modelName)}!]` }
    case QueryType.SEARCH:
      return { queryString: 'String!' }
    case QueryType.CREATE:
      return { input: `${modelName}InputRequired!` }
    case QueryType.UPDATE:
      return { input: `${modelName}Input!`, id: 'Int!' }
    case QueryType.DELETE_CASCADES:
      return { modelName: 'String!', id: 'Int!' }
  }
}

const getArgs = queryType => {
  switch (queryType) {
    case QueryType.INDEX:
      return {
        filter: new VariableType('filter'),
        sort: new VariableType('sort')
      }
    case QueryType.DELETE:
    case QueryType.DETAIL:
    case QueryType.TOOLTIP:
      return { id: new VariableType('id') }
    case QueryType.SELECT:
      return { sort: new VariableType('sort') }
    case QueryType.SEARCH:
      return { queryString: new VariableType('queryString') }
    case QueryType.CREATE:
      return { input: new VariableType('input') }
    case QueryType.UPDATE:
      return { input: new VariableType('input'), id: new VariableType('id') }
    case QueryType.DELETE_CASCADES:
      return {
        tableName: new VariableType('modelName'),
        id: new VariableType('id')
      }
  }
}

const getFieldQueryType = queryType => {
  switch (queryType) {
    case QueryType.INDEX:
      return QueryType.INDEX_REL
    case QueryType.DETAIL:
      return QueryType.DETAIL_REL
    case QueryType.SELECT:
      return QueryType.SELECT_REL
    default:
      return queryType
  }
}

const getQueryIndexFields = model => {
  const fields = R.pipe(
    R.prop('fields'),
    R.map(field => R.prop('showIndex', field) || R.prop('queryIndex', field))
  )(model)
  return R.filter(R.identity, fields)
}

const getQueryDetailFields = model => {
  // fieldName => (true if field.showDetail | false) if non-relationship | Relationship.type
  const fields = R.filter(
    field =>
      R.propOr(true, 'showDetail', field) || R.prop('queryDetail', field),
    R.prop('fields', model)
  )
  return R.mapObjIndexed((val, key) => {
    // Assume showDetail is true because conveyor assumes it is true
    const show =
      R.pathOr(true, ['fields', key, 'showDetail'], model) ||
      R.path(['fields', key, 'queryDetail'], model)

    return R.pathOr(show, ['fields', key, 'type', 'type'], model)
  }, fields)
}

// needs to be removed?
const makeRelayNodeConnection = nodeQueryObj => ({
  __typename: true,
  ...nodeQueryObj
})

const getRelFieldObject = ({ schema, modelName, fieldName }) => {
  const relFieldObjet = {
    id: true
  }
  const targetModel = R.path(
    ['type', 'target'],
    getField(schema, modelName, fieldName)
  )
  const targetModelDisplayField = R.propOr(
    'name',
    'displayField',
    getModel(schema, targetModel)
  )
  if (targetModelDisplayField) {
    relFieldObjet[targetModelDisplayField] = true
  } // todo: targetModelDisplayField can be function and not string???
  return relFieldObjet
}

const buildTooltipFieldsObject = ({ schema, modelName }) => {
  const fields = getTooltipFields(schema, modelName)
  return R.pipe(
    R.reduce((accumulator, fieldName) => {
      const type = getType({ schema, modelName, fieldName })
      if (type.includes('ToMany')) {
        return R.assoc(
          fieldName,
          makeRelayNodeConnection(
            getRelFieldObject({ schema, modelName, fieldName })
          ),
          accumulator
        )
      } else if (type.includes('ToOne')) {
        return R.assoc(
          fieldName,
          getRelFieldObject({ schema, modelName, fieldName }),
          accumulator
        )
      } else {
        return R.assoc(fieldName, true, accumulator)
      }
    }, {})
  )(fields)
}

const pickFields = (arr, fields) =>
  R.pickBy((val, key) => R.includes(key, arr), fields)

const buildFieldsObject = ({
  schema,
  queryType,
  modelName,
  queryFields = []
}) => {
  const model = getModel(schema, modelName)
  const required = getRequiredFields(model)
  const requiredObj = required.reduce(
    (acc, val) => ({ ...acc, [val]: true }),
    {}
  )

  if (queryType === QueryType.TOOLTIP) {
    return buildTooltipFieldsObject({ schema, modelName })
  }

  let fields = (() => {
    switch (queryType) {
      case QueryType.INDEX:
        return getQueryIndexFields(model)
      case QueryType.DETAIL:
        return getQueryDetailFields(model)
      case QueryType.DETAIL_REL:
        return pickFields(queryFields, getQueryDetailFields(model))
      default:
        return {}
    }
  })()
  fields = R.mergeDeepLeft(requiredObj, fields)
  // replace with query object when fieldName is Relationship type
  fields = R.mapObjIndexed((val, key) => {
    const field = getField(schema, modelName, key)
    if (!isRel(field)) {
      return val
    }

    return buildFieldsObject({
      schema,
      queryType: getFieldQueryType(queryType),
      modelName: R.path(['type', 'target'], field),
      queryFields: getRelTableFields({ model, fieldName: key })
    })
  }, fields)

  return fields
}

const buildSearchFieldsArray = schema => {
  const fieldsArray = []
  R.forEachObjIndexed(model => {
    if (getSearchable(schema, model.modelName)) {
      fieldsArray.push(buildSearchFieldsObject(schema, model))
    }
  }, schema)
  return fieldsArray
}

const buildSearchFieldsObject = (schema, model) => {
  const required = getRequiredFields(model)
  const requiredObj = required.reduce(
    (acc, val) => ({ ...acc, [val]: true }),
    {}
  )

  let fields = {}
  fields.id = true
  if (R.type(model.displayField) === 'String') {
    fields[model.displayField] = true
  }

  fields = R.mergeDeepLeft(requiredObj, fields)

  fields.__typeName = model.modelName

  fields = R.mapObjIndexed((val, key) => {
    const field = getField(schema, model.modelName, key)
    if (!isRel(field)) {
      return val
    }

    return buildSearchFieldsObject(
      schema,
      getModel(schema, R.path(['type', 'target'], field))
    )
  }, fields)

  return fields
}

const buildDeleteCascadesArray = schema => {
  const cascadesArray = []
  R.forEachObjIndexed(model => {
    cascadesArray.push(buildCascadesObject(schema, model))
  }, schema)
  return cascadesArray
}

const buildCascadesObject = (schema, model) => {
  const required = getRequiredFields(model)
  const requiredObj = required.reduce(
    (acc, val) => ({ ...acc, [val]: true }),
    {}
  )

  let cascades = {}
  cascades.__typename = true
  cascades.id = true
  if (R.type(model.displayField) === 'String') {
    cascades[model.displayField] = true
  }

  cascades = R.mergeDeepLeft(requiredObj, cascades)

  cascades.__typeName = model.modelName

  cascades = R.mapObjIndexed((val, key) => {
    const field = getField(schema, model.modelName, key)
    if (!isRel(field)) {
      return val
    }

    return buildCascadesObject(
      schema,
      getModel(schema, R.path(['type', 'target'], field))
    )
  }, cascades)

  return cascades
}

export const makeQueryBuilder = schema => {
  return ({ modelName, queryType = QueryType.INDEX }) => {
    const queryName = getQueryName(schema, modelName, queryType)
    const queryVariables = getVariables({ modelName, queryType })

    switch (queryType) {
      case QueryType.INDEX:
      case QueryType.DETAIL:
      case QueryType.SELECT:
      case QueryType.TOOLTIP:
        return {
          query: {
            __variables: queryVariables,
            [queryName]: {
              __args: getArgs(queryType),
              result: {
                ...buildFieldsObject({ schema, modelName, queryType })
              },
              errors: true
            }
          }
        }
      case QueryType.SEARCH:
        return {
          query: {
            __variables: queryVariables,
            search: {
              __args: getArgs(queryType),
              __typename: true,
              __on: buildSearchFieldsArray(schema)
            }
          }
        }
      case QueryType.CREATE:
      case QueryType.UPDATE:
      case QueryType.DELETE:
        return {
          mutation: {
            __variables: queryVariables,
            [`${queryType}${modelName}`]: {
              __args: getArgs(queryType),
              [`${queryName}`]: {
                __typename: true,
                id: true
              },
              errors: true
            }
          }
        }
      case QueryType.DELETE_CASCADES:
        return {
          query: {
            __variables: queryVariables,
            checkDelete: {
              __args: getArgs(queryType),
              __on: buildDeleteCascadesArray(schema)
            }
          }
        }
    }
  }
}
