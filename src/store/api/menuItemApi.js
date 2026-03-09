import { baseApi } from "./baseApi";

export const menuItemsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //create all endpoints
    getMenuItems: builder.query({
      query: () => "/MenuItem",
      providesTags: ["MenuItem"],
      transformResponse: (response) => {
        if (response && response.result && Array.isArray(response.result)) {
          return response.result;
        }
        if (response && Array.isArray(response)) {
          return response;
        }
        return [];
      },
    }),

    // getMenu item by id functionality
    getMenuItemById: builder.query({
      query: (id) => `/MenuItem/${id}`,
      providesTags: (result, error, { id }) => [{ type: "MenuItem", id }],
      transformResponse: (response) => {
        if (response && response.result) {
          return response.result;
        }
        return response;
      },
    }),

    // create menu item functionality
    createMenuItem: builder.mutation({
      query: (formData) => ({
        url: "/MenuItem",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["MenuItem"],
    }),

    // delete funtionality

    deleteMenuItem: builder.mutation({
      query: (id) => ({
        url: `/MenuItem` + `?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["MenuItem"],
    }),

    // update funtionality
    updateMenuItem: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/MenuItem?id=${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "MenuItem", id }],
    }),
  }),
});

export const {
  useGetMenuItemsQuery,
  useGetMenuItemByIdQuery,
  useCreateMenuItemMutation,
  useDeleteMenuItemMutation,
  useUpdateMenuItemMutation,
} = menuItemsApi;
