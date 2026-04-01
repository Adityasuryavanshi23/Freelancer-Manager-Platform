"use client";

import { IoArrowBack } from "react-icons/io5";
import { useRouter, useSearchParams } from "next/navigation";
import { Formik, Field, Form } from "formik";
import { addClients, updateClient } from "@/lib/services";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { fetcher } from "@/lib/services";
import { Client } from "@/lib/types";
import { clientValidationSchema } from "@/lib/validationSchema";

const AddClientPage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const searchParams = useSearchParams();
  const editClientId = searchParams.get("id");

  const { data } = useSWR(`clients/${editClientId}`, fetcher);

  const clientData: Client = data?.clientData || {};
  console.log(clientData);

  const handleSubmit = async (
    values: { name: string; email: string; company: string },
    { setSubmitting, resetForm, setStatus }: any,
  ) => {
    const result = editClientId
      ? await updateClient(editClientId, values)
      : await addClients({
          ...values,
          userEmail: session?.user?.email || "",
        });
    if (result?.error) {
      setSubmitting(false);
      setStatus(result.error);
      return;
    }
    resetForm();
    router.back();
    console.log("add client form data", result);
    try {
    } catch (error) {
      console.log("Failed to add client. Please try again.", error);
      setSubmitting(false);
    }
  };
  if (!session) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl">
        <p className="animate-bounce">
          pls login first to get the content{" "}
          <a href="/login" className="text-blue-600 underline">
            Login
          </a>
        </p>
      </div>
    );
  }
  return (
    <div className=" py-8 bg-gray-900  flex justify-center ">
      <div className="w-full max-w-md border border-gray-800 rounded-2xl p-8 bg-black/30 backdrop-blur-sm">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => router.back()}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <IoArrowBack size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white">
              {editClientId ? "Edit Client" : "Add New Client"}
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              {editClientId
                ? "Edit the client details"
                : "Fill in the client details"}
            </p>
          </div>
        </div>

        {/* Form */}
        <Formik
          initialValues={{
            name: clientData?.name || "",
            email: clientData?.email || "",
            company: clientData?.company || "",
          }}
          onSubmit={handleSubmit}
          validationSchema={clientValidationSchema}
          enableReinitialize={true}
        >
          {({ touched, errors, isSubmitting, status }) => {
            return (
              <Form className="space-y-5 ">
                <div>
                  <label className="text-gray-300 text-sm font-medium mb-2 block">
                    Client Name <span className="text-red-500">*</span>
                  </label>
                  <Field
                    name="name"
                    type="text"
                    placeholder="name"
                    className={`w-full bg-gray-800 border text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors ${touched.name && errors.name ? "border-red-500" : "border-gray-700"}`}
                  />
                  {touched.name && errors.name && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.name as string}
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-gray-300 text-sm font-medium mb-2 block">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <Field
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    className={`w-full bg-gray-800 border text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors ${touched.email && errors.email ? "border-red-500" : "border-gray-700"}`}
                  />
                  {touched.email && errors.email && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.email as string}
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-gray-300 text-sm font-medium mb-2 block">
                    Company Name
                    <span className="text-gray-500 text-xs ml-1">
                      (Optional)
                    </span>
                  </label>
                  <Field
                    name="company"
                    type="text"
                    placeholder="Pvt Inc."
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition-all duration-200 mt-3 cursor-pointer"
                >
                  {editClientId
                    ? isSubmitting
                      ? "Updating...."
                      : "Update Client"
                    : isSubmitting
                      ? "Adding...."
                      : "Add Client"}
                </button>

                <button
                  type="button"
                  onClick={() => router.back()}
                  className="block w-full text-center cursor-pointer bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold py-3 rounded-xl transition-all duration-200 border border-gray-700"
                >
                  Cancel
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default AddClientPage;
