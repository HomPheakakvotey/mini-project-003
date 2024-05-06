"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import style from "./style.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ImageType, ProductPostType ,initialValues } from "@/lib/definition";
import { useGetIconsQuery, useGetImagesQuery, useUploadImageMutation } from "@/redux/service/image";
import { useCreateProductMutation } from "@/redux/service/product";
import { ToastContainer, toast } from "react-toastify";

import { Dropdown } from "flowbite-react";

const validationSchema = Yup.object().shape({
	categoryName: Yup.string().required("Required"),
	name: Yup.string().required("Required"),
	desc: Yup.string().nullable(),
	price: Yup.number().required("Required"),
	quantity: Yup.number().required("Required"),
});

export default function Product() {
	const router=useRouter()
   
	//fetch data from RTK query

	const[selectedPhoto, setSelectedPhoto] = useState(null);
    const[selectedIcon, setSelectedIcon] = useState(null);
    const[props,setProps] = useState([])
    const[icons,setIcons] = useState([])
    const[page, setPage] = useState(1);
    const[pageSize, setPageSize] = useState(5);

    const{data:data,isLoading:isLoading,isFetching:isFethching}=useGetImagesQuery({page:page,pageSize:pageSize}) 

  ///fetch icons
     
    const{data:data1,isLoading:isLoading1,isFetching:isFetching1}=useGetIconsQuery({page:page,pageSize:pageSize})

    const[createProduct,{data:productData,isLoading:productLoading}]=useCreateProductMutation()

	const[deleteProduct,{data:deleteData,isLoading:deleteLoading}]=useCreateProductMutation()

    const[uploadImage,{data:updateData,isLoading:updateLoading}]=useUploadImageMutation()
    
    //create product 
	const createProduct1 = async (values: ProductPostType) => {
        try {
            const result = await createProduct(values);
            toast.success("Product Created Successfully");
            return result;
        } catch (error) {
    
            console.error("Product creation failed:", error);
          
            toast.error("Failed to create product");
            throw error; 
        }
    };
    

	//delete product
	const handleDeleteProduct = async (id: Number) => {(id)}

    useEffect(()=>{
        if(!isLoading1 && data1){
            setIcons(data1.results)
        }
    },[data1,isLoading1])   
     


    //handle upload image



    //note 
   
    const CustomInput = ({ field, form, setFieldValue }: any) => {
    const handleUploadeFile = (e: any) => {
		const file = e.target.files[0];
		const localUrl = URL.createObjectURL(file);
		console.log(localUrl);
		setFieldValue(field.name, file);
	};

}


    //note zl

    const totalPages = Math.ceil(data?.total/ pageSize) || 4;
   
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    useEffect(()=>{
        if(!isLoading && data){
            setProps(data.results)
        }
    },[data,isLoading])


const handleSelect = (index: number, props: any, icons: any, type: string) => {
    if (type === 'selectImage') {
        setSelectedPhoto(props[index]?.image||null);
     
   
    } else if (type === 'data1Icon') {
        setSelectedIcon(icons[index]?.image||null);
      
     
    }
};

  

   const nextPage = () => {
    setPage(page + 1);
};

const prevPage = () => {
    if (page > 1) {
        setPage(page - 1);
    }
};

const renderPageNumbers = (data:any) => {
    const pagesToShow = [];
    const totalPageCount = Math.ceil(data?.total / pageSize);
    const maxPageNumberToShow = 5; 

    let startPage = Math.max(1, page - Math.floor(maxPageNumberToShow / 2));
    let endPage = Math.min(totalPageCount, startPage + maxPageNumberToShow - 1);

    if (endPage - startPage < maxPageNumberToShow - 1) {
        startPage = Math.max(1, endPage - maxPageNumberToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pagesToShow.push(
            <button key={i} onClick={() => setPage(i)} className={`px-3 py-1 mx-1 rounded-lg ${i === page ? 'bg-yellow-500 text-white' : 'bg-gray-100'}`}>
                {i}
            </button>
        );
    }

    return pagesToShow;
};


	return (
		<main className={`${style.container}`}>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={async (values:any) => {
					console.log(values);
					const productPost: ProductPostType = {
                        category: {
                            name: values.categoryName,
                            icon: selectedIcon || '',
                        },
                        name: values.name,
                        desc: values.desc,
                        image: selectedPhoto || '',
                        price: values.price,
                        quantity: values.quantity,
                    }

					createProduct(productPost)
				}}
			>
				{({ setFieldValue }:any) => (
					<Form className=" p-4 rounded-lg w-full container mx-auto">
						
						{/* Product Name */}
                        <div className="mb-4">
                            <button onClick={()=>router.push(`/myshop`)} className='text-yellow-500'>Back</button>
                        </div>
                        <div className={`${style.title}`}>
                            <div>
                        <button onClick={()=>router.push(`/add`)} className={`${style.title}`}>
                            Create Product
                            </button>
                        </div>
                        <div>
                        <Dropdown color='yellow'  label="Dropdown button">
		                 <Dropdown.Item className="text-yellow-500"  onClick={()=>router.push(`/uploadimage`)}>Product Image</Dropdown.Item>
		                 <Dropdown.Item className="text-yellow-500" onClick={()=>router.push(`/uploadIcon`)}>Product Icon</Dropdown.Item>
	                      </Dropdown>
                          
                        </div>

                            </div>
						<div className="mb-5">
							<label className={`${style.label}`} htmlFor="name">
								Product Name
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
					

						{/* Product Description */}
						<div className="mb-5">
							<label className={`${style.label}`} htmlFor="desc">
								Product Description
							</label>
							<Field
								type="text"
								name="desc"
								id="desc"
								component="textarea"
								className={`${style.input}`}
							/>
							<ErrorMessage
								name="desc"
								component="div"
								className={`${style.error}`}
							/>
						</div>

						{/* Product Price */}
						<div className="mb-5">
							<label className={`${style.label}`} htmlFor="price">
								Product Price
							</label>
							<Field
								type="number"
								name="price"
								id="price"
								className={`${style.input}`}
							/>
							<ErrorMessage
								name="price"
								component="div"
								className={`${style.error}`}
							/>
						</div>

						{/* Product Quantity */}
						<div className="mb-5">
							<label className={`${style.label}`} htmlFor="price">
								Product Quantity
							</label>
							<Field
								type="number"
								name="quantity"
								id="quantity"
								className={`${style.input}`}
							/>
							<ErrorMessage
								name="quantity"
								component="div"
								className={`${style.error}`}
							/>
						</div>

						{/* Product Category */}
						<div className="mb-5">
							<label className={`${style.label}`} htmlFor="categoryName">
								Product Category Name
							</label>
							<Field
								type="text"
								name="categoryName"
								id="categoryName"
								className={`${style.input}`}
							/>
							<ErrorMessage
								name="categoryName"
								component="div"
								className={`${style.error}`}
							/>
						</div>
                        </div>
					
				
						<details className="group [&_summary::-webkit-details-marker]:hidden mx-auto" open>
    <summary
      className="flex  mx-auto cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-50 p-4 text-gray-900"
    >
      <h2 className="font-medium">Select Images</h2>

      <svg
        className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    </summary>
     {props.map((image:ImageType,index)=>
                <div key={index} className="flex items-center justify-between gap-4 p-4 bg-gray-50">
                    <img src={image.image} alt={image.name} className="w-20 h-20 object-cover rounded-lg" onClick={()=>handleSelect(index,props,data1,'selectImage')}/>
                    <h3 className="text-gray-900">{image.name}</h3>
                </div>
        
     )}

<div className="flex justify-center p-4">
                    <button onClick={prevPage} disabled={page === 1} className="px-4 py-2 mx-1 rounded-lg">Previous</button>
                    {renderPageNumbers(data)}
                    <button onClick={nextPage} disabled={isLoading || isFethching} className="px-4 py-2 mx-1 rounded-lg">Next</button>
                </div>
  </details>
  {selectedPhoto && <img src={selectedPhoto} alt="" />}
   <div className='mt-4'></div>
  <details className="group [&_summary::-webkit-details-marker]:hidden mx-auto" open>
    <summary
      className="flex  mx-auto cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-50 p-4 text-gray-900"
    >
      <h2 className="font-medium">Select Icons</h2>

      <svg
        className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    </summary>
    {icons.map((image:ImageType,index)=>
                    <div key={index} className="flex items-center justify-between gap-4 p-4 bg-gray-50">
                        <img src={image.image} alt={image.name} className="w-20 h-20 object-cover rounded-lg" onClick={()=>handleSelect(index,props,icons,'data1Icon')}/>
                        <h3 className="text-gray-900">{image.name}</h3>
                    </div>
            
        )}
        <div className="flex justify-center p-4">
                    <button onClick={prevPage} disabled={page === 1} className="px-4 py-2 mx-1 rounded-lg">Previous</button>
                    {renderPageNumbers(data1)}
                    <button onClick={nextPage} disabled={isLoading1 || isFetching1} className="px-4 py-2 mx-1 rounded-lg">Next</button>
                </div>
        </details>
        {selectedIcon && <img src={selectedIcon} alt="" />}


                        <div className="mt-4">
						{/* button submit */}
						<button type="submit" className='bg-yellow-500 py-2 px-3 text-white rounded-lg' >
							Submit
						</button>
						<button onClick={()=>router.push(`/myshop`)} type="submit" className='bg-red-600 text-white px-3 py-2 ml-2 rounded-lg' >
							Cancel
						</button>
                        </div>
					</Form>
				)}
			</Formik>
      
		</main>
	);
}


