import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

function MyProfile() {
  const { loggedInUser: user } = useContext(AuthContext);

  // Helper function to get initials if image doesn't exist
  const getInitials = (firstName, lastName) => {
    if (!firstName || !lastName) return "";
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  return (
    <div className="my-10 max-w-md mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4">
        <div className="flex items-center justify-center">
          {user?.image ? (
            <img
              className="w-24 h-24 rounded-full"
              src={user.image}
              alt={`${user.firstName} ${user.lastName}`}
            />
          ) : (
            <div className="w-24 h-24 flex items-center justify-center bg-red-500 text-white rounded-full text-2xl">
              {getInitials(user?.firstName, user?.lastName)}
            </div>
          )}
        </div>
        <div className="mt-4 text-center">
          <h2 className="text-xl font-bold">{`${user?.firstName} ${user?.lastName}`}</h2>
          <p className="text-gray-600 dark:text-gray-300">{user.username}</p>
          <p className="text-gray-600 dark:text-gray-300">{user?.email}</p>
        </div>
      </div>
      <div className="px-6 py-4">
        <h3 className="text-lg font-semibold">Additional Information</h3>
        <p className="text-gray-600 dark:text-gray-300">
          Account created: {new Date(user?.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

export default MyProfile;
