"use client";
import Link from "next/link";
import useSWR from "swr";
import { Suspense } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Formik, Field, Form } from "formik";
import { addTask, fetcher, updateTask } from "@/lib/services";
import { useSession } from "next-auth/react";
import { Task, taskStatus } from "@/lib/types";
import { taskValidationSchema } from "@/lib/validationSchema";

const AddTaskForm = () => {
  const { clientId } = useParams();
  const router = useRouter();
  const { data: Session } = useSession();
  const searchParams = useSearchParams();

  const editTaskId = searchParams.get("id");
  const { data } = useSWR(`/tasks/${editTaskId}`, fetcher);
  const taskData: Task = data?.taskData || {};

  const handleSubmit = async (
    values: { title: string; description?: string; status?: taskStatus },
    { setSubmitting, resetForm, setStatus }: any,
  ) => {
    try {
      const result = editTaskId
        ? await updateTask(editTaskId, values)
        : await addTask({
            ...values,
            clientId: clientId as string,
            userEmail: Session?.user?.email || "",
          });

      router.push(`/dashboard/clients/${clientId}/tasks`);
      if (result?.error) {
        setSubmitting(false);
        setStatus(result.error);
        return;
      }
      resetForm();

      console.log(result);
    } catch (error) {
      console.log("failed to create a task at a time", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900/70 flex items-center justify-center p-6">
      <div className="w-full max-w-md border border-gray-800 rounded-2xl p-8 bg-slate-900 backdrop-blur-sm">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div onClick={() => router.back()}>
            <IoArrowBack size={24} className="cursor-pointer" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white">
              {editTaskId ? "Edit Task" : "Add New Task"}
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              {editTaskId
                ? "Update the task details"
                : "Fill in the task details"}
            </p>
          </div>
        </div>

        {/* Form */}
        <Formik
          onSubmit={handleSubmit}
          initialValues={{
            title: taskData?.title || "",
            description: taskData?.description || "",
            status: taskData?.status || "pending",
          }}
          enableReinitialize={true}
          validationSchema={taskValidationSchema}
        >
          {({ touched, isSubmitting, errors, status }) => {
            return (
              <Form className="space-y-5">
                {/* Title Field */}
                {status && <p className="text-red-500 text-sm">{status}</p>}
                <div>
                  <label className="text-gray-300 text-sm font-medium mb-2 block">
                    Task Title <span className="text-red-500">*</span>
                  </label>
                  <Field
                    name="title"
                    type="text"
                    placeholder="e.g., Design landing page"
                    className="w-full   bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  {touched?.title && errors?.title && (
                    <p className="text-red-500 text-sm">
                      {errors.title as string}
                    </p>
                  )}
                </div>

                {/* Description Field */}
                <div>
                  <label className="text-gray-300 text-sm font-medium mb-2 block">
                    Description
                    <span className="text-gray-500 text-xs ml-1">
                      (Optional)
                    </span>
                  </label>
                  <Field
                    name="description"
                    as="textarea"
                    placeholder="Add task details..."
                    rows={7}
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none "
                  />{" "}
                  {touched?.description && errors?.description && (
                    <p className="text-red-500 text-sm">
                      {errors.description as string}
                    </p>
                  )}
                </div>

                {/* Status Dropdown */}
                <div>
                  <label className="text-gray-300 text-sm font-medium mb-2 block">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <Field
                    name="status"
                    as="select"
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors cursor-pointer"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </Field>
                  {touched?.status && errors?.status && (
                    <p className="text-red-500 text-sm">
                      {errors.status as string}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full cursor-pointer bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-xl transition-all duration-200 mt-3"
                >
                  {editTaskId
                    ? isSubmitting
                      ? "Updating...."
                      : "Update Task"
                    : isSubmitting
                      ? "Adding...."
                      : "Add Task"}
                </button>

                {/* Cancel Button */}
                <Link
                  href="/dashboard"
                  className="block w-full text-center bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold py-2 rounded-xl transition-all duration-200 border border-gray-700"
                >
                  Cancel
                </Link>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

const AddTaskPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-900 flex justify-center items-center">
          <p className="text-2xl animate-bounce">loading content....</p>
        </div>
      }
    >
      <AddTaskForm />
    </Suspense>
  );
};

export default AddTaskPage;
