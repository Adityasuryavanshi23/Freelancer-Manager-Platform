import { connectDB } from "@/lib/db";
import { Client } from "@/models/ClientSchema";
import { Task } from "@/models/TaskSchema";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ clientid: string }> },
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
    const { clientid } = await params;
    console.log(clientid);

    const clientData = await Client.findById(clientid);
    if (clientData?.userEmail !== session.user.email) {
      return NextResponse.json(
        {
          message: "Unauthorized to access this client",
        },
        { status: 401 },
      );
    }
    if (!clientData) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    const clientDataWithTasks = {
      ...clientData.toObject(),
      tasks: await Task.find({ clientId: clientid }),
    };

    return NextResponse.json(
      {
        message: `Client ID received successfully: ${clientid}`,
        clientData: clientDataWithTasks,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process client ID" },
      { status: 500 },
    );
  }
};

export const DELETE = async (
  req: Request,

  { params }: { params: Promise<{ clientid: string }> },
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
    const { clientid } = await params;

    const DeletedclientTasks = await Task.find({ clientId: clientid });
    const clientTasks = await Task.findByIdAndDelete(clientid);
    const deletClient = await Client.findByIdAndDelete({ _id: clientid });
    if (deletClient?.userEmail !== session.user.email) {
      return NextResponse.json(
        {
          message: "Unauthorized to access this client",
        },
        { status: 401 },
      );
    }
    if (!deletClient) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: `Client with ID ${clientid} deleted successfully`,
        clientdata: deletClient,
        taskdata: DeletedclientTasks,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Failed to delete client",
        errorMessage: error.message,
      },
      { status: 500 },
    );
  }
};

export const PUT = async (
  req: Request,
  { params }: { params: Promise<{ clientid: string }> },
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
    const { clientid } = await params;

    const { name, email, company } = await req.json();

    const existingClient = await Client.findById(clientid);

    if (!existingClient) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }
    if (existingClient?.userEmail !== session.user.email) {
      return NextResponse.json(
        {
          message: "Unauthorized to access this client",
        },
        { status: 401 },
      );
    }
    const updatedClient = await Client.findByIdAndUpdate(
      clientid,
      {
        name,
        email,
        company,
      },
      {
        new: true,
        runValidators: true,
      },
    );
    return NextResponse.json({
      message: "Client updated successfully",
      AfterUpdateClientData: updatedClient,
      BeforeUpdateClientData: existingClient,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: "Failed to update client",
      errorMessage: error.message,
    });
  }
};
