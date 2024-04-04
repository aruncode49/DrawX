"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { user } = useKindeBrowserClient();
  const router = useRouter();

  async function getTeam() {
    try {
      const res = await axios.post("/api/team/get", { createdBy: user?.email });
      if (!res.data.success) {
        router.push("/team/create");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    if (user) getTeam();
  }, [user]);

  return <div>{children}</div>;
};

export default DashboardLayout;
