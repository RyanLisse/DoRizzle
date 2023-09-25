import React from "react";
import Link from "next/link";
import { ModeToggle } from "@/components/ThemeToggle";

const Navbar = () => {
  return (
    <nav className="p-4 justify-between space-x-4 gap-12 items-center  flex">
      <Link href="/">
          <h1 className="text-lg font-black ">Ryan</h1>
      </Link>

      <ModeToggle />
    </nav>
  );
};

export default Navbar;
