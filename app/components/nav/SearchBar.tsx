"use client";

import { useRouter } from "next/navigation";
import queryString from "query-string";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { IoMdSearch } from "react-icons/io";

const SearchBar = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      searchTerm: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log(data);
    if (!data.searchTerm) {
      return router.push("/");
    }

    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: {
          searchTerm: data.searchTerm.trim(),
        },
      },
      { skipNull: true }
    );

    router.push(url);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center">
      <input
        {...register("searchTerm")}
        autoComplete="off"
        type="text"
        placeholder="Explore E-Shop"
        className="p-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-slate-500 w-80"
      />
      <button
        type="submit"
        onClick={handleSubmit(onSubmit)}
        className="bg-slate-700 hover:opacity-80 text-white p-2 rounded-r-md border border-slate-700 border-l-0"
      >
        <IoMdSearch size={24} />
      </button>
    </form>
  );
};

export default SearchBar;
