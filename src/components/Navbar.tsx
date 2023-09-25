import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "@/components/ThemeToggle";

const Navbar = () => {
  return (
    <nav className="p-4 justify-between space-x-4 gap-12 items-center  flex">
      <Link href="/">
        <Image src="/logo.png" width="50" height="50" alt="Ryan Logo" />
      </Link>
      <h1 className="text-lg font-black ">Ryan</h1>
      <ModeToggle />
    </nav>
  );
};

export default Navbar;
