"use client";

import { ChevronDown, LogOut, Settings, Users } from "lucide-react";

import Image from "next/image";
import React, { useEffect, useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";

import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import axios from "axios";

import TeamNameShimmer from "../skeleton/TeamNameShimmer";

// ************ code starts from here ************

const links = [
  {
    id: 1,
    name: "Create Team",
    path: "/team/create",
    icon: <Users size={16} />,
  },
  {
    id: 2,
    name: "Settings",
    path: "",
    icon: <Settings size={16} />,
  },
];

interface TEAM {
  teamName: string;
  _id: string;
  createdBy: string;
}

const SideBarDropdown = () => {
  const { user } = useKindeBrowserClient();
  const [team, setTeam] = useState<TEAM[]>([]);
  const [activeTeam, setActiveTeam] = useState<TEAM>(team[0]);

  async function getTeams() {
    try {
      const res = await axios.post("/api/team/get", { createdBy: user?.email });
      if (res?.data?.success) {
        setTeam(res?.data?.team);
        setActiveTeam(res?.data?.team[0]);
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
    }
  }

  useEffect(() => {
    user && getTeams();
  }, [user]);

  return !activeTeam ? (
    <div className="flex justify-center mt-3">
      <TeamNameShimmer />
    </div>
  ) : (
    <div className="flex justify-center">
      <Popover>
        <PopoverTrigger>
          <div className="flex items-center gap-1 cursor-pointer hover:bg-zinc-700 px-3 py-2 rounded-lg duration-200 ">
            <Image
              className="mr-1"
              src={"/logo.png"}
              alt="eraser-logo"
              width={30}
              height={30}
            />
            <span className="font-bold ">
              {activeTeam && activeTeam.teamName}
            </span>
            <ChevronDown size={18} />
          </div>
        </PopoverTrigger>
        <PopoverContent className="bg-zinc-900 text-white border-zinc-600 text-sm w-52 p-2">
          {/* team names */}
          <div className="flex flex-col w-full border-b border-zinc-700 pb-2 gap-[3px]">
            {team &&
              team.length &&
              team.map((t) => (
                <p
                  key={t?._id}
                  onClick={() => setActiveTeam(t)}
                  className={`hover:bg-zinc-700 cursor-pointer p-1 px-2 rounded-sm ${
                    activeTeam._id == t._id
                      ? "bg-blue-500 hover:bg-blue-500"
                      : ""
                  }`}
                >
                  {t?.teamName}
                </p>
              ))}
          </div>

          {/* settings */}
          <div className="flex flex-col w-full border-b border-zinc-700 pb-2 mt-2">
            {links.map((link) => (
              <div key={link.id}>
                <Link
                  className="flex items-center gap-2 hover:bg-zinc-700 cursor-pointer p-1 px-2 rounded-sm"
                  href={link.path}
                >
                  {link.icon}
                  {link.name}
                </Link>
              </div>
            ))}

            {/* logout link */}
            <LogoutLink className="flex items-center gap-2 hover:bg-zinc-700 cursor-pointer p-1 px-2 rounded-sm">
              <LogOut size={16} /> Logout
            </LogoutLink>
          </div>

          {/* user profile preview */}
          {user && (
            <div className="py-1 pb-2 mt-2 flex items-center gap-2">
              <span>
                <Image
                  src={user?.picture!}
                  width={30}
                  height={30}
                  alt="user-avatar"
                  className="rounded-full w-[30px] h-[30px] bg-zinc-600"
                />
              </span>

              <span>
                <h1 className="font-medium">{`${user.given_name} ${user.family_name}`}</h1>
                <p className="text-xs text-zinc-400">{user.email}</p>
              </span>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SideBarDropdown;
