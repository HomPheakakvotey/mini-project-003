import React from "react";

export default function Hero() {
  return (
    <div className="relative">
      <img
        src="https://romand.us/cdn/shop/files/PC_854fe4be-23df-427e-af3b-8c49da24415f.jpg?v=1714701935&width=1728"
        alt="Hero"
        className="w-full h-auto md:h-[500px] lg:h-[700px] relative lg:rounded-xl px-4 sm:px-6 sm:py-12 lg:px-8"
      />
      <div className="text-center">
        <p className="p-[20px] md:text-[20px] text-center sm:text-base lg:text-[26px] font-semibold mt-8 z-10">
          TRENDING NOW
        </p>
        <hr className="bg-[#2b2b2b] border-none h-[1px] w-[50%] mx-auto mb-10" />
      </div>
    </div>
  );
}
