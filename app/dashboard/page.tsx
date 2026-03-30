"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FaTasks } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import { IoMdDoneAll } from "react-icons/io";
import { MdEmojiPeople, MdOutlinePendingActions } from "react-icons/md";

const page = () => {
  const { data: session, status } = useSession();

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

  // Dummy data for UI
  const stats = [
    {
      title: "Total Clients",
      value: "12",
      icon: <MdEmojiPeople />,
      color: "bg-blue-700",
      href: "/dashboard/clients",
    },
    {
      title: "Total Tasks",
      value: "45",
      icon: <FaTasks />,
      color: "bg-purple-700",
    },
    {
      title: "Pending",
      value: "8",
      icon: <MdOutlinePendingActions />,
      color: "bg-yellow-700",
    },
    {
      title: "In Progress",
      value: "15",
      icon: <GrInProgress />,
      color: "bg-orange-700",
    },
    {
      title: "Completed",
      value: "22",
      icon: <IoMdDoneAll />,
      color: "bg-green-700",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 p-6">
      {/* Header */}
      <div className="mb-8 flex items-center  justify-between">
        <div>
          {" "}
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Dashboard
          </h1>
          <p className=" text-gray-400 mt-1">
            Welcome back,{" "}
            <span className="font-semibold text-white">
              {session?.user?.name}
            </span>
          </p>
        </div>
        <div className="pr-15">
          <Link href="/dashboard/clients/add">
            <button className="bg-blue-600 hover:bg-blue-700 cursor-pointer active:scale-90 transition-all ease-in rounded-lg font-semibold py-2 px-6 ">
              Add Client
            </button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Link key={index} href={stat.href || "#"}>
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:border-gray-600 0 p-6 hover:shadow-lg transition-colors border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`${stat.color} w-12 h-12 rounded-full flex items-center justify-center text-2xl`}
                >
                  {stat.icon}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Clients Section */}
      <div className=" rounded-lg shadow-md p-6 border border-gray-700  mb-8">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          Recent Clients
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="p-4   bg-gray-800 rounded-lg hover:shadow-md  hover:bg-gray-700 cursor-pointer active:bg-gray-500/60 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  C{item}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">
                    Client Name {item}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Company Ltd.
                  </p>
                </div>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                <p>📧 client{item}@example.com</p>
                <p className="mt-1">📊 {item * 3} tasks</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Tasks Section */}
      <div className=" rounded-lg shadow-md p-6 mb-6 border  border-gray-700">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          Recent Tasks
        </h2>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="flex items-center justify-between p-4 border border-gray-700 rounded-lg hover:bg-gray-700 cursor-pointer active:bg-gray-500/60 bg-gray-800 transition-colors"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 dark:text-white">
                  Task Title {item}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Client Name • 2 days ago
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200">
                Pending
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
