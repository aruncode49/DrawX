"use client";

import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import React from "react";

const DashboardPage = () => {
  return (
    <div>
      DashboardPage <br />
      <LogoutLink>Logout</LogoutLink>
    </div>
  );
};

export default DashboardPage;
