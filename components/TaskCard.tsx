import { formatDateAndTime } from "@/lib/services";
import { Task } from "@/lib/types";
import Link from "next/link";
import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";

interface TaskCardProps {
  task: Task;
  onEdit: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

const TaskCard = ({ task, onEdit, onDelete }: TaskCardProps) => {
  const statusColors = {
    pending: "bg-yellow-700/80 text-yellow-100 border-yellow-700/30",
    "in-progress": "bg-orange-700/80 text-orange-100 border-orange-700/30",
    completed: "bg-green-800 text-green-100 border-green-700/30",
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:shadow-lg hover:border-gray-600 transition-all group h-full flex flex-col">
      {/* Header: Title & Status */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-white font-semibold capitalize text-lg flex-1 group-hover:text-blue-400 transition-colors truncate">
          Title : {task.title}
        </h3>
        <span
          className={`px-2.5 py-1 rounded-full font-semibold capitalize text-xs  border ${statusColors[task.status || "pending"]}`}
        >
          {task.status}
        </span>
      </div>

      {/* Description */}
      {task.description ? (
        <p className="text-gray-400 text-sm mb-4 break-words line-clamp-4 pr-7 ">
          Desc : {task.description}
        </p>
      ) : (
        <p className="text-gray-400 text-sm mb-4 truncate">
          No description available
        </p>
      )}

      {/* Footer: Dates & Actions */}
      <div className="flex items-center justify-between gap-3 pt-3 border-t border-gray-700 mt-auto">
        <div className="flex flex-col gap-0.5 text-xs text-gray-500">
          <span>Created: {formatDateAndTime(task.createdAt)}</span>
          {task?.createdAt !== task?.updatedAt && (
            <span>Updated: {formatDateAndTime(task.updatedAt)}</span>
          )}
        </div>

        <div className="flex items-center gap-2 mt-auto ">
          <button
            onClick={() => onEdit?.(task?._id || "")}
            className="p-2 rounded-md cursor-pointer bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 transition-all"
            aria-label="Edit task"
          >
            <MdEdit size={18} />
          </button>
          <button
            onClick={() => onDelete(task?._id || "")}
            className="p-2 rounded-md cursor-pointer bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all"
            aria-label="Delete task"
          >
            <MdDelete size={18} />
          </button>
        </div>
      </div>
      <Link
        className=""
        href={`/dashboard/clients/${task.clientId}/tasks/${task._id}`}
      >
        <button className="text-blue-400 mt-4 cursor-pointer hover:text-blue-300 text-sm font-medium ">
          View Tasks →
        </button>
      </Link>
    </div>
  );
};

export default TaskCard;
