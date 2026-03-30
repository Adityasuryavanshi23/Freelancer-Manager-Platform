import { connectDB } from "@/lib/db";
import { Task } from "@/models/TaskSchema";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
export const GET = async (
  req: Request,
  { params }: { params: { taskid: string } },
) => {
  await connectDB();
  const session = await getServerSession();

  if (!session || !session.user?.email) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      { status: 401 },
    );
  }

  try {
    const { taskid } = await params;

    const taskData = await Task.findById(taskid);

    if (taskData?.userEmail !== session.user.email) {
      return NextResponse.json(
        {
          message: "Unauthorized to access this task",
        },
        { status: 401 },
      );
    }
    if (!taskData) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: `Task ID received successfully: ${taskid}`,
      taskData,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: "Failed to process task ID",
      error: error.message,
    });
  }
};

export const PUT = async (
  req: Request,
  { params }: { params: Promise<{ taskid: string }> },
) => {
  const session = await getServerSession();

  if (!session || !session.user?.email) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      { status: 401 },
    );
  }
  await connectDB();

  try {
    const { taskid } = await params;
    const { title, description, status } = await req.json();

    const existingTask = await Task.findById(taskid);

    if (existingTask?.userEmail !== session.user.email) {
      return NextResponse.json(
        {
          message: "Unauthorized to access this task",
        },
        { status: 401 },
      );
    }
    if (!existingTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }
    const upadatedTask = await Task.findByIdAndUpdate(
      taskid,
      {
        title,
        description,
        status,
      },
      { new: true, runValidators: true },
    );
    return NextResponse.json({
      message: "Task updated successfully",
      BeforeUpdatedTask: existingTask,
      AfterUpdatedTask: upadatedTask,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: "Failed to update task",
      error: error?.message,
    });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: Promise<{ taskid: string }> },
) => {
  const session = await getServerSession();

  if (!session || !session.user?.email) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      { status: 401 },
    );
  }
  await connectDB();

  try {
    const { taskid } = await params;

    const existingTask = await Task.findById(taskid);

    if (existingTask?.userEmail !== session.user.email) {
      return NextResponse.json(
        {
          message: "Unauthorized to access this task",
        },
        { status: 401 },
      );
    }
    if (!existingTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }
    await Task.findByIdAndDelete(taskid);
    return NextResponse.json({
      message: "Task deleted successfully",
      deletedTask: existingTask,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: "Failed to delete task",
      error: error?.message,
    });
  }
};
