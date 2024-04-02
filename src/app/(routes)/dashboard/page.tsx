"use client";

import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import React from "react";
import { Button } from "@/components/ui/button";

const DashboardPage = () => {
  return (
    <div>
      DashboardPage <br />
      <LogoutLink>
        <Button>Logout</Button>
      </LogoutLink>
    </div>
  );
};

export default DashboardPage;
