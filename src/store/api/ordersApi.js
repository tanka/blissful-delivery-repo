import { baseApi } from "./baseApi";

export const ordersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //create all endpoints
    // getOrders: builder.query({
    //   query: (userId = "") => ({
    //     url: `/OrderHeader` + `?userId=${userId}`,
    //     method: "GET",
    //   }),
    getOrders: builder.query({
      query: (userId = "") => ({
        url: "/OrderHeader",
        params: userId ? { userId } : {},
      }),
      providesTags: ["Order"],
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
    getOrderById: builder.query({
      query: (orderHeaderId) => `/OrderHeader/${orderHeaderId}`,
      providesTags: (result, error, { orderHeaderId }) => [
        { type: "Order", id: orderHeaderId },
      ],
      transformResponse: (response) => {
        if (response && response.result) {
          return response.result;
        }
        return response;
      },
    }),

    // create menu item functionality
    createOrder: builder.mutation({
      query: (formData) => ({
        url: "/OrderHeader",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Order"],
    }),
    // update funtionality
    updateOrder: builder.mutation({
      query: ({ orderId, orderData }) => ({
        url: `/OrderHeader/${orderId}`,
        method: "PUT",
        body: orderData,
      }),
      invalidatesTags: (result, error, { orderId }) => [
        { type: "Order", id: orderId },
      ],
    }),

    // update order details
    updateOrderDetails: builder.mutation({
      query: ({ orderDetailsId, rating }) => ({
        url: `/OrderDetails/${orderDetailsId}`,
        method: "PUT",
        body: { orderDetailsId: orderDetailsId, rating: rating },
      }),
      invalidatesTags: ["Order", "MenuItem"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
  useDeleteOrderMutation,
  useUpdateOrderMutation,
  useUpdateOrderDetailsMutation,
} = ordersApi;
