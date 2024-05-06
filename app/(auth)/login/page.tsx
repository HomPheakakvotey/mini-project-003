"use client";

import React, { useState } from "react";
import style from "./style.module.css";
import { IoEyeOffSharp } from "react-icons/io5";
import { IoEyeSharp } from "react-icons/io5";
import NextLink from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { signIn, useSession } from "next-auth/react";
import { useAppDispatch } from "@/redux/hooks";
import { setAccessToken } from "@/redux/feature/auth/authSlice";
import { useRouter } from "next/navigation";

type ValueTypes = {
  email: string;
  password: string;
};

const initialValues: ValueTypes = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [user, setUser] = useState(null);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
    // Toggle password visibility
  };

  const { data: session } = useSession();

  if (session) {
    router.push("/");
  }

  //  handle submit
	const handleSubmit = (values: ValueTypes) => {
		setLoading(true);
		fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(values),
		})
			.then(res=>res.json())
			.then((data) => {
				console.log(data);
				setLoading(false);
				dispatch(setAccessToken(data.accessToken));
				setUser(data.user);
				console.log(data.accessToken);
        router.push('/')
			})
			.catch((error) => {
				console.error("Error:", error);
				setLoading(false);
			});	
			
	};

  if (loading) {
    return (
      <div className={`${style.container}`}>
        <h1 className="text-6xl text-center">Loading...</h1>
      </div>
    );
  }

  if (!session) {
    return (
      <main className={`${style.container}`}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            handleSubmit(values);
          }}
        >
          <Form className="bg-gray-100 p-4 rounded-lg w-96">
            <h1 className={`${style.title}`}>Login</h1>
            {/* Email */}
            <div className="mb-5">
              <label className={`${style.label}`} htmlFor="email">
                Email
              </label>
              <Field
                type="email"
                name="email"
                id="email"
                className={`${style.input}`}
              />
              <ErrorMessage
                name="email"
                component="section"
                className={`${style.error}`}
              />
            </div>
  
            {/* Password */}
            <div className="mb-5">
              <label className={`${style.label}`} htmlFor="password">
                Password
              </label>
              <div className="relative">
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  className={`${style.input}`}
                />
                {!showPassword ? (
                  <IoEyeOffSharp
                    onClick={() => handleShowPassword()}
                    className="cursor-pointer absolute right-2 top-4"
                  />
                ) : (
                  <IoEyeSharp
                    onClick={() => handleShowPassword()}
                    className="cursor-pointer absolute right-2 top-4"
                  />
                )}
              </div>
              <ErrorMessage
                name="password"
                component="section"
                className={`${style.error}`}
              />
            </div>
  
            {/* button submit */}
            <button type="submit" className={`${style.button}`}>
              Submit
            </button>
          </Form>
        </Formik>
        <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
          Not a member?{" "}
          <NextLink
            href="/register"
            className="font-semibold text-warning hover:text-warning-300"
          >
            Start a new account with us!
          </NextLink>
        </p>
        <div className="mt-4">
          <div className="relative">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm font-medium leading-6">
              <span className="bg-white px-6 text-gray-900 dark:bg-black  dark:text-gray-300">
                Or continue with
              </span>
            </div>
          </div>
  
          <div className="mt-4 grid grid-cols-2 gap-4">
            <NextLink
              href="#"
              className="flex w-full items-center justify-center gap-3 rounded-md border-1 bg-gray-50 px-3 py-1.5 text-white hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]"
              onClick={() => signIn("google")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 256 262"
              >
                <path
                  fill="#4285F4"
                  d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                />
                <path
                  fill="#34A853"
                  d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                />
                <path
                  fill="#FBBC05"
                  d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
                />
                <path
                  fill="#EB4335"
                  d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                />
              </svg>
              <span className="text-sm font-semibold leading-6 text-gray-800">
                Google
              </span>
            </NextLink>
  
            <NextLink
              href="#"
              className="flex w-full items-center justify-center gap-3 rounded-md bg-[#24292F] px-3 py-1.5 text-white hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F]"
              onClick={() => signIn("github")}
            >
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-semibold leading-6">GitHub</span>
            </NextLink>
          </div>
        </div>
      </main>
    );
  }
}
