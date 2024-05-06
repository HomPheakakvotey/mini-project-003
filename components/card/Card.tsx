import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Image, Button} from "@nextui-org/react";
import { FaCartPlus } from "react-icons/fa";

type PropsType = {
 name: string;
 image: string;
 price: number;
 onClick?: () => void;
};

export default function CardProduct({
 name,
 image,
 price,
 onClick,
}: PropsType) {
  return (
    <Card  isFooterBlurred className="h-96 cursor-pointer">
      <CardHeader>
        <Button className="absolute right-2 top-2 bg-gray-200 rounded-full">
          <FaCartPlus/>
        </Button>
      </CardHeader>
      <Image
        onClick={onClick}
        removeWrapper
        alt="Card example background"
        className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
        src={image}
      />
      <CardFooter className="absolute bg-gray-100 bottom-0  border-zinc-100 z-10 justify-between">
        <div>
          <p className="text-black text-tiny">{name}</p>
        </div>
        <span className=" text-gray-400 dark:text-white">
     ${price}
    </span>
      </CardFooter>
    </Card>
  );
}
