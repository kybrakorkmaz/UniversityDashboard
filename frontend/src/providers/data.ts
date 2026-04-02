import { createDataProvider, CreateDataProviderOptions } from "@refinedev/rest";
import { HttpError } from "@refinedev/core";
import { BACKEND_BASE_URL } from "@/constants";
import {CreateResponse, GetOneResponse, ListResponse} from "@/types";


const buildHttpError = async (response: Response): Promise<HttpError> => {
    let message = "Request failed.";
    try {
        const payloadText = await response.text(); // sadece text al
        try {
            const payload = JSON.parse(payloadText);
            if (payload?.message) message = payload.message;
        } catch {
            if (payloadText) message = payloadText;
        }
    } catch(error) {
        console.error("error class", error);
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
            (response as any)._cachedPayload = payload;
            return payload.data ?? [];
        },

        getTotalCount: async (response) => {
            const payload: ListResponse = (response as any)._cachedPayload;
            if (!payload) return 0;
            return payload.pagination?.total ?? payload.data?.length ?? 0;
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

    getOne: {
        getEndpoint:({resource, id})=>`${resource}/${id}`,

        mapResponse: async (response)=>{
            if (!response.ok) throw await buildHttpError(response);
            const json: GetOneResponse=await response.json();
            return json.data??{};
        },
    },
};

const { dataProvider } = createDataProvider(BACKEND_BASE_URL, options);

export { dataProvider };
