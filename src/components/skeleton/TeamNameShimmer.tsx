import React from "react";
import { Skeleton } from "../ui/skeleton";

const TeamNameShimmer = () => {
  return (
    <div className="flex flex-col justify-center gap-1">
      <Skeleton className="w-32 h-3 rounded-lg bg-zinc-600" />
      <Skeleton className="w-32 h-3 rounded-lg bg-zinc-600" />
    </div>
  );
};

export default TeamNameShimmer;
