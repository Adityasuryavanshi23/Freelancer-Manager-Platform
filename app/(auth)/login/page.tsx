"use client";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash, FaGithub } from "react-icons/fa";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Formik, Field, Form } from "formik";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginValidationSchema } from "@/lib/validationSchema";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

  const handleSubmit = async (
    values: { email: string; password: string },
    { resetForm, setStatus, setSubmitting }: any,
  ) => {
    try {
      const result = await signIn("credentials", {
        ...values,
        redirect: false,
      });
      if (result?.error) {
        setStatus(result.error);
        setSubmitting(false);
        return;
      }
      if (result?.ok) {
        return router.push("/dashboard");
      }

      console.log("result for login form", "result", result, "values", values);
      resetForm();
    } catch (error: any) {
      console.error("Error during sign in:", error);
      setSubmitting(false);
    }
  };
  const router = useRouter();

  return (
    <div className="min-h-screen p-6  bg-gray-800 flex items-center justify-center ">
      <div className="w-full max-w-md border bg-black/90 border-gray-800 rounded-2xl p-8">
        <div className="text-center mb-8">
          {" "}
          <Link href={"/"} className="-mt-4">
            <span className="text-2xl   font-bold text-slate-900 dark:text-white">
              FreelanceHub
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-white">Welcome back</h1>
          <p className="text-gray-400 mt-2 text-sm">Sign in to your account</p>
        </div>

        <div className="flex flex-col gap-3 mb-6">
          <button
            onClick={() => {
              setLoadingProvider("google");
              signIn("google", { callbackUrl: "/dashboard" });
            }}
            className={`flex items-center justify-center gap-3 w-full py-3 px-4 bg-gray-200 hover:bg-gray-100 text-gray-800 font-semibold rounded-xl transition-all duration-200 cursor-pointer ${loadingProvider === "google" ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          >
            <FcGoogle size={22} />
            {loadingProvider === "google"
              ? "Loading..."
              : "Continue with Google"}
          </button>

          <button
            onClick={() => {
              setLoadingProvider("github");
              signIn("github", { callbackUrl: "/dashboard" });
            }}
            className={`flex items-center justify-center gap-3 w-full py-3 px-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl border border-gray-700 transition-all duration-200 cursor-pointer ${loadingProvider === "github" ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          >
            <FaGithub size={22} />
            {loadingProvider === "github"
              ? "Loading..."
              : "Continue with GitHub"}
          </button>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <hr className="flex-1 border-gray-700" />
          <span className="text-gray-500 text-sm">or</span>
          <hr className="flex-1 border-gray-700" />
        </div>

        {/* Credentials Form */}
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={loginValidationSchema}
          className="flex flex-col gap-4"
        >
          {({ errors, touched, isSubmitting, status }) => (
            <Form>
              {status && (
                <div className="text-red-500 text-sm mb-4">{status}</div>
              )}
              <div>
                <label className="text-gray-400 text-sm mb-2 block">
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className={`w-full bg-gray-800 border border-gray-700 text-white rounded-xl  mb-2 px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors ${errors.email && touched.email ? "border-red-500" : "border-gray-700"}`}
                />
                {errors.email && touched.email && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.email}
                  </div>
                )}
              </div>

              <div className="relative">
                <label className="text-gray-400 text-sm mb-2 block">
                  Password
                </label>
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 mb-2 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors ${errors.password && touched.password ? "border-red-500" : "border-gray-700"}`}
                />
                {errors.password && touched.password && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.password}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 cursor-pointer text-gray-400 hover:text-gray-200 text-sm"
                >
                  {showPassword ? (
                    <FaEye size={20} />
                  ) : (
                    <FaEyeSlash size={20} />
                  )}
                </button>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition-all duration-200 mt-6 cursor-pointer"
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
