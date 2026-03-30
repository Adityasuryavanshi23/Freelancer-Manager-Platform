import React from "react";
import { MdEmail, MdBusiness } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import Link from "next/link";

interface ClientCardProps {
  client: {
    _id: string;
    name: string;
    email: string;
    company?: string;
    tasks?: {
      _id: string;
      title: string;
      description?: string;
      status?: string;
      updatedAt?: string;
      createdAt?: string;
    }[];
  };
}

const ClientCard = ({ client }: ClientCardProps) => {
  const taskCount = client.tasks?.length || 0;

  const clientInitial =
    client?.company
      ?.trim()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("") || client.name.charAt(0).toUpperCase();

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-5 hover:shadow-lg hover:border-gray-600 transition-all  group">
      {/* Avatar & Name */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
          {client.company ? clientInitial : client.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <h3 className="text-white  capitalize font-semibold text-lg group-hover:text-blue-400 transition-colors">
            {client.name}
          </h3>
          {client.company ? (
            <p className="text-gray-400 text-sm flex items-center gap-1">
              <MdBusiness size={14} />
              {client.company}
            </p>
          ) : (
            <p className="text-gray-400 text-sm flex items-center gap-1">
              <MdBusiness size={14} />
              {client.name}
            </p>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="flex items-center gap-2 text-gray-300 text-sm mb-3">
        <MdEmail className="text-gray-400" size={16} />
        <span className="truncate">{client.email}</span>
      </div>

      {/* Tasks Count */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-700">
        <div className="flex items-center gap-2 text-sm">
          <FaTasks className="text-blue-400" size={14} />
          <span className="text-gray-400">
            {taskCount} {taskCount === 1 ? "Task" : "Tasks"}
          </span>
        </div>
        {taskCount > 0 ? (
          <Link href={`/dashboard/clients/${client._id}/tasks`}>
            <button className="text-blue-400 cursor-pointer hover:text-blue-300 text-sm font-medium">
              View Tasks →
            </button>
          </Link>
        ) : (
          <Link href={`/dashboard/clients/${client._id}/add-task`}>
            <button className="text-blue-400 cursor-pointer hover:text-blue-300 text-sm font-medium">
              Add Tasks →
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ClientCard;
