"use client";

import { useCallback, useState } from "react";
import Avatar from "../Avatar";
import { AiFillCaretDown } from "react-icons/ai";
import Link from "next/link";
import MenuItem from "./MenuItem";
import BackDrop from "./BackDrop";
import { SafeUser } from "@/types";
import { signOut } from "next-auth/react";

interface UserMenuProps {
  currentUser: SafeUser | null;
  custom?: string;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser, custom }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <>
      <div className={`relative z-30 ${custom}`}>
        <div
          onClick={toggleOpen}
          className="p-2 border-[1px] border-slate-400 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700"
        >
          <Avatar src={currentUser?.image} />
          <AiFillCaretDown />
        </div>
        {isOpen && (
          <div className="absolute rounded-md shadow-md w-[170px] bg-white overflow-hidden right-0 top-12 text-sm flex flex-col cursor-pointer">
            {currentUser ? (
              <div className="">
                <MenuItem onClick={() => {}}>
                  <div className="text-sm truncate">@{currentUser.name}</div>
                  <div className="font-semibold truncate">
                    {currentUser.email}
                  </div>
                </MenuItem>
                <hr />
                <Link href={"/orders"}>
                  <MenuItem onClick={toggleOpen}>Your Orders</MenuItem>
                </Link>
                <hr />
                <MenuItem
                  onClick={() => {
                    toggleOpen();
                    signOut();
                  }}
                >
                  Logout
                </MenuItem>
              </div>
            ) : (
              <div className="">
                <Link href={"/login"}>
                  <MenuItem onClick={toggleOpen}>Login</MenuItem>
                </Link>
                <Link href={"/register"}>
                  <MenuItem onClick={toggleOpen}>Register</MenuItem>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
      {isOpen ? <BackDrop onClick={toggleOpen} /> : null}
    </>
  );
};

export default UserMenu;
