import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //create all endpoints

    // Login User functionality
    loginUser: builder.mutation({
      query: (formData) => ({
        url: "/Auth/login",
        method: "POST",
        body: formData,
      }),
    }),

    // Register User functionality
    registerUser: builder.mutation({
      query: (formData) => ({
        url: "/Auth/register",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = authApi;
