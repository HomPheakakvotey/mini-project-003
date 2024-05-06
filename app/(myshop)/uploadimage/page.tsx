'use client'
import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import style from "@/app/(myshop)/uplaodIcon/style.module.css";
import { useUploadImageMutation } from '@/redux/service/image';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Dropdown } from "flowbite-react";

const FILE_SIZE = 1024 * 1024 * 2; // 2MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

type Input={
	name:string,
	fileProduct:null,
}

const initfile:Input ={
	name:"",
	fileProduct:null,
}

const validationSchema = Yup.object().shape({
	name: Yup.string().required("Required"),
	fileProduct: Yup.mixed()
		.test("fileFormat", "Unsupported Format", (value: any) => {
			if (!value) {
				return true;
			}
			return SUPPORTED_FORMATS.includes(value.type);
		})
		.test("fileSize", "File Size is too large", (value: any) => {
			if (!value) {
				true;
			}
			return value.size <= FILE_SIZE;
		})

		.required("Required"),
});

export default function page() {
  
 const[uploadImage,{data,error}]=useUploadImageMutation();

 const handleUploadImage = async (file:any, name:any) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", file);
    console.log(formData);

    try {
        const response = await uploadImage({ data: formData }); // Correct way to call the mutation function
        console.log(response); // Handle the response as needed
		toast.warn("Upload image successfully")
    } catch (error) {
        console.error(error); // Handle errors
    }
};


  return (
    <main className='grid place-content-center '>
           <Formik
    validationSchema={validationSchema}
    initialValues={initfile}
    onSubmit={async (values:any) => {
        console.log(values.fileProduct);
		console.log(values.name);
		const name= values.name;
		const image = values.fileProduct;
		handleUploadImage(image, name);	
        
    }}
    >

    {({ setFieldValue }) => (
     <Form   >
		  <div className="mb-5">
							<label className={`${style.label}`} htmlFor="name">
								Product image Name
							</label>
							<Field
								type="text"
								name="name"
								id="name"
								className={`${style.input}`}
							/>
							<ErrorMessage
								name="name"
								component="div"
								className={`${style.error}`}
							/>
						</div>
    	  <div className="mb-5">
							<label className={`${style.label}`} htmlFor="fileProduct">
								Product image
							</label>
							<Field
								type="file"
								name="fileProduct"
								id="fileProduct"
								component={CustomInput}
								setFieldValue={setFieldValue}
								className={`${style.input}`}
							/>
							<ErrorMessage
								name="fileProduct"
								component="div"
								className={`${style.error}`}
							/>
						</div>

                        {/* handle submit  */}
                        <button type="submit" className={`${style.button}`}>
							Submit
						</button>
         </Form>
                )}
   </Formik>
    </main>
  )
}
const CustomInput = ({ field, form, setFieldValue }: any) => {
	const [imagePreview, setImagePreview] = useState("");

	const handleUploadeFile = (e: any) => {
		const file = e.target.files[0];
		const localUrl = URL.createObjectURL(file);
		console.log(localUrl);
		setImagePreview(localUrl);

	    setFieldValue(field.name, file);
		
	};
	return (
		<main className='grid place-content-center'>
			{imagePreview && <img src={imagePreview} className='w-[200px]' alt="preview" />}
			<section>
			<ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
			</section>
			<div className="col-span-full">

              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
				
                <div className="mx-auto">
				<input onChange={(e) => handleUploadeFile(e)} type="file" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
					
                      <span>Upload a file</span>
					 
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
		</main>
	);
};