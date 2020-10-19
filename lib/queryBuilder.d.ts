import { VariableType } from 'json-to-graphql-query';
import { SchemaBuilder } from '@autoinvent/conveyor-schema';
export declare enum QueryType {
    INDEX = "index",
    DETAIL = "detail",
    SELECT = "select",
    TOOLTIP = "tooltip",
    INDEX_REL = "indexRelationship",
    DETAIL_REL = "detailRelationship",
    SELECT_REL = "selectRelationship",
    SEARCH = "search",
    CREATE = "create",
    UPDATE = "update",
    DELETE = "delete",
    DELETE_CASCADES = "deleteCascades"
}
export declare const makeQueryBuilder: (schema: SchemaBuilder) => ({ modelName, queryType }: {
    modelName: string;
    queryType: QueryType;
}) => {
    query: {
        [x: number]: {
            __args: {
                filter: VariableType;
                sort: VariableType;
                page: VariableType;
                id?: undefined;
                queryString?: undefined;
                input?: undefined;
                tableName?: undefined;
            } | {
                id: VariableType;
                filter?: undefined;
                sort?: undefined;
                page?: undefined;
                queryString?: undefined;
                input?: undefined;
                tableName?: undefined;
            } | {
                sort: VariableType;
                filter?: undefined;
                page?: undefined;
                id?: undefined;
                queryString?: undefined;
                input?: undefined;
                tableName?: undefined;
            } | {
                queryString: VariableType;
                filter?: undefined;
                sort?: undefined;
                page?: undefined;
                id?: undefined;
                input?: undefined;
                tableName?: undefined;
            } | {
                input: VariableType;
                filter?: undefined;
                sort?: undefined;
                page?: undefined;
                id?: undefined;
                queryString?: undefined;
                tableName?: undefined;
            } | {
                input: VariableType;
                id: VariableType;
                filter?: undefined;
                sort?: undefined;
                page?: undefined;
                queryString?: undefined;
                tableName?: undefined;
            } | {
                tableName: VariableType;
                id: VariableType;
                filter?: undefined;
                sort?: undefined;
                page?: undefined;
                queryString?: undefined;
                input?: undefined;
            } | undefined;
            result: {};
            errors: boolean;
            count: boolean;
        };
        __variables: {
            id: string;
        } | {
            filter: string;
            sort: string;
            page: string;
        } | {
            sort: string;
            queryString?: undefined;
            input?: undefined;
            id?: undefined;
            modelName?: undefined;
        } | {
            queryString: string;
            sort?: undefined;
            input?: undefined;
            id?: undefined;
            modelName?: undefined;
        } | {
            input: string;
            sort?: undefined;
            queryString?: undefined;
            id?: undefined;
            modelName?: undefined;
        } | {
            input: string;
            id: string;
            sort?: undefined;
            queryString?: undefined;
            modelName?: undefined;
        } | {
            modelName: string;
            id: string;
            sort?: undefined;
            queryString?: undefined;
            input?: undefined;
        } | undefined;
        search?: undefined;
        checkDelete?: undefined;
    };
    mutation?: undefined;
} | {
    query: {
        __variables: {
            id: string;
        } | {
            filter: string;
            sort: string;
            page: string;
        } | {
            sort: string;
            queryString?: undefined;
            input?: undefined;
            id?: undefined;
            modelName?: undefined;
        } | {
            queryString: string;
            sort?: undefined;
            input?: undefined;
            id?: undefined;
            modelName?: undefined;
        } | {
            input: string;
            sort?: undefined;
            queryString?: undefined;
            id?: undefined;
            modelName?: undefined;
        } | {
            input: string;
            id: string;
            sort?: undefined;
            queryString?: undefined;
            modelName?: undefined;
        } | {
            modelName: string;
            id: string;
            sort?: undefined;
            queryString?: undefined;
            input?: undefined;
        } | undefined;
        search: {
            __args: {
                filter: VariableType;
                sort: VariableType;
                page: VariableType;
                id?: undefined;
                queryString?: undefined;
                input?: undefined;
                tableName?: undefined;
            } | {
                id: VariableType;
                filter?: undefined;
                sort?: undefined;
                page?: undefined;
                queryString?: undefined;
                input?: undefined;
                tableName?: undefined;
            } | {
                sort: VariableType;
                filter?: undefined;
                page?: undefined;
                id?: undefined;
                queryString?: undefined;
                input?: undefined;
                tableName?: undefined;
            } | {
                queryString: VariableType;
                filter?: undefined;
                sort?: undefined;
                page?: undefined;
                id?: undefined;
                input?: undefined;
                tableName?: undefined;
            } | {
                input: VariableType;
                filter?: undefined;
                sort?: undefined;
                page?: undefined;
                id?: undefined;
                queryString?: undefined;
                tableName?: undefined;
            } | {
                input: VariableType;
                id: VariableType;
                filter?: undefined;
                sort?: undefined;
                page?: undefined;
                queryString?: undefined;
                tableName?: undefined;
            } | {
                tableName: VariableType;
                id: VariableType;
                filter?: undefined;
                sort?: undefined;
                page?: undefined;
                queryString?: undefined;
                input?: undefined;
            } | undefined;
            __typename: boolean;
            __on: object[];
        };
        checkDelete?: undefined;
    };
    mutation?: undefined;
} | {
    mutation: {
        [x: string]: {
            id: string;
        } | {
            filter: string;
            sort: string;
            page: string;
        } | {
            sort: string;
            queryString?: undefined;
            input?: undefined;
            id?: undefined;
            modelName?: undefined;
        } | {
            queryString: string;
            sort?: undefined;
            input?: undefined;
            id?: undefined;
            modelName?: undefined;
        } | {
            input: string;
            sort?: undefined;
            queryString?: undefined;
            id?: undefined;
            modelName?: undefined;
        } | {
            __args: {
                filter: VariableType;
                sort: VariableType;
                page: VariableType;
                id?: undefined;
                queryString?: undefined;
                input?: undefined;
                tableName?: undefined;
            } | {
                id: VariableType;
                filter?: undefined;
                sort?: undefined;
                page?: undefined;
                queryString?: undefined;
                input?: undefined;
                tableName?: undefined;
            } | {
                sort: VariableType;
                filter?: undefined;
                page?: undefined;
                id?: undefined;
                queryString?: undefined;
                input?: undefined;
                tableName?: undefined;
            } | {
                queryString: VariableType;
                filter?: undefined;
                sort?: undefined;
                page?: undefined;
                id?: undefined;
                input?: undefined;
                tableName?: undefined;
            } | {
                input: VariableType;
                filter?: undefined;
                sort?: undefined;
                page?: undefined;
                id?: undefined;
                queryString?: undefined;
                tableName?: undefined;
            } | {
                input: VariableType;
                id: VariableType;
                filter?: undefined;
                sort?: undefined;
                page?: undefined;
                queryString?: undefined;
                tableName?: undefined;
            } | {
                tableName: VariableType;
                id: VariableType;
                filter?: undefined;
                sort?: undefined;
                page?: undefined;
                queryString?: undefined;
                input?: undefined;
            } | undefined;
            result: {
                __typename: boolean;
                id: boolean;
            };
            errors: boolean;
        } | undefined;
        __variables: {
            id: string;
        } | {
            filter: string;
            sort: string;
            page: string;
        } | {
            sort: string;
            queryString?: undefined;
            input?: undefined;
            id?: undefined;
            modelName?: undefined;
        } | {
            queryString: string;
            sort?: undefined;
            input?: undefined;
            id?: undefined;
            modelName?: undefined;
        } | {
            input: string;
            sort?: undefined;
            queryString?: undefined;
            id?: undefined;
            modelName?: undefined;
        } | {
            input: string;
            id: string;
            sort?: undefined;
            queryString?: undefined;
            modelName?: undefined;
        } | {
            modelName: string;
            id: string;
            sort?: undefined;
            queryString?: undefined;
            input?: undefined;
        } | undefined;
    };
    query?: undefined;
} | {
    query: {
        __variables: {
            id: string;
        } | {
            filter: string;
            sort: string;
            page: string;
        } | {
            sort: string;
            queryString?: undefined;
            input?: undefined;
            id?: undefined;
            modelName?: undefined;
        } | {
            queryString: string;
            sort?: undefined;
            input?: undefined;
            id?: undefined;
            modelName?: undefined;
        } | {
            input: string;
            sort?: undefined;
            queryString?: undefined;
            id?: undefined;
            modelName?: undefined;
        } | {
            input: string;
            id: string;
            sort?: undefined;
            queryString?: undefined;
            modelName?: undefined;
        } | {
            modelName: string;
            id: string;
            sort?: undefined;
            queryString?: undefined;
            input?: undefined;
        } | undefined;
        checkDelete: {
            __args: {
                filter: VariableType;
                sort: VariableType;
                page: VariableType;
                id?: undefined;
                queryString?: undefined;
                input?: undefined;
                tableName?: undefined;
            } | {
                id: VariableType;
                filter?: undefined;
                sort?: undefined;
                page?: undefined;
                queryString?: undefined;
                input?: undefined;
                tableName?: undefined;
            } | {
                sort: VariableType;
                filter?: undefined;
                page?: undefined;
                id?: undefined;
                queryString?: undefined;
                input?: undefined;
                tableName?: undefined;
            } | {
                queryString: VariableType;
                filter?: undefined;
                sort?: undefined;
                page?: undefined;
                id?: undefined;
                input?: undefined;
                tableName?: undefined;
            } | {
                input: VariableType;
                filter?: undefined;
                sort?: undefined;
                page?: undefined;
                id?: undefined;
                queryString?: undefined;
                tableName?: undefined;
            } | {
                input: VariableType;
                id: VariableType;
                filter?: undefined;
                sort?: undefined;
                page?: undefined;
                queryString?: undefined;
                tableName?: undefined;
            } | {
                tableName: VariableType;
                id: VariableType;
                filter?: undefined;
                sort?: undefined;
                page?: undefined;
                queryString?: undefined;
                input?: undefined;
            } | undefined;
            __on: object[];
        };
        search?: undefined;
    };
    mutation?: undefined;
} | undefined;
