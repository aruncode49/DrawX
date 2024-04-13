import { ChevronRight, MoveRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section className="bg-black/90 min-h-[calc(100vh-96px)]">
      <div className="mx-auto max-w-screen-xl px-4 py-24">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-white  flex  items-center bg-gray-700 text-sm w-fit mx-auto px-4 py-2.5 rounded-full border border-sky-800 mb-10">
            See what's new |
            <span className="text-sky-400 flex items-center pl-2">
              AI Diagram <ChevronRight size={16} />
            </span>
          </h2>

          <h1 className="text-3xl font-extrabold sm:text-5xl text-sky-300">
            Documents & diagrams
            <strong className="font-extrabold text-white sm:block">
              {" "}
              for engineering teams
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed text-gray-300">
            All-in-one markdown editor, collaborative canvas, and
            diagram-as-code builder
          </p>

          <div className="mt-8 w-fit mx-auto">
            <Link
              className="rounded-md bg-white text-black px-6 py-2.5 text-sm font-medium transition  hover:bg-gray-300 flex items-center justify-center gap-1"
              href="/workspace/try"
            >
              Try Eraser
              <MoveRight width={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
