import { connectDB } from "@/lib/db";

import { NextResponse } from "next/server";
import { Client } from "@/models/ClientSchema";
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
    const { searchParams } = new URL(req.url);
    const fetchAllClients = searchParams.get("all") === "true";

    const clients = fetchAllClients
      ? await Client.find()
      : await Client.find({ userEmail: session?.user.email }).sort({
          createdAt: -1,
        });
    const tasks = await Task.find();

    const clientWithtasks = clients.map((client) => ({
      ...client.toObject(),
      tasks: tasks.filter(
        (task) => task.clientId.toString() === client._id.toString(),
      ),
    }));

    if (clientWithtasks.length === 0) {
      return NextResponse.json({
        message: `No Clients Has Been Created Yet  for ${session.user.email}`,
      });
    }
    return NextResponse.json(
      {
        message: fetchAllClients
          ? "All clients fetched successfully"
          : "User's clients fetched successfully",
        clients: clientWithtasks,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch clients" },
      { status: 500 },
    );
  }
};

export const POST = async (req: Request) => {
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
    const { name, email, company, userEmail } = await req.json();
    if (!name || !email || !userEmail) {
      return NextResponse.json(
        { error: "Name, email and userEmail are required" },
        { status: 400 },
      );
    }

    const newClient = new Client({
      name,
      email,
      company,
      userEmail: session.user.email,
    });

    await newClient.save();

    return NextResponse.json(
      {
        clientData: newClient,
        message: "Client created successfully",
      },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to create client", errorMessage: error.message },
      { status: 500 },
    );
  }
};
