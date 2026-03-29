import {createDataProvider, CreateDataProviderOptions} from "@refinedev/rest";
import {CreateResponse, ListResponse} from "@/types";
import {BACKEND_BASE_URL} from "@/constants";
import {HttpError} from "@refinedev/core";

const buildHttpError = async (response: Response): Promise<HttpError> => {
    let message = "Request failed.";
    try {
        const payload = await response.json();
        if (payload?.message) message = payload.message;
    } catch {
        // ignore parse errors
    }
    return {
        message: `${message} (Status: ${response.status})`,
        statusCode: response.status,
    };
};

const options: CreateDataProviderOptions = {
    getList: {
        getEndpoint: ({ resource }) => resource,

        buildQueryParams: async ({ resource, pagination, filters }) => {
            const page = pagination?.currentPage ?? 1;
            const pageSize = pagination?.pageSize ?? 10;

            const params: Record<string, string | number> = { page, limit: pageSize };

            filters?.forEach((filter) => {
                const field = "field" in filter ? filter.field : "";
                const value = String(filter.value);

                if (resource === "subjects") {
                    if (field === "department") params.department = value;
                    if (field === "name" || field === "code") params.search = value;
                }
            });

            return params;
        },

        mapResponse: async (response) => {
            if (!response.ok) throw await buildHttpError(response);
            const payload: ListResponse = await response.json();
            // cache parsed payload for getTotalCount
            (response as any)._parsedPayload = payload;
            return payload.data ?? [];
        },

        getTotalCount: async (response) => {
            const payload: ListResponse =
                (response as any)._parsedPayload ?? (await response.json());
            // prefer pagination.total, fallback to root total
            return (
                payload.pagination?.total ??
                payload.total ??
                payload.data?.length ??
                0
            );
        },
    },

    create: {
        getEndpoint: ({ resource }) => resource,
        buildBodyParams: async ({ variables }) => variables,
        mapResponse: async (response) => {
            if (!response.ok) throw await buildHttpError(response);
            const json: CreateResponse = await response.json();
            return json.data ?? [];
        },
    },
};

const {dataProvider} = createDataProvider(BACKEND_BASE_URL, options);

export {dataProvider};