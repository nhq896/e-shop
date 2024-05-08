"use client";

import Container from "../Container";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
import Categories from "./Categories";
import SearchBar from "./SearchBar";
import Logo from "./Logo";
import { SafeUser } from "@/types";

interface NavBarProps {
  currentUser: SafeUser | null;
}

const NavBar: React.FC<NavBarProps> = ({ currentUser }) => {
  return (
    <div className="sticky top-0 w-full bg-white z-30 shadow-lg shadow-slate-200">
      <div className="py-4 border-b-[2px]">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Logo />
            <div className="hidden md:block">
              <SearchBar />
            </div>
            <div className="flex items-center gap-8 md:gap-12">
              <CartCount />
              <UserMenu currentUser={currentUser} />
            </div>
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
};

export default NavBar;
