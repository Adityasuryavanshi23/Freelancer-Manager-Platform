import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Task } from "@/models/TaskSchema";
import { getServerSession } from "next-auth";

export const GET = async (req: Request) => {
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
    const { searchParams } = new URL(req?.url);

    const fetchAll = searchParams.get("all") === "true";

    const tasks = fetchAll
      ? await Task.find()
      : await Task.find({ userEmail: session?.user.email }).sort({ createdAt: -1 });

    return NextResponse.json({
      message: fetchAll
        ? "All tasks fetched successfully"
        : "User's tasks fetched successfully",
      tasksData: tasks,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch tasks", errorMessage: error.message },
      { status: 500 },
    );
  }
};

export const POST = async (req: Request) => {
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
    const { title, description, status, clientId } =
      await req.json();

    const newTask = new Task({
      title,
      description,
      status,
      userEmail: session.user.email,
      clientId,
    });
    await newTask.save();

    return NextResponse.json(
      { message: "Task created successfully", taskData: newTask },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json({
      error: "Failed to create task",
      errorMessage: error.message,
    });
  }
};
