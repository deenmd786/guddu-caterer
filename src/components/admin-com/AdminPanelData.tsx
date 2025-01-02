"use client";

import Image from "next/image";
import { FaUser } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import apiHelper from "@/utils/apiHelper";
import { setUser } from "@/redux/userSlice";

const AdminPanelData: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    console.log("useEffected");

    const fetchUserData = async () => {
      setError(null);
      setLoading(true);
      try {
        const data = await apiHelper("/api/user/me", {
          method: "POST",
        });

        dispatch(setUser(data.user));
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false); // Set loading to false when fetching ends
      }
    };
    fetchUserData();
  }, [dispatch]);

  if (loading) {
    return (
      <>
        <div className="h-[8vh] md:h-[25vh] w-full flex flex-col items-center justify-center bg-[var(--background-secondary)] md:border-b-4 border-[var(--background)]">
          <div className="animate-pulse space-x-2 shadow-sm rounded-full bg-[var(--background)] w-12 h-12 md:w-24 md:h-24 flex items-center justify-center">
            <div className="bg-gradient-to-r from-red-200 to-red-100 rounded-full w-10 h-10 md:w-20 md:h-20"></div>
          </div>
          <div className="hidden md:flex mt-3 mx-2 bg-gradient-to-r from-red-200 to-red-100 rounded h-6 mb-2 w-40"></div>
          <div className="hidden md:flex mx-2 bg-gradient-to-r from-red-200 to-red-100 rounded h-4 w-24"></div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <div className="h-[8vh] md:h-[25vh] w-full flex flex-col items-center justify-center bg-[var(--background-secondary)] md:border-b-4 border-[var(--background)]">
        <div className="text-[var(--text-primary)]">Error: User not loged in !!!</div>
      </div>
    );
  }

  return (
    <div className="h-[7vh] md:h-[25vh] w-full flex text-[var(--text-primary)] flex-col capitalize items-center justify-center bg-[var(--background-secondary)] border-[var(--background)]">
      <div className="space-x-2 shadow-lg rounded-full text-[var(--text-primary)] cursor-pointer border-2 hover:border-[var(--button)] border-[var(--background)] p-1">
        {user?.profilePic ? (
          <Image
            src={user.profilePic}
            alt={user.name}
            className="w-10 h-10 md:w-20 md:h-20 rounded-full"
            width={200}
            height={200}
          />
        ) : (
          <FaUser className="text-xl md:text-4xl md:m-4" />
        )}
      </div>
      <p className="hidden md:flex mt-3 mx-2 md:text-lg text-wrap">
        {user?.name}
      </p>
      <p className="hidden md:flex mx-2 text-[12px] md:text-md text-normal">
        {user?.role}
      </p>
    </div>
  );
};

export default AdminPanelData;
