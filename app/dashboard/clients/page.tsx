"use client";
import useSWR from "swr";
import { fetcher } from "@/lib/services";
import { useSession } from "next-auth/react";
import ClientCards from "@/components/ClientCards";
const Page = () => {
  const { data, error, isLoading } = useSWR("/clients", fetcher);
  const { data: session } = useSession();
  const clients = data?.clients || [];
  console.log(data);
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
    <div className="min-h-screen bg-gray-800 pt-12  ">
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
          <p className="text-white text-xl">No clients found.</p>
        ) : (
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {clients.map(
              (client: {
                _id: string;
                name: string;
                email: string;
                company: string;
                tasks: any[];
              }) => (
                <ClientCards key={client._id} client={client} />
              ),
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
