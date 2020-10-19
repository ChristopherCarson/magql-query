import "core-js/modules/es.object.to-string";
import "core-js/modules/es.promise";
import _Object$values from "@babel/runtime-corejs3/core-js-stable/object/values";
import _classCallCheck from "@babel/runtime-corejs3/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/esm/createClass";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";
import { makeQueryBuilder } from './queryBuilder';
import { jsonToGraphQLQuery } from 'json-to-graphql-query';
import { GraphQLClient } from 'graphql-request';

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
export var MagqlQuery = /*#__PURE__*/function () {
  function MagqlQuery(_ref) {
    var schema = _ref.schema,
        url = _ref.url;

    _classCallCheck(this, MagqlQuery);

    _defineProperty(this, "endpoint", void 0);

    _defineProperty(this, "graphQLClient", void 0);

    _defineProperty(this, "queryBuilder", void 0);

    this.endpoint = url;
    this.graphQLClient = new GraphQLClient(url);
    this.queryBuilder = makeQueryBuilder(schema);
  }

  _createClass(MagqlQuery, [{
    key: "buildQuery",
    value: function buildQuery(_ref2) {
      var modelName = _ref2.modelName,
          queryType = _ref2.queryType;
      return jsonToGraphQLQuery(this.queryBuilder({
        modelName: modelName,
        queryType: queryType
      }));
    }
  }, {
    key: "sendRequest",
    value: function sendRequest(_ref3) {
      var query = _ref3.query,
          variables = _ref3.variables,
          formData = _ref3.formData;

      if (formData) {
        var request = new Request(this.endpoint);
        var init = {
          method: 'POST',
          body: formData
        };
        return fetch(request, init).then(function (data) {
          return {
            data: data,
            error: false
          };
        })["catch"](function (err) {
          return {
            data: null,
            error: err
          };
        });
      }

      return this.graphQLClient.request(query, variables).then(function (data) {
        return {
          data: _Object$values(data)[0],
          error: false
        };
      })["catch"](function (err) {
        return {
          data: null,
          error: err
        };
      });
    }
  }, {
    key: "buildAndSendRequest",
    value: function buildAndSendRequest(_ref4) {
      var modelName = _ref4.modelName,
          variables = _ref4.variables,
          queryType = _ref4.queryType;
      var query = this.buildQuery({
        modelName: modelName,
        queryType: queryType
      });
      return this.sendRequest({
        query: query,
        variables: variables
      });
    }
  }]);

  return MagqlQuery;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWdxbFF1ZXJ5LnRzIl0sIm5hbWVzIjpbIm1ha2VRdWVyeUJ1aWxkZXIiLCJqc29uVG9HcmFwaFFMUXVlcnkiLCJHcmFwaFFMQ2xpZW50IiwiTWFncWxRdWVyeSIsInNjaGVtYSIsInVybCIsImVuZHBvaW50IiwiZ3JhcGhRTENsaWVudCIsInF1ZXJ5QnVpbGRlciIsIm1vZGVsTmFtZSIsInF1ZXJ5VHlwZSIsInF1ZXJ5IiwidmFyaWFibGVzIiwiZm9ybURhdGEiLCJyZXF1ZXN0IiwiUmVxdWVzdCIsImluaXQiLCJtZXRob2QiLCJib2R5IiwiZmV0Y2giLCJ0aGVuIiwiZGF0YSIsImVycm9yIiwiZXJyIiwiYnVpbGRRdWVyeSIsInNlbmRSZXF1ZXN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxTQUFTQSxnQkFBVCxRQUE0QyxnQkFBNUM7QUFDQSxTQUFTQyxrQkFBVCxRQUFtQyx1QkFBbkM7QUFDQSxTQUFTQyxhQUFULFFBQThCLGlCQUE5Qjs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsV0FBYUMsVUFBYjtBQUtFLDRCQUFxRTtBQUFBLFFBQXZEQyxNQUF1RCxRQUF2REEsTUFBdUQ7QUFBQSxRQUEvQ0MsR0FBK0MsUUFBL0NBLEdBQStDOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUNuRSxTQUFLQyxRQUFMLEdBQWdCRCxHQUFoQjtBQUNBLFNBQUtFLGFBQUwsR0FBcUIsSUFBSUwsYUFBSixDQUFrQkcsR0FBbEIsQ0FBckI7QUFDQSxTQUFLRyxZQUFMLEdBQW9CUixnQkFBZ0IsQ0FBQ0ksTUFBRCxDQUFwQztBQUNEOztBQVRIO0FBQUE7QUFBQSxzQ0FpQks7QUFBQSxVQUxESyxTQUtDLFNBTERBLFNBS0M7QUFBQSxVQUpEQyxTQUlDLFNBSkRBLFNBSUM7QUFDRCxhQUFPVCxrQkFBa0IsQ0FBQyxLQUFLTyxZQUFMLENBQWtCO0FBQUVDLFFBQUFBLFNBQVMsRUFBVEEsU0FBRjtBQUFhQyxRQUFBQSxTQUFTLEVBQVRBO0FBQWIsT0FBbEIsQ0FBRCxDQUF6QjtBQUNEO0FBbkJIO0FBQUE7QUFBQSx1Q0E2Qks7QUFBQSxVQVBEQyxLQU9DLFNBUERBLEtBT0M7QUFBQSxVQU5EQyxTQU1DLFNBTkRBLFNBTUM7QUFBQSxVQUxEQyxRQUtDLFNBTERBLFFBS0M7O0FBQ0QsVUFBSUEsUUFBSixFQUFjO0FBQ1osWUFBTUMsT0FBTyxHQUFHLElBQUlDLE9BQUosQ0FBWSxLQUFLVCxRQUFqQixDQUFoQjtBQUNBLFlBQU1VLElBQUksR0FBRztBQUNYQyxVQUFBQSxNQUFNLEVBQUUsTUFERztBQUVYQyxVQUFBQSxJQUFJLEVBQUVMO0FBRkssU0FBYjtBQUlBLGVBQU9NLEtBQUssQ0FBQ0wsT0FBRCxFQUFVRSxJQUFWLENBQUwsQ0FDSkksSUFESSxDQUNDLFVBQUFDLElBQUk7QUFBQSxpQkFBSztBQUFFQSxZQUFBQSxJQUFJLEVBQUpBLElBQUY7QUFBUUMsWUFBQUEsS0FBSyxFQUFFO0FBQWYsV0FBTDtBQUFBLFNBREwsV0FFRSxVQUFBQyxHQUFHO0FBQUEsaUJBQUs7QUFBRUYsWUFBQUEsSUFBSSxFQUFFLElBQVI7QUFBY0MsWUFBQUEsS0FBSyxFQUFFQztBQUFyQixXQUFMO0FBQUEsU0FGTCxDQUFQO0FBR0Q7O0FBRUQsYUFBTyxLQUFLaEIsYUFBTCxDQUNKTyxPQURJLENBQ0lILEtBREosRUFDV0MsU0FEWCxFQUVKUSxJQUZJLENBRUMsVUFBQUMsSUFBSTtBQUFBLGVBQUs7QUFBRUEsVUFBQUEsSUFBSSxFQUFFLGVBQWNBLElBQWQsRUFBb0IsQ0FBcEIsQ0FBUjtBQUFnQ0MsVUFBQUEsS0FBSyxFQUFFO0FBQXZDLFNBQUw7QUFBQSxPQUZMLFdBR0UsVUFBQUMsR0FBRztBQUFBLGVBQUs7QUFBRUYsVUFBQUEsSUFBSSxFQUFFLElBQVI7QUFBY0MsVUFBQUEsS0FBSyxFQUFFQztBQUFyQixTQUFMO0FBQUEsT0FITCxDQUFQO0FBSUQ7QUE3Q0g7QUFBQTtBQUFBLCtDQXVESztBQUFBLFVBUERkLFNBT0MsU0FQREEsU0FPQztBQUFBLFVBTkRHLFNBTUMsU0FOREEsU0FNQztBQUFBLFVBTERGLFNBS0MsU0FMREEsU0FLQztBQUNELFVBQU1DLEtBQUssR0FBRyxLQUFLYSxVQUFMLENBQWdCO0FBQUVmLFFBQUFBLFNBQVMsRUFBVEEsU0FBRjtBQUFhQyxRQUFBQSxTQUFTLEVBQVRBO0FBQWIsT0FBaEIsQ0FBZDtBQUVBLGFBQU8sS0FBS2UsV0FBTCxDQUFpQjtBQUFFZCxRQUFBQSxLQUFLLEVBQUxBLEtBQUY7QUFBU0MsUUFBQUEsU0FBUyxFQUFUQTtBQUFULE9BQWpCLENBQVA7QUFDRDtBQTNESDs7QUFBQTtBQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbWFrZVF1ZXJ5QnVpbGRlciwgUXVlcnlUeXBlIH0gZnJvbSAnLi9xdWVyeUJ1aWxkZXInXG5pbXBvcnQgeyBqc29uVG9HcmFwaFFMUXVlcnkgfSBmcm9tICdqc29uLXRvLWdyYXBocWwtcXVlcnknXG5pbXBvcnQgeyBHcmFwaFFMQ2xpZW50IH0gZnJvbSAnZ3JhcGhxbC1yZXF1ZXN0J1xuaW1wb3J0IHsgU2NoZW1hQnVpbGRlciB9IGZyb20gJ0BhdXRvaW52ZW50L2NvbnZleW9yLXNjaGVtYSdcblxuLypcbmNyZWF0ZVxuZWRpdFxuaW5kZXhcbnNlbGVjdFxuZGV0YWlsXG50b29sdGlwXG5jaGVja19kZWxldGVcbmRlbGV0ZVxuc2VhcmNoXG4qL1xuXG5leHBvcnQgY2xhc3MgTWFncWxRdWVyeSB7XG4gIGVuZHBvaW50OiBzdHJpbmdcbiAgZ3JhcGhRTENsaWVudDogR3JhcGhRTENsaWVudFxuICBxdWVyeUJ1aWxkZXI6IGFueVxuXG4gIGNvbnN0cnVjdG9yKHsgc2NoZW1hLCB1cmwgfTogeyBzY2hlbWE6IFNjaGVtYUJ1aWxkZXI7IHVybDogc3RyaW5nIH0pIHtcbiAgICB0aGlzLmVuZHBvaW50ID0gdXJsXG4gICAgdGhpcy5ncmFwaFFMQ2xpZW50ID0gbmV3IEdyYXBoUUxDbGllbnQodXJsKVxuICAgIHRoaXMucXVlcnlCdWlsZGVyID0gbWFrZVF1ZXJ5QnVpbGRlcihzY2hlbWEpXG4gIH1cblxuICBidWlsZFF1ZXJ5KHtcbiAgICBtb2RlbE5hbWUsXG4gICAgcXVlcnlUeXBlXG4gIH06IHtcbiAgICBtb2RlbE5hbWU/OiBzdHJpbmdcbiAgICBxdWVyeVR5cGU6IFF1ZXJ5VHlwZVxuICB9KSB7XG4gICAgcmV0dXJuIGpzb25Ub0dyYXBoUUxRdWVyeSh0aGlzLnF1ZXJ5QnVpbGRlcih7IG1vZGVsTmFtZSwgcXVlcnlUeXBlIH0pKVxuICB9XG5cbiAgc2VuZFJlcXVlc3Qoe1xuICAgIHF1ZXJ5LFxuICAgIHZhcmlhYmxlcyxcbiAgICBmb3JtRGF0YVxuICB9OiB7XG4gICAgcXVlcnk6IHN0cmluZ1xuICAgIHZhcmlhYmxlczogb2JqZWN0XG4gICAgZm9ybURhdGE/OiBhbnlcbiAgfSkge1xuICAgIGlmIChmb3JtRGF0YSkge1xuICAgICAgY29uc3QgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KHRoaXMuZW5kcG9pbnQpXG4gICAgICBjb25zdCBpbml0ID0ge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgYm9keTogZm9ybURhdGFcbiAgICAgIH1cbiAgICAgIHJldHVybiBmZXRjaChyZXF1ZXN0LCBpbml0KVxuICAgICAgICAudGhlbihkYXRhID0+ICh7IGRhdGEsIGVycm9yOiBmYWxzZSB9KSlcbiAgICAgICAgLmNhdGNoKGVyciA9PiAoeyBkYXRhOiBudWxsLCBlcnJvcjogZXJyIH0pKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmdyYXBoUUxDbGllbnRcbiAgICAgIC5yZXF1ZXN0KHF1ZXJ5LCB2YXJpYWJsZXMpXG4gICAgICAudGhlbihkYXRhID0+ICh7IGRhdGE6IE9iamVjdC52YWx1ZXMoZGF0YSlbMF0sIGVycm9yOiBmYWxzZSB9KSlcbiAgICAgIC5jYXRjaChlcnIgPT4gKHsgZGF0YTogbnVsbCwgZXJyb3I6IGVyciB9KSlcbiAgfVxuXG4gIGJ1aWxkQW5kU2VuZFJlcXVlc3Qoe1xuICAgIG1vZGVsTmFtZSxcbiAgICB2YXJpYWJsZXMsXG4gICAgcXVlcnlUeXBlXG4gIH06IHtcbiAgICBtb2RlbE5hbWU6IHN0cmluZ1xuICAgIHZhcmlhYmxlczogb2JqZWN0XG4gICAgcXVlcnlUeXBlOiBRdWVyeVR5cGVcbiAgfSkge1xuICAgIGNvbnN0IHF1ZXJ5ID0gdGhpcy5idWlsZFF1ZXJ5KHsgbW9kZWxOYW1lLCBxdWVyeVR5cGUgfSlcblxuICAgIHJldHVybiB0aGlzLnNlbmRSZXF1ZXN0KHsgcXVlcnksIHZhcmlhYmxlcyB9KVxuICB9XG59XG4iXX0=