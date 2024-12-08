"use client";

import { Pagination } from "react-instantsearch";

export function SearchPagination() {
  return (
    <div className="mt-8 flex justify-center">
      <Pagination
        classNames={{
          list: "flex gap-2",
          item: "px-3 py-1 border rounded",
          selectedItem: "bg-blue-500 text-white",
        }}
        padding={2}
        totalPages={10}
      />
    </div>
  );
}
