import React from "react";

export default function About() {
  return (
    <div>
      <section className="bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 py-4 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              About Us.
              <strong className="font-extrabold text-red-500 sm:block">
                {" "}
                We Provide The Best Experience For You{" "}
              </strong>
            </h1>

            <p className="mt-4 sm:text-xl/relaxed">
            We Provide The Best Experience For You{" "}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                className="block w-full rounded bg-red-500 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-500 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                href="#"
              >
                Get Started
              </a>

              <a
                className="block w-full rounded px-12 py-3 text-sm font-medium text-red-500 shadow hover:text-red-500 focus:outline-none focus:ring active:text-red-500 sm:w-auto"
                href="#"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
        <div className="lg:mt-16 sm:mt-12 mt-16 flex lg:flex-row justify-between flex-col lg:gap-8 gap-12">
					<div className="w-full xl:w-5/12 lg:w-6/12">
						<h2 className="font-bold lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800 dark:text-white">
							Our Story
						</h2>
						<p className="font-normal text-base leading-6 text-gray-600 dark:text-white mt-4">
							Established in 2024, Amore was born out of a
							passion for Community Engagemen. What started as a
							humble endeavor has since grown into a trusted
							destination for Exceptional Service: Customer
							satisfaction is our top priority. Our dedicated team
							is here to assist you at every step of your shopping
							journey, from browsing to post-purchase support.
							enthusiasts worldwide.
						</p>
						<p className="font-normal text-base leading-6 text-gray-600 dark:text-white mt-6">
							It is a long established fact that a reader will be
							distracted by the readable content of a page when
							looking at its layout. The point of using Lorem
							Ipsum.In the first place we have granted to God, and
							by this our present charter confirmed for us and our
							heirs forever that the English Church shall be free,
							and shall have her rights entire, and her liberties
							inviolate; and we will that it be thus observed;
							which is apparent from
						</p>
					</div>
                    <div className="lg:flex items-center w-full lg:w-1/2">
						<img
							className="lg:block hidden w-full"
							src="https://i.ibb.co/2kxWpNm/Group-740.png"
							alt="people discussing on board"
							width={500}
							height={500}
						/>
						<img
							className="lg:hidden sm:block hidden w-full h-3/4"
							src="https://i.ibb.co/ZLgK3NQ/Group-788.png"
							alt="people discussing on board"
							width={500}
							height={500}
						/>
						<img
							className="sm:hidden block w-full"
							src="https://i.ibb.co/9g2R7Xr/Group-803.png"
							alt="people discussing on board"
							width={500}
							height={500}
						/>
					</div>
                </div>
      </section>
    </div>
  );
}
