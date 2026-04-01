"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FaTasks } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import { IoMdDoneAll } from "react-icons/io";
import {
  MdEmail,
  MdEmojiPeople,
  MdOutlinePendingActions,
} from "react-icons/md";
import useSWR from "swr";
import { fetcher, formatDateAndTime } from "@/lib/services";
import { Client, Task, taskStatus } from "@/lib/types";

const page = () => {
  const { data: session, status } = useSession();

  const { data, isLoading: clientLoading } = useSWR("/clients", fetcher);
  const { data: tasksData, isLoading: tasksLoading } = useSWR(
    `/tasks`,
    fetcher,
  );

  const loggedInUserClients: Client[] = data?.clients || [];
  const loggedInUserTasks: Task[] = tasksData?.tasksData || [];

  const allTasks =
    loggedInUserClients?.flatMap((client: Client) => client.tasks) || [];

  const totalPendingTasks = allTasks.filter(
    (task: Task) => task?.status === "pending",
  ).length;

  const totalInProgressTasks = allTasks.filter(
    (task: Task) => task?.status === "in-progress",
  ).length;

  const totalCompletedTasks = allTasks.filter(
    (task: Task) => task?.status === "completed",
  ).length;
  console.log("all pending", totalPendingTasks);

  if (clientLoading && tasksLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl">
        <p className="animate-bounce">loading your dashboard... </p>
      </div>
    );
  }
  console.log(allTasks);

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

  const stats = [
    {
      title: "Total Clients",
      value: loggedInUserClients ? loggedInUserClients.length : "0",
      icon: <MdEmojiPeople />,
      color: "bg-blue-700",
      href: "/dashboard/clients",
    },
    {
      title: "Total Tasks",
      value: allTasks.length || "0",
      icon: <FaTasks />,
      color: "bg-purple-700",
    },
    {
      title: "Pending",
      value: totalPendingTasks || "0",
      icon: <MdOutlinePendingActions />,
      color: "bg-yellow-700",
    },
    {
      title: "In Progress",
      value: totalInProgressTasks || "0",
      icon: <GrInProgress />,
      color: "bg-orange-700",
    },
    {
      title: "Completed",
      value: totalCompletedTasks || "0",
      icon: <IoMdDoneAll />,
      color: "bg-green-700",
    },
  ];
  const statusColors: { [key in taskStatus]: string } = {
    pending: "bg-yellow-700/80 text-yellow-100 border-yellow-700/30",
    "in-progress": "bg-orange-700/80 text-orange-100 border-orange-700/30",
    completed: "bg-green-800 text-green-100 border-green-700/30",
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 ">
      <main className="max-w-7xl mx-auto lg:px-3 xl:px-7 ">
        {/* Header */}
        <div className="mb-8 flex items-center  justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
              Dashboard
            </h1>
            <p className=" text-xs text-gray-400 mt-1">
              Welcome back,{" "}
              <span className="font-semibold text-white">
                {session?.user?.name}
              </span>
            </p>
          </div>
          <div>
            <Link href="/dashboard/clients/add">
              <button className="bg-blue-600 hover:bg-blue-700 cursor-pointer active:scale-90 transition-all ease-in rounded-lg font-semibold py-2 text-xs  px-6 ">
                Add Client
              </button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1  min-[477px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-2  lg:grid-cols-4    xl:grid-cols-5 gap-3 md:gap-6 mb-8">
          {stats.map((stat, index) => (
            <Link key={index} href={stat.href || "#"}>
              <div
                className={`bg-white dark:bg-gray-800 rounded-lg shadow-md hover:border-gray-600 0 p-6 hover:shadow-lg transition-colors border border-gray-200 dark:border-gray-700 ${stat?.href ? "" : "opacity-60 cursor-not-allowed"}`}
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
              </div>{" "}
            </Link>
          ))}
        </div>

        {/* Clients Section */}
        <div className=" rounded-lg shadow-md p-6 border border-gray-700  mb-8">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            Recent Clients
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loggedInUserClients.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">
                No clients found
              </p>
            ) : (
              loggedInUserClients?.slice(0, 3).map((item: Client) => (
                <Link key={item._id} href={`/dashboard/clients/${item._id}`}>
                  <div className="p-4   bg-gray-800 rounded-lg hover:shadow-md  hover:bg-gray-700 cursor-pointer active:bg-gray-500/60 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                        {item.company
                          ? item.company
                              .split(" ")
                              .map((w: string) => w.charAt(0).toUpperCase())
                              .join("")
                          : item.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 dark:text-white">
                          {item?.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {item?.company || "Company Ltd."}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      <p className="flex items-center gap-1">
                        <MdEmail className="text-gray-400" size={16} />
                        {item?.email}
                      </p>
                      <p className="mt-1 flex items-center gap-1">
                        <FaTasks className="text-blue-400" size={14} /> Tasks :
                        ({item?.tasks?.length || 0}){" "}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Recent Tasks Section */}
        <div className=" rounded-lg shadow-md p-6 mb-6 border  border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            Recent Tasks
          </h2>
          <div className="space-y-3">
            {loggedInUserTasks?.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">No tasks found</p>
            ) : (
              loggedInUserTasks?.slice(0, 4).map((item: Task) => (
                <Link
                  key={item._id}
                  href={`/dashboard/clients/${item?.clientId}/tasks/${item?._id}`}
                >
                  <div className="flex mt-4 items-center justify-between p-4    border border-gray-700 rounded-lg hover:bg-gray-700 cursor-pointer active:bg-gray-500/60 bg-gray-800 transition-colors">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 dark:text-white">
                        Task Title : {item.title}
                      </h3>

                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        createdAt : {formatDateAndTime(item?.createdAt)}
                      </p>
                      {item?.updatedAt !== item?.createdAt && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          updatedAt : {formatDateAndTime(item?.updatedAt)}
                        </p>
                      )}
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[item.status ?? "pending"]}`}
                    >
                      {item.status}
                    </span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;
