"use client";
import { useParams, useRouter } from "next/navigation";

import { MdArrowBack, MdEdit, MdDelete } from "react-icons/md";

import useSWR from "swr";
import { DeleteTask, fetcher, formatDateAndTime } from "@/lib/services";
import { Client, Task, taskStatus } from "@/lib/types";

const Page = () => {
  const router = useRouter();
  const { taskid } = useParams();

  const {
    data: taskDetails,
    error,
    isLoading: taskLoading,
  } = useSWR(`/tasks/${taskid}`, fetcher);

  const taskData: Task = taskDetails?.taskData || {};

  const { data: clientData } = useSWR(
    `/clients/${taskData?.clientId}`,
    fetcher,
  );

  const clientDetails: Client = clientData?.clientData || {};

  const statusColors: { [key in taskStatus]: string } = {
    pending:
      "bg-yellow-500/20 text-yellow-400 border-yellow-500/30 capitalize hover:bg-yellow-500/30",
    "in-progress":
      "bg-blue-500/20 text-blue-400 border-blue-500/30 capitalize hover:bg-blue-500/30",
    completed:
      "bg-green-500/20 text-green-400 border-green-500/30 capitalize hover:bg-green-500/30",
  };
  const handleEdit = (taskId: string) => {
    console.log("task id ", taskId);
    router.push(
      `/dashboard/clients/${taskData?.clientId}/add-task?id=${taskId}`,
    );
  };
  const handleDelete = async (taskId: string) => {
    const res = await DeleteTask(taskId);
    console.log("deleted task ", res);

    router.push(`/dashboard/clients/${taskData.clientId}/tasks`);
  };
  return (
    <div className="min-h-screen bg-gray-900">
      {taskLoading && (
        <div className="flex justify-center items-center min-h-screen">
          Loading Tasks...
        </div>
      )}
      {error && (
        <div className="flex justify-center items-center min-h-screen">
          Something went wrong while fetching task details.
        </div>
      )}
      <div className="max-w-3xl mx-auto pt-8 px-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-white cursor-pointer transition-colors mb-6"
        >
          <MdArrowBack size={20} />
          <span>Back</span>
        </button>

        {/* task detail cards */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h1 className="text-2xl font-bold text-white capitalize max-w-lg  wrap-break-word">
              title : {taskData.title}
            </h1>
            <span
              className={`px-3 py-1 rounded-full capitalize text-sm font-medium border whitespace-nowrap ${statusColors[taskData?.status ?? "pending"]}`}
            >
              {taskData.status}
            </span>
          </div>

          <div className="mb-6">
            <h2 className="text-sm text-gray-500 mb-1">Description</h2>
            <p className="text-gray-300 wrap-break-word">
              {taskData.description ? taskData?.description : "Desc Not Given"}
            </p>
          </div>

          {/* Dates */}
          <div className="flex flex-col gap-1 text-sm text-gray-500 mb-6 pt-4 border-t border-gray-700">
            <span>CreatedAt: {formatDateAndTime(taskData.createdAt)}</span>
            {taskData.createdAt !== taskData.updatedAt && (
              <span>UpdatedAt: {formatDateAndTime(taskData.updatedAt)}</span>
            )}
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between gap-3 pt-4 border-t border-gray-700">
            <div className="flex gap-3">
              <button
                onClick={() => handleEdit(taskData._id)}
                className="flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 transition-all"
              >
                <MdEdit size={18} />
                Edit
              </button>
              <button
                onClick={() => handleDelete(taskData._id)}
                className="flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all"
              >
                <MdDelete size={18} />
                Delete
              </button>
            </div>

            <div className="hidden gap-2 md:flex">
              <p className="text-gray-300 text-sm capitalize">
                by client name : {clientDetails.name}
              </p>
              <span className="text-gray-400">|</span>
              <p className="text-gray-300 text-sm capitalize">
                by client email :{" "}
                <span className="normal-case"> {clientDetails.email}</span>
              </p>
            </div>
          </div>
          <div className=" gap-2 flex md:hidden mt-5">
            <p className="text-gray-300 text-xs capitalize">
              by client name : {clientDetails.name}
            </p>
            <span className="text-gray-400">|</span>
            <p className="text-gray-300 text-xs capitalize">
              by client email :{" "}
              <span className="normal-case"> {clientDetails.email}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
