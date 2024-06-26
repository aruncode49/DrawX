import React from "react";
import { Skeleton } from "../ui/skeleton";

const TeamNameShimmer = () => {
  return (
    <div className="flex flex-col justify-center gap-3">
      <Skeleton className="w-48 h-3 rounded-lg bg-zinc-600" />
      <Skeleton className="w-48 h-3 rounded-lg bg-zinc-600" />
    </div>
  );
};

export default TeamNameShimmer;
