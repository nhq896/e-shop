"use client";

import { categories } from "@/utils/Categories";
import Container from "../Container";
import Category from "./Category";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category") as string;
  const pathname = usePathname();

  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <Suspense>
      <div className="bg-white">
        <Container>
          <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
            {categories.map((item) => {
              return (
                <Category
                  key={item.label}
                  label={item.label}
                  icon={item.icon}
                  selected={
                    category === item.label ||
                    (category === null && item.label === "All")
                  }
                />
              );
            })}
          </div>
        </Container>
      </div>
    </Suspense>
  );
};

export default Categories;
