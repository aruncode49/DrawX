import { LoaderCircle } from "lucide-react";
import React from "react";

const Loader = () => {
  return (
    <div className="bg-black/90 h-screen w-full flex justify-center items-center">
      <LoaderCircle className="animate-spin" color="white" size={60} />
    </div>
  );
};

export default Loader;
