"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import React, { useEffect } from "react";

import axios from "axios";
import Header from "@/components/dashboard/Header";
import FileList from "@/components/dashboard/FileList";

const DashboardPage = () => {
  const { user } = useKindeBrowserClient();

  async function createUser() {
    try {
      if (user) {
        await axios.post("/api/user", {
          name: user.given_name,
          email: user.email,
          image: user.picture,
        });
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    createUser();
  }, [user]);

  return (
    <div className="bg-black/90 h-full">
      <div className="pt-8 pl-[70px] pr-12">
        <Header />
        <FileList />
      </div>
    </div>
  );
};

export default DashboardPage;
