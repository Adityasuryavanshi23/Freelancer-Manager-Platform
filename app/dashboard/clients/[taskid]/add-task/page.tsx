"use client";
import { useState } from "react";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/navigation";

const AddTaskPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Task Data:", formData);
    // API call yahan aayegi
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-6">
      <div className="w-full max-w-md border border-gray-800 rounded-2xl p-8 bg-gray-900/50 backdrop-blur-sm">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link
            href="/dashboard"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <IoArrowBack size={24} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">Add New Task</h1>
            <p className="text-gray-400 text-sm mt-1">
              Fill in the task details
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title Field */}
          <div>
            <label className="text-gray-300 text-sm font-medium mb-2 block">
              Task Title <span className="text-red-500">*</span>
            </label>
            <input
              name="title"
              type="text"
              placeholder="e.g., Design landing page"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Description Field */}
          <div>
            <label className="text-gray-300 text-sm font-medium mb-2 block">
              Description
              <span className="text-gray-500 text-xs ml-1">(Optional)</span>
            </label>
            <textarea
              name="description"
              placeholder="Add task details..."
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
            />
          </div>

          {/* Status Dropdown */}
          <div>
            <label className="text-gray-300 text-sm font-medium mb-2 block">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition-all duration-200 mt-6"
          >
            Add Task
          </button>

          {/* Cancel Button */}
          <Link
            href="/dashboard"
            className="block w-full text-center bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold py-3 rounded-xl transition-all duration-200 border border-gray-700"
          >
            Cancel
          </Link>
        </form>
      </div>
    </div>
  );
};

export default AddTaskPage;
