"use client";
import { useParams, useRouter } from "next/navigation";
import {
  MdArrowBack,
  MdEdit,
  MdDelete,
  MdEmail,
  MdBusiness,
} from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import useSWR from "swr";
import { deleteClient, fetcher, formatDateAndTime } from "@/lib/services";
import Link from "next/link";
import { Client } from "@/lib/types";

const Page = () => {
  const router = useRouter();
  const { clientId } = useParams();

  const { data, isLoading } = useSWR(`/clients/${clientId}`, fetcher);

  const clientData: Client = data?.clientData || {};

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No CLient Found</p>
        <span
          className="text-blue-500 cursor-pointer ml-2"
          onClick={() => router.back()}
        >
          Go Back
        </span>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const handleEdit = (clientId: string) => {
    console.log("client id ", clientId);
    router.push(`/dashboard/clients/add?id=${clientId}`);
  };
  const handleDelete = async (clientId: string) => {
    const res = await deleteClient(clientId);
    console.log("deleted client ", res);

    router.push(`/dashboard/clients/`);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-3xl mx-auto pt-8 px-4">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-white cursor-pointer transition-colors mb-6"
        >
          <MdArrowBack size={20} />
          <span>Back</span>
        </button>

        {/* Client Detail Card */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          {/* Avatar & Name */}
          <div className="flex items-center gap-4 mb-6">
            <div className="sm:w-16 sm:h-16 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
              J
            </div>
            <div className="flex-1 min-w-0">
              <h1 className=" text-xs sm:text-xl font-semibold max-w-full break-words text-white capitalize">
                Client Name :{" "}
                <span className="font-semibold">{clientData?.name}</span>
              </h1>
              <p className=" text-xs sm:text-xl  text-gray-200 font-semibold flex items-center gap-1 mt-1">
                <MdBusiness size={16} />
                Company :
                <span className="font-semibold capitalize ">
                  {clientData?.company
                    ? clientData.company
                    : "Individual Person"}
                </span>
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-2 text-white mb-4">
            <MdEmail className="text-gray-400 " size={18} />
            <p className="text-sm sm:text-base">
              {" "}
              Client Email :{" "}
              <span className="font-semibold text-gray-300">
                {clientData?.email}
              </span>
            </p>
          </div>

          {/* Tasks Count */}
          <Link href={`/dashboard/clients/${clientData?._id}/tasks`}>
            <div className="flex items-center gap-2 text-gray-300 mb-6">
              <FaTasks className="text-blue-400" size={16} />
              <span>{clientData?.tasks.length || 0} Tasks</span>
            </div>
          </Link>

          {/* Dates */}
          <div className="flex flex-col gap-1 text-sm text-gray-400 mb-6 pt-4 border-t border-gray-700">
            <span>CreatedAt: {formatDateAndTime(clientData?.createdAt)}</span>
            {clientData?.createdAt !== clientData?.updatedAt && (
              <span>UpdatedAt: {formatDateAndTime(clientData?.updatedAt)}</span>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4 border-t border-gray-700">
            <button
              onClick={() => handleEdit(clientData?._id)}
              className="flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 transition-all"
            >
              <MdEdit size={18} />
              Edit
            </button>
            <button
              onClick={() => handleDelete(clientData?._id)}
              className="flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all"
            >
              <MdDelete size={18} />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
