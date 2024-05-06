import React from "react";

export default function Feature() {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 sm:py-12 lg:px-8">
      <div className="text-center">
        <p className="p-[20px] md:text-[20px] text-center sm:text-base lg:text-[26px] font-semibold z-10">
          NEW COLLECTION
        </p>
        <hr className="bg-[#2b2b2b] border-none h-[1px] w-[50%] mx-auto mb-10" />
      </div>

        <ul className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <li>
            <a href="#" className="group relative block">
              <img
                src="https://i.pinimg.com/736x/a4/59/62/a45962bb02c0465cc2c72ffde527f94a.jpg"
                alt=""
                className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
              />

              <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                <h3 className="text-xl font-medium text-white">Casual Trainers</h3>

                <span className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
                  Shop Now
                </span>
              </div>
            </a>
          </li>

          <li>
            <a href="#" className="group relative block">
              <img
                src="https://i.pinimg.com/564x/be/bc/57/bebc57e06bdeb07e4850a534bcf07bcf.jpg"
                alt=""
                className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
              />

              <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                <h3 className="text-xl font-medium text-white">Winter Jumpers</h3>

                <span className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
                  Shop Now
                </span>
              </div>
            </a>
          </li>

          <li className="lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <a href="#" className="group relative block">
              <img
                src="https://romand.us/cdn/shop/products/zeromatte-model-shot.jpg?v=1666736074"
                alt=""
                className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
              />

              <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                <h3 className="text-xl font-medium text-white">
                  Lipstick
                </h3>

                <span className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
                  Shop Now
                </span>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
