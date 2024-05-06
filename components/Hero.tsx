import React from "react";

export default function Hero() {
  return (
    <div className="relative">
      <div
        className="md:w-full h-[600px] relative bg-cover bg-center rounded-lg md:h-[400px] lg:h-[600px]"
        style={{
          backgroundImage: `url('https://romand.us/cdn/shop/files/PC_854fe4be-23df-427e-af3b-8c49da24415f.jpg?v=1714701935&width=1728')`,
        }}
      ></div>
      <div className="text-center">
        <p className="p-[20px] md:text-[20px] text-center sm:text-base lg:text-[26px] font-semibold mt-8 z-10">
          TRENDING NOW
        </p>
        <hr className="bg-[#2b2b2b] border-none h-[1px] w-[50%] mx-auto mb-10" />
      </div>
    </div>
  );
}
