import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users } from "lucide-react";
import Image from "next/image";
import React from "react";

const CreateTeam = () => {
  return (
    <div className="bg-black/95 min-h-screen p-4 text-white">
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
            className="bg-neutral-800 border-neutral-600 w-full h-12"
          />
        </div>

        <Button className="w-72 bg-blue-600 hover:bg-blue-700 mt-20 h-12 text-sm">
          Create
        </Button>
      </div>
    </div>
  );
};

export default CreateTeam;
