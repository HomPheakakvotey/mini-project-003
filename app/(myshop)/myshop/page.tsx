'use client'
import { ProductType } from '@/lib/definition';
import React, { useEffect, useState } from 'react'
import { Button, Modal } from "flowbite-react";
import DataTable, { TableColumn } from 'react-data-table-component';
import { useRouter } from 'next/navigation';
import "@/app/globals.css"
import { SearchComponent } from '@/components/searchButton/searchButton';
import { useDeleteProductMutation, useGetProductsQuery } from '@/redux/service/product';
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { text } from 'stream/consumers';

const placeHolderImage = 'https://via.placeholder.com/150'


export default function DashBoard() {
  const router=useRouter()
  
  const  [loading,setLoading]=useState(false)
  const[openModal,setOpenModal]=useState(false)
  const[openModal1,setOpenModal1]=useState(false)
  const[productdetail,setProductDetail]=useState<ProductType>()

  //get data from RTK query
   const {data,isLoading,isFetching}=useGetProductsQuery({page:1,pageSize:20})
   const [products, setProducts] = useState([]);
   const[productId,setId] =useState(0)

   const[deleteProduct,{isLoading:isDeleting}]=useDeleteProductMutation()
   const handleDeletePro = async () => {
         try{
          window.location.reload();
            await deleteProduct(productId)
         }catch(err){
             console.log(err)
         }
   };

   useEffect(() => {
       if (!isLoading && data) {
           setProducts(data); 
       }
   }, [data, isLoading]);

 
const ProductDetail=(product:ProductType)=>{
  setProductDetail(product)
  setOpenModal(true)
}

const handleDelete=(id:number)=>{
  setOpenModal1(true)
  setId(id)
}

const handleFilter = (event: any) => {
  const search = event.target.value.toLowerCase();
  const newProduct = products.filter((product: any) => {
    return product.name.toLowerCase().includes(search);
  });

  if (search === '') {

    setProducts(data);
  } else {
   
    setProducts(newProduct);
  }
}

  const columns:TableColumn<ProductType>[] = [
    {
        name:'ID',	
        selector:row=>row.id,
        sortable:true,
    },
    {
      name: 'Product Title',
      selector: row => row.name,
      style: {
        backgroundColor: '#f1f1f1',
        textAlign: 'center',
      },
    },
    {
     name:'Seller',
      selector:row=>row.seller,
    },
    {
      name: 'Price (USD)',
      selector: row => row.price +" $",
      sortable:true,
      style: {
        backgroundColor: '#f1f1f1',
        textAlign: 'center',
      },

    },
    {
      name: 'Image',
      selector: (row):JSX.Element|any => <img className='w-[80px] h-[70px]' src={row.image} width={500} height={500}  alt={row.name}/>,
    },

    {
      name: "Action", 
      selector: row => 
        <React.Fragment> 

           <div className="inline-flex rounded-lg border border-gray-100 bg-gray-100 p-1">
  <button onClick={()=>router.push(`/edit/${row.id}`)} className="inline-block rounded-md px-4 py-2 text-sm text-gray-500 hover:text-gray-700 focus:relative" >
    Edit
  </button>

  <button onClick={()=>ProductDetail(row)} className="inline-block rounded-md px-4 py-2 text-sm text-blue-700 hover:text-gray-700 focus:relative" >
    View
  </button>

  <button onClick={()=>handleDelete(row.id)} className="inline-block rounded-md bg-white px-4 py-2 text-sm text-red-500 shadow-sm focus:relative">
  Delete
  </button>
</div>
        </React.Fragment>
    } 
    
  ];
  return (
    <main>
        <SearchComponent onChange={handleFilter} />
       <section className='mt-[20px]'>
      </section>
       <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Product Details</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <img src={productdetail?.image||placeHolderImage} width={500} height={500} alt={productdetail?.name||"Untitle"} className="w-full h-96 object-fit" />
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {productdetail?.desc}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
             {productdetail?.name}
            </p>
          </div>
        </Modal.Body>
      </Modal>
      <section>
      <Modal show={openModal1} size="md" onClose={() => setOpenModal1(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={()=>{
                handleDeletePro()
                setOpenModal1(false)
                }}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal1(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      </section>
      <DataTable className=''  progressPending={loading} customStyles={customStyles}	columns={columns} data={products} pagination persistTableHead/>
    </main>
  )
}
  const customStyles = {
    rows: {
      style: {
        minHeight: "20px", 
      },
    },
    headCells: {
      style: {
        paddingLeft: "38px", 
        paddingRight: "8px",
        fontSize: "14px",
        // backgroundColor: "#f1f1f1",
      },
    },
    cells: {
      style: {
        textAlign: "center",
        fontSize: "13px",
        
        
      },
    },
  };  