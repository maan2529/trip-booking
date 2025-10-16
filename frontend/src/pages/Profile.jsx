import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProfileHeader from "../components/ProfileHeader";
import MyBooking from "../pages/MyBookings";
import { useState } from "react";

const Profile = () => {
    const [userData, setUserData] = useState(
        () => JSON.parse(localStorage.getItem("userData")) || null
    );

    return (
        <>

            <div className="flex justify-center w-full bg-[#F9FAFB]">
                <div className=" w-full max-w-[1500px] mx-2">
                    <ProfileHeader userData={userData} />

                    <div className="  mt-8">
                        <MyBooking />
                    </div>
                </div>
            </div>

        </>
    );
};

export default Profile;