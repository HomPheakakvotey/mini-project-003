import React from "react";
import { FaGooglePlus } from "react-icons/fa";
import { FaSpotify } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaFacebookMessenger } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

export default function Company() {
  return (
    <main>
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 sm:py-12 lg:px-8">
        <div className="text-center">
          <p className="p-[20px] md:text-[20px] text-center sm:text-base lg:text-[26px] font-semibold z-10">
            OUR PARTNER
          </p>
          <hr className="bg-[#2b2b2b] border-none h-[1px] w-[50%] mx-auto" />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 p-[50px] leading-7">
        <div className="text-center grid place-content-center">
          <FaGooglePlus className=" text-[60px] flex mx-auto" />
        </div>
        <div className="text-center grid place-content-center">
          <FaSpotify className=" text-[60px] flex mx-auto" />
        </div>
        <div className="text-center grid place-content-center">
          <FaYoutube className=" text-[60px] flex mx-auto" />
        </div>
        <div className="text-center grid place-content-center">
          <FaFacebook className=" text-[60px] flex mx-auto" />
        </div>
        <div className="text-center grid place-content-center">
          <FaFacebookMessenger className=" text-[60px] flex mx-auto" />
        </div>
        <div className="text-center grid place-content-center">
          <FaTwitter className=" text-[60px] flex mx-auto" />
        </div>
      </div>
    </main>
  );
}
