"use client";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";
import { DeleteTask, fetcher } from "@/lib/services";
import TaskCard from "@/components/TaskCard";
import { MdArrowBack } from "react-icons/md";
import { CiSquarePlus } from "react-icons/ci";
import { Client, Task } from "@/lib/types";

const page = () => {
  const { clientId } = useParams();
  const { data, error, isLoading, mutate } = useSWR(
    `clients/${clientId}`,
    fetcher,
  );
  const router = useRouter();
  const clientTasks: Client = data?.clientData || {};
  console.log(clientTasks);

  const onDelete = async (taskId: string) => {
    try {
      const result = await DeleteTask(taskId);

      console.log(result);
      mutate();
    } catch (error) {
      console.log("failed to delete user", error);
    }
  };

  const onEdit = (taskId: string) => {
    console.log(taskId);
    router.push(`/dashboard/clients/${clientId}/add-task?id=${taskId}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-6  ">
      {isLoading && (
        <div className="flex justify-center items-center min-h-screen">
          Loading...
        </div>
      )}

      <div className="max-w-7xl mx-auto pt-8 ">
        <button
          onClick={() => router.push(`/dashboard/clients`)}
          className="flex items-center gap-2 text-gray-400 hover:text-white cursor-pointer transition-colors mb-6"
        >
          <MdArrowBack size={20} />
          <span>Back</span>
        </button>

        <div className="flex md:flex-row flex-col  gap-8">
          <p className="capitalize">
            client Company :{" "}
            <span>
              {" "}
              {clientTasks.company
                ? clientTasks.company
                : "Individual Person"}{" "}
            </span>
          </p>
          <p className="capitalize">
            client Name : <span> {clientTasks.name} </span>
          </p>
          <p className="normal-case">
            client Email : <span> {clientTasks.email} </span>
          </p>
        </div>

        <div className="mt-6">
          <div className="flex justify-between ">
            <p className="capitalize">
              task ({clientTasks.tasks?.length || 0})
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {clientTasks?.tasks?.map((task: Task) => (
              <TaskCard
                key={task?._id}
                task={task}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}{" "}
            <div
              onClick={() =>
                router.push(`/dashboard/clients/${clientId}/add-task`)
              }
              className="grid items-center justify-center w-full  cursor-pointer bg-gray-800 border border-gray-700 rounded-lg hover:shadow-lg hover:border-gray-600 transition-all  group py-8"
            >
              <div className="flex flex-col-reverse items-center gap-3 ">
                <p className="text-gray-400 group-hover:text-gray-200">
                  Add Task
                </p>

                <CiSquarePlus className="w-20 h-20 text-gray-600 group-hover:text-gray-200" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
