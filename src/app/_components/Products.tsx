"use client";
import { Button } from "@/components/ui/button";
import { GetProducts } from "@/lib/http/GetProducts";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import { Products as ProductType } from "../admin/products/_components/Column";
import { Loader2 } from "lucide-react";

const Products = () => {
  const { data: products, isSuccess, isError, isFetched } = useQuery({
    queryKey: ["products"],
    queryFn: GetProducts,
    staleTime: 1000 * 60 * 1, // 5 minutes, data is fresh for 5 minutes
    cacheTime: 1000 * 60 * 10, // Cache the data for 10 minutes
    refetchOnWindowFocus: false,
  });

  if (products?.status === 500) {
    return (
      <div className="w-full h-screen flex font-bold text-xl font-mono items-center justify-center capitalize text-red-800">
        error getting products, Please try again later!
      </div>
    );
  }

  if (products) {
    return (
      <div className="flex flex-wrap gap-8 items-center justify-center">
        {products.map((product: ProductType) => (

<div key={product.id} className="relative w-80 bg-white rounded-2xl shadow-lg p-6 lg:mt-6">
{/* Product Image Section */}
<div className="w-full h-40 bg-red-400 rounded-xl flex items-center justify-center">
  <img
    src={`/assets/${product.image}`}
    alt="Beats Headphones"
    className="h-full w-full object-cover"
  />
</div>

{/* Product Details */}
<div className="mt-4">
  <h2 className="text-lg font-bold">{product.name}</h2>
  <p className="text-2xl font-extrabold mt-1">${product.price}</p>
  <p className="text-gray-600 text-sm mt-2">
    {product.description}
  </p>

  {/* Color Selection */}
  <div className="flex items-center mt-4 space-x-2">
    <div className="w-5 h-5 bg-green-600 rounded-full border-2 border-gray-300 lg:mb-4"></div>
  </div>

  {/* Add to Cart Button */}
  <Link  href={`/products/${product.id}`} className="mt-5 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-full shadow-md transition">
    Buy Now
  </Link>
</div>
</div>
          // <div
          //   key={product.id}
          //   className="flex flex-wrap gap-4 mt-8 w-full sm:w-80 md:w-72 rounded-md "
          // >
          //   <div className="bg-gradient-to-tr p-2 from-green-500 to-green-700 shadow-lg rounded-md hover:shadow-2xl transform transition-all duration-300 ease-in-out overflow-hidden h-[400px] flex flex-col justify-between w-80">
          //     <div className="w-full h-[40%] overflow-hidden rounded-xl">
          //       <img
          //         className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
          //         src={`/assets/${product.image}`}
          //         alt={product.name}
          //       />
          //     </div>
          //     <div className="p-4 flex font-sans flex-col items-center gap-3">
          //       <h3 className="text-xl font-bold text-gray-200 uppercase text-center">
          //         {product.name}
          //       </h3>
          //       <h2 className="text-xl font-extrabold text-gray-200">
          //         ${product.price}
          //       </h2>
          //       <Link
          //         className=" bg-[#23de51]  text-white font-bold uppercase tracking-tighter p-3 w-full rounded-lg text-center transition-all duration-300 ease-in-out transform hover:bg-green-900 hover:scale-105"
          //         href={`/products/${product.id}`}
          //       >
          //         Buy Now
          //       </Link>
          //     </div>
          //   </div>
          // </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Loader2 className="animate-spin text-blue-500 text-6xl" />
    </div>
  );
};

export default Products;
