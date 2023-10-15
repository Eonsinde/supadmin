import apiSlice from "./apiSlice";


export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `/api/users/login`,
                method: "POST",
                body: data,
                credentials: "include"
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `/api/users/logout`,
                method: "POST",
                credentials: "include"
            })
        })
    })
});

export const { useLoginMutation, useLogoutMutation } = usersApiSlice;