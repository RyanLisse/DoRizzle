import React from "react";
import { ModeToggle } from "./theme-toggle";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="p-4 justify-between space-x-4 gap-12 items-center  flex">
      <Link href="/">
          <Image src="/logo.png" width="50" height="50" alt="Ryan Logo" />
      </Link>
      <h1 className="text-lg font-black ">DoRizzle</h1>
      <ModeToggle />
    </nav>
  );
};

export default Navbar;
