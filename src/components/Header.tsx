"use client";

import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";
import { MoveRight } from "lucide-react";
import Image from "next/image";

const Header = () => {
  return (
    <header className="bg-black">
      <div className="mx-auto flex h-24 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <a className="block text-teal-600" href="#">
          <Image src={"/logo-black.svg"} width={100} height={50} alt="logo" />
        </a>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <a
                  className="text-white transition hover:text-cyan-500"
                  href="#"
                >
                  Use cases
                </a>
              </li>

              <li>
                <a
                  className="text-white transition hover:text-cyan-500"
                  href="#"
                >
                  Resources
                </a>
              </li>

              <li>
                <a
                  className="text-white transition hover:text-cyan-500"
                  href="#"
                >
                  About
                </a>
              </li>

              <li>
                <a
                  className="text-white transition hover:text-cyan-500"
                  href="#"
                >
                  DiagramGPT
                </a>
              </li>

              <li>
                <a
                  className="text-white transition hover:text-cyan-500"
                  href="#"
                >
                  Pricing
                </a>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <div className="block text-sm font-medium text-white px-5 py-2.5 transition hover:text-gray-300">
                <LoginLink>Login</LoginLink>
              </div>

              <a
                className="hidden rounded-md bg-white text-black px-6 py-2.5 text-sm font-medium transition  sm:block hover:bg-gray-300 md:flex items-center justify-center gap-1"
                href="#"
              >
                Try Eraser
                <MoveRight width={16} />
              </a>
            </div>

            <button className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
