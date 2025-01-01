"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { fetcher } from "@/utils/api";
import { User } from "@/types/User";
import { MdModeEdit } from "react-icons/md";
import AdminUpdate from "@/components/admin-com/AdminUpdate";


const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]); // State for users
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [selectedUser , setSelectedUser ] = useState<User | null>(null); // State to hold the selected user

  console.log("Users: ", users);

  useEffect(() => {
    // Fetch all users
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await fetcher<{ message: string; users: User[] }>("/api/users");
        setUsers(data.users); // Set the fetched users in state
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Render loading state
  if (loading) return <p>Loading users...</p>;

  // Render error state
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      {users.length > 0 ? (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Profile Picture</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Role</th>
              <th className="border border-gray-300 px-4 py-2">Edit</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="border border-gray-300 px-4 py-2">
                  {user.profilePic ? (
                    <Image
                      width={100}
                      height={100}
                      src={user.profilePic}
                      alt={`${user.name}'s profile`}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                <td className="border border-gray-300 px-4 py-2">{user.role}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <div
                    className="bg-red-500 py-2 flex items-center justify-center rounded-full text-black cursor-pointer"
                    onClick={() => setSelectedUser (user)}
                  >
                    <MdModeEdit />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}
      {selectedUser  && <AdminUpdate onClose={() => setSelectedUser(null)} user={selectedUser } />} {/* Pass the selected user to the UserUpdate component */}
    </div>
  );
};

export default UsersPage;