"use client";

import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";

const DashboardPage = () => {
  const { user } = useKindeBrowserClient();

  async function createUser() {
    try {
      if (user) {
        const res = await axios.post("/api/user", {
          name: user.given_name,
          email: user.email,
          image: user.picture,
        });

        if (res.data.success) {
          console.log(res.data);
        }
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    createUser();
  }, [user]);

  return (
    <div>
      <h1>Hello Dashboard</h1>
    </div>
  );
};

export default DashboardPage;
