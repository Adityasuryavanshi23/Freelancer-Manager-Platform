"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Typewriter from "typewriter-effect";
import { useEffect } from "react";
export default function Home() {
  const { data, status } = useSession();

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1
              id="heading"
              className="text-4xl sm:text-6xl font-bold text-slate-900 dark:text-white leading-tight"
            >
              Manage Your Freelance
              <Typewriter
                options={{
                  wrapperClassName: "text-blue-600",
                  strings: ["Track Your Projects", "Organize Your Clients"],
                  deleteSpeed: 50,
                  autoStart: true,
                  loop: true,
                  delay: 50,
                }}
              />
            </h1>
            <p className="text-xl text-slate-600 dark:text-gray-300 max-w-2xl mx-auto">
              Track clients, manage tasks, and stay organized. Your all-in-one
              freelancer management solution.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            {status === "authenticated" ? (
              <Link
                href="/dashboard"
                className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl"
                >
                  Get Started
                </Link>
                <Link
                  href="/login"
                  className="px-8 py-4 bg-white dark:bg-gray-800 text-slate-900 dark:text-white rounded-lg hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors font-semibold text-lg border border-slate-200 dark:border-gray-600"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 md:mt-32 grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-200 dark:border-gray-700">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
              {/* icon */}
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              Client Management
            </h3>
            <p className="text-slate-600 dark:text-gray-300">
              Keep all your client information organized in one place. Track
              projects and communications effortlessly.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-200 dark:border-gray-700">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
              {/* icon */}
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              Task Tracking
            </h3>
            <p className="text-slate-600 dark:text-gray-300">
              Monitor your tasks with ease. Set priorities, deadlines, and track
              progress in real-time.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-200 dark:border-gray-700">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
              {/* icon */}
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              Performance Insights
            </h3>
            <p className="text-slate-600 dark:text-gray-300">
              Get detailed insights into your productivity and project
              performance with intuitive analytics.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
