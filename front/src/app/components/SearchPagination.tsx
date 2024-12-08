"use client";

import { Pagination } from "react-instantsearch";
import { useEffect, useState, useRef } from "react";
import { useInstantSearch } from "react-instantsearch";

export function SearchPagination() {
  const { results } = useInstantSearch();
  const [isReady, setIsReady] = useState(false);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (results && isMounted.current) {
      setIsReady(true);
    }
  }, [results]);

  // Don't render anything if results aren't ready
  if (!isReady || !results) {
    return null;
  }

  return (
    <div className="mt-8 flex justify-center">
      <Pagination
        classNames={{
          list: "flex gap-2",
          item: "px-3 py-1 border rounded hover:bg-gray-100 transition-colors",
          selectedItem: "bg-blue-500 text-white hover:bg-blue-600",
        }}
        padding={2}
        totalPages={results.nbPages}
      />
    </div>
  );
}
