"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import axios from "axios";
import { LoaderCircle, Users } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const CreateTeam = () => {
  const [teamName, setTeamName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useKindeBrowserClient();

  const router = useRouter();

  async function createTeam() {
    try {
      setLoading(true);
      const res = await axios.post("/api/team/create", {
        teamName,
        createdBy: user?.email,
      });

      if (res.data.success) {
        router.push("/dashboard");
        toast.success(res.data.msg);
      } else {
        toast.error(res.data.msg);
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-black/90 min-h-screen p-4 text-white">
      <Image
        src={"/logo-black.svg"}
        alt="eraser-logo"
        width={140}
        height={140}
        className="mx-auto mt-5 md:mt-10 md:ml-10"
      />

      <div className="flex flex-col justify-center mt-10 items-center px-8">
        <div className="flex items-center justify-center text-xs md:text-sm bg-green-800/80 p-1 px-2 gap-1 text-green-400 rounded-md border border-green-600 mb-10">
          <Users size={14} />
          <span>Team Name</span>
        </div>
        <h1 className="font-extrabold text-4xl">
          What should we call your team?
        </h1>
        <p className="mt-6 text-gray-300">
          You can always change this later from settings.
        </p>

        {/* input box */}
        <div className="flex flex-col justify-center mt-10 w-full md:w-[450px]">
          <h3 className="text-gray-300 mb-1 text-sm font-medium">Team Name</h3>
          <Input
            placeholder="Team name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="bg-neutral-800 border-neutral-600 w-full h-12"
          />
        </div>

        <Button
          disabled={teamName.length < 1}
          onClick={createTeam}
          className="w-72 bg-blue-600 hover:bg-blue-700 mt-20 h-12 text-sm"
        >
          {loading ? <LoaderCircle className="animate-spin" /> : "Create"}
        </Button>
      </div>
    </div>
  );
};

export default CreateTeam;
