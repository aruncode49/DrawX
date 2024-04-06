import React, { useEffect, useState } from "react";
import SideBarDropdown from "./SideBarDropdown";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import SideBarBottom from "./SideBarBottom";
import { TEAM } from "@/lib/types";

const SideBar = ({ team }: { team: TEAM[] }) => {
  const { user } = useKindeBrowserClient();
  const [fileName, setFileName] = useState<string>("");
  const [testactiveTeam, setTestactiveTeam] = useState<TEAM>();
  const [activeTeam, setActiveTeam] = useState<TEAM>(testactiveTeam!);

  async function handleCreateNewFile() {
    console.log(fileName);
    console.log(team);
  }

  useEffect(() => {
    team && team.length && setActiveTeam(team[0]);
  }, [team && team.length]);

  return (
    <div className="px-6 pt-10 flex flex-col h-full pb-8">
      {/* team drop down */}
      <div className="flex-1">
        <SideBarDropdown
          team={team}
          activeTeam={activeTeam!}
          setActiveTeam={setActiveTeam}
        />
      </div>

      {/* bottom section */}
      <div>
        <SideBarBottom
          handleCreateNewFile={handleCreateNewFile}
          fileName={fileName}
          setFileName={setFileName}
        />
      </div>
    </div>
  );
};

export default SideBar;
