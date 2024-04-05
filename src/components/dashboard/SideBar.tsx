import React from "react";
import SideBarDropdown from "./SideBarDropdown";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import SideBarBottom from "./SideBarBottom";

const SideBar = () => {
  const { user } = useKindeBrowserClient();

  return (
    <div className="px-6 pt-10 flex flex-col h-full pb-8">
      {/* team drop down */}
      <div className="flex-1">
        <SideBarDropdown />
      </div>

      {/* bottom section */}
      <div>
        <SideBarBottom />
      </div>
    </div>
  );
};

export default SideBar;
