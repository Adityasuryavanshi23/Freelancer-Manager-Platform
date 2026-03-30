"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Navbar = () => {
  const pathname = usePathname();

  if (pathname === "/login") {
    return null;
  }
  const { data, status } = useSession();
  console.log("user", data, "status", status);

  return (
    <nav className="border-b border-slate-700  bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href={"/"}>
              <span className="text-2xl font-bold text-slate-900 dark:text-white">
                FreelanceHub
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {status === "authenticated" ? (
              <>
                <div className="flex items-center justify-center  rounded-full gap-4">
                  {!data?.user?.image ? (
                    <div className="bg-black h-8 w-8 rounded-full flex items-center justify-center text-white">
                      {data?.user?.name?.slice(0, 1).toUpperCase()}
                    </div>
                  ) : (
                    <Image
                      src={data?.user?.image || "/default-avatar.png"}
                      alt="User Avatar"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  )}
                </div>

                <div>
                  <p className="text-xl">{data?.user?.name}</p>
                  <p className="text-xs">( {data?.user?.email} )</p>
                </div>
                <Link
                  href="/dashboard"
                  className="px-6  bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium py-2"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="cursor-pointer  bg-red-600 px-6  text-white rounded-lg hover:bg-red-700 transition-colors font-medium  py-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
