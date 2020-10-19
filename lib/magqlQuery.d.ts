import { QueryType } from './queryBuilder';
import { GraphQLClient } from 'graphql-request';
import { SchemaBuilder } from '@autoinvent/conveyor-schema';
export declare class MagqlQuery {
    endpoint: string;
    graphQLClient: GraphQLClient;
    queryBuilder: any;
    constructor({ schema, url }: {
        schema: SchemaBuilder;
        url: string;
    });
    buildQuery({ modelName, queryType }: {
        modelName?: string;
        queryType: QueryType;
    }): string;
    sendRequest({ query, variables, formData }: {
        query: string;
        variables: object;
        formData?: any;
    }): Promise<{
        data: unknown;
        error: boolean;
    } | {
        data: null;
        error: any;
    }>;
    buildAndSendRequest({ modelName, variables, queryType }: {
        modelName: string;
        variables: object;
        queryType: QueryType;
    }): Promise<{
        data: unknown;
        error: boolean;
    } | {
        data: null;
        error: any;
    }>;
}
