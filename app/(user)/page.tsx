"use client";
import Hero from "@/components/Hero";
import CardProduct from "@/components/card/Card";
import { ProductType } from "@/lib/definition";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [products, setProduct] = useState<ProductType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const pageSize = 8;

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_DJANGO_API_URL}/api/products/?page=${currentPage}&page_size=${pageSize}`
    )
      .then((res) => res.json())
      .then((data) => setProduct(data.results));
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section>
      <Hero/>
      <section className="mt-10 container mx-auto p-8 grid grid-cols-1 sm:grid-cols-2 sm:p-8 grid-flow-row gap-6 md:grid-cols-4 z-10 ">
        {products.map((product: any, index) => (
          <CardProduct
            onClick={() => router.push(`${product.id}`)}
            key={index}
            name={product.name}
            image={product.image}
            price={product.price}
          />
        ))}
      </section>
      <nav className="grid place-content-center my-10 ">
        <ul className="inline-flex -space-x-px text-sm mx-auto">
          <li>
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-black bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Previous
            </button>
          </li>
          {[...Array(5)].map((_, index) => (
            <li key={index}>
              <button
                onClick={() => handlePageChange(index + 1)}
                className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                  currentPage === index + 1
                    ? "text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                    : ""
                }`}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-100 bg-red-500 border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              disabled={products.length < pageSize}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </section>
  );
}
