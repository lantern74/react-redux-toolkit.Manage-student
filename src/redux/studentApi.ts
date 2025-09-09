import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Student {
  id: number;
  name: string;
  email: string;
  phone?: string;
  enrollNumber?: string;
  dateOfAdmission?: string;
}

export const studentApi = createApi({
  reducerPath: "studentApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com" }),
  tagTypes: ["Student"],

  endpoints: (builder) => ({
    // Fetch students
    getStudents: builder.query<Student[], void>({
      query: () => "/users", 
      transformResponse: (response: Student[]) => response,
      providesTags: ["Student"],
    }),

    // Add student
    addStudent: builder.mutation<Student, Partial<Student>>({
      query: (newStudent) => ({
        url: "/users",
        method: "POST",
        body: newStudent,
      }),
      async onQueryStarted(newStudent, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          const studentWithId = {
            ...data,
            id: newStudent.id ?? Date.now(), // fallback if API doesn't give proper id
          };

          // Optimistically update cache
          dispatch(
            studentApi.util.updateQueryData("getStudents", undefined, (draft) => {
              draft.push(studentWithId);
            })
          );
        } catch {
          // ignore
        }
      },
    }),

    // Delete student
    deleteStudent: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        // Optimistically remove from cache
        const patchResult = dispatch(
          studentApi.util.updateQueryData("getStudents", undefined, (draft) => {
            return draft.filter((student) => student.id !== id);
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo(); // rollback if API fails
        }
      },
    }),

    //Update student
    updateStudent: builder.mutation<Student, Partial<Student>>({
      query: (student) => ({
        url: `/users/${student.id}`,
        method: "PATCH",
        body: student,
      }),
      async onQueryStarted(student, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          studentApi.util.updateQueryData("getStudents", undefined, (draft) => {
            const index = draft.findIndex((s) => s.id === student.id);
            if (index !== -1) {
              draft[index] = { ...draft[index], ...student };
            }
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),


  }),
});

export const {
  useGetStudentsQuery,
  useAddStudentMutation,
  useDeleteStudentMutation,
  useUpdateStudentMutation,
} = studentApi;
