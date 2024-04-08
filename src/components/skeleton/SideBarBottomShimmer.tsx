import React from "react";
import { Skeleton } from "../ui/skeleton";

const SideBarBottomShimmer = () => {
  return (
    <div className="flex flex-col justify-center gap-3">
      <Skeleton className="w-48 h-3 rounded-lg bg-zinc-600" />
      <Skeleton className="w-48 h-3 rounded-lg bg-zinc-600" />
      <Skeleton className="w-48 mt-3 h-7 rounded-lg bg-zinc-600" />
      <Skeleton className="w-48 h-3 mt-3 rounded-lg bg-zinc-600" />
      <Skeleton className="w-48 h-3 rounded-lg bg-zinc-600" />
    </div>
  );
};

export default SideBarBottomShimmer;
