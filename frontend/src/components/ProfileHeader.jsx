  import React from "react";
import { useNavigate } from "react-router-dom";

const ProfileHeader = ({userData}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex items-center justify-between max-w-[1200px] w-full mx-auto mt-10">
      <div className="flex items-center gap-4">
        <img
          src="https://i.pravatar.cc/100?img=3"
          alt="User Avatar"
          className="w-16 h-16 rounded-full object-cover"
        />

        <div>
          <h3 className="text-lg font-semibold text-gray-900">{userData?.name}</h3>
          <p className="text-sm text-gray-500">{userData?.email}</p>
          <button
            className="text-sm text-blue-600 hover:underline mt-1"
            onClick={() => navigate("/profile/manage",{
              state:{
                userData
              }
            })}
          >
            Manage Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;