"use client";
import { useState } from "react";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { addClients } from "@/lib/services";
import { useSession } from "next-auth/react";

const AddClientPage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Client name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    company: Yup.string(),
  });

  const handleSubmit = async (
    values: { name: string; email: string; company: string },
    { setSubmitting, resetForm, setStatus }: any,
  ) => {
    const result = await addClients({
      ...values,
      userEmail: data?.user?.email || "",
    });
    if (result?.error) {
      setSubmitting(false);
      setStatus(result.error);
      return;
    }
    resetForm();
    router.push("/dashboard/clients");
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
          <Link
            href="/dashboard"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <IoArrowBack size={24} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">Add New Client</h1>
            <p className="text-gray-400 text-sm mt-1">
              Fill in the client details
            </p>
          </div>
        </div>

        {/* Form */}
        <Formik
          initialValues={{ name: "", email: "", company: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
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
                      {errors.name}
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
                      {errors.email}
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
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition-all duration-200 mt-3"
                >
                  {isSubmitting ? "Adding...." : "Add Client"}
                </button>

                <Link
                  href="/dashboard"
                  className="block w-full text-center bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold py-3 rounded-xl transition-all duration-200 border border-gray-700"
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

export default AddClientPage;
