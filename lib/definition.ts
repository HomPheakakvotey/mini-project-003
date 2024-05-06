export type ProductType={
    id: number;
    name: string;
    price: number;
    desc: string;
    image: string;
    category: {name:any};
    seller: string;
    quantity:number;
}

export type ProductRespone={
    name:string,
    image:string,
    desc:string,
    price:number,
    onClick?:()=>void
}

export type ProductDetailType={
    params:{
        id:number
    },
    searchParams: { [key: string]: string | string[] | undefined }
}
export const placeHolderImage="https://i0.wp.com/sunrisedaycamp.org/wp-content/uploads/2020/10/placeholder.png?sl=1"

export type ImageType={
    id:number,
    image:string,
    name:string
}


export type CatageoryType = {
	name: string;
	icon: string;
};

export type ProductPostType = {
	category: CatageoryType;
	name: string;
	desc: string;
	image: string;
	price: number;
	quantity: number;
};

export const initialValues = {
	categoryName: "",
	categoryIcon: "",
	name: "",
	desc: "",
	image: "",
	price: 0,
	quantity: 0,
	fileIcon: null,
	fileProduct: null,
};