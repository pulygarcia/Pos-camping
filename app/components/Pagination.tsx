"use client";

import Link from "next/link";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

export default function PaginationNumbers({ currentPage, totalPages }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
        {currentPage <= 1 ? null : 
            <Link
                href={`?page=${currentPage - 1}`}
                className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-blue-500"
            >
                Anterior
            </Link>
        }

      {pages.map((page) => (
        <Link
          key={page}
          href={`?page=${page}`}
          className={`px-3 py-1 rounded border ${
            page === currentPage
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-white text-blue-500 border-gray-300 hover:bg-gray-100"
          }`}
        >
          {page}
        </Link>
      ))}

        {currentPage >= totalPages ? null : 
            <Link
                href={`?page=${currentPage + 1}`}
                className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-blue-500"
            >
                Siguiente
            </Link>
        }
    </div>
  );
}
