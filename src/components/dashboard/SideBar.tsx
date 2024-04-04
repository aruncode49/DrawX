import React from "react";
import SideBarDropdown from "./SideBarDropdown";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const SideBar = () => {
  const { user } = useKindeBrowserClient();

  return (
    <div className="px-6 pt-10">
      {/* team drop down */}
      <SideBarDropdown user={user} />
    </div>
  );
};

export default SideBar;
