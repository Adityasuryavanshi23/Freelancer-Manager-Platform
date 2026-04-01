"use client";
import useSWR from "swr";
import { deleteClient, fetcher } from "@/lib/services";
import { useSession } from "next-auth/react";
import ClientCards from "@/components/ClientCards";
import Link from "next/link";
import { CiSquarePlus } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { Client } from "@/lib/types";

const Page = () => {
  const { data, error, isLoading, mutate } = useSWR("/clients", fetcher);
  const { data: session } = useSession();
  const router = useRouter();
  const clients: Client[] = data?.clients || [];

  const onDelete = async (clientId: string) => {
    try {
      const res = await deleteClient(clientId);
      mutate();
      console.log(res);
    } catch (error) {
      console.log("fialed to delete a client right now", error);
    }
  };

  const onEdit = (clientId: string) => {
    console.log(clientId);
    router.push(`/dashboard/clients/add?id=${clientId}`);
  };

  if (!session) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl">
        <p className="animate-bounce">
          pls login first to get the content{" "}
          <a href="/login" className="text-blue-600 underline">
            Login
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-6   p-3 sm:p-6  ">
      {isLoading && (
        <p className="text-white min-h-screen  text-xl flex items-center justify-center">
          Loading...
        </p>
      )}
      <div className="max-w-7xl mx-auto mb-4 flex justify-center items-center ">
        <p className="text-2xl font-semibold text-blue-400">All Clients</p>
      </div>

      <div className="max-w-7xl mx-auto">
        {clients.length === 0 ? (
          <div className="text-center mt-7 animate-pulse">
            There is no client available{" "}
            <Link href={"/dashboard/clients/add"}>
              <span className="bg-blue-600/80 ml-2  hover:bg-blue-600 font-semibold px-4 py-1 rounded-lg ">
                Add client
              </span>
            </Link>
          </div>
        ) : (
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {clients.map((client: Client) => (
              <ClientCards
                key={client._id}
                client={client}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
            <div
              onClick={() => router.push("/dashboard/clients/add")}
              className="grid items-center justify-center w-full  cursor-pointer bg-gray-800 border border-gray-700 rounded-lg hover:shadow-lg hover:border-gray-600 transition-all  group py-9"
            >
              <div className="flex flex-col-reverse items-center gap-3 ">
                <p className="text-gray-400 group-hover:text-gray-200">
                  Add Client
                </p>

                <CiSquarePlus className="w-20 h-20 text-gray-600 group-hover:text-gray-200" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
