import SideBar from "@/components/Sidebar";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Admin = () => {
    // const navigate = useNavigate()
    // useEffect(()=>{
    //     navigate('dashboard')
    // })

    return (
        <div className="bg-gray-200 flex pt-16">
            <SideBar />
            <div className="flex-1">
                <Outlet />
            </div>
        </div>
    );
};

export default Admin;
