"use client";
import { useState, useEffect } from "react";
import {
  selectProducts,
  selectTotalPrice,
} from "@/redux/feature/cart/cartSlice";
import {
  removeFromCart,
  addToCart,
  increment,
  decrement,
} from "@/redux/feature/cart/cartSlice";
import { Button, Input } from "@nextui-org/react";
import { LuTrash, LuPlus, LuMinus } from "react-icons/lu";
import { CartProductType } from "@/lib/definition";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";

export default function page() {
  const products = useAppSelector(selectProducts);
  const totalPrice = useAppSelector(selectTotalPrice);
  const dispatch = useAppDispatch();

  //display number of product that only unique select
  const [uniqueProducts, setUniqueProducts] = useState<CartProductType[]>([]);

  useEffect(() => {
    // Filter unique products based on their IDs
    const unique = products.filter(
      (product, index, self) =>
        index === self.findIndex((t) => t.id === product.id)
    );

    // Update the state with the unique products
    setUniqueProducts(unique);
  }, [products]);

  const totalPriceEachItem = () => {};

  return (
    <main className="bg-red-100 md:p-16 p-8">
      <section className="md:max-w-screen-lg mx-auto pt-8  ">
        {products.length == 0 && (
          <div className="flex flex-col justify-center items-center my-32 ">
            <p className="text-2xl font-semibold mt-4 ">Your cart is empty!</p>
            <caption>Look like you have not make any choice yet.</caption>
          </div>
        )}

        {products.length !== 0 && (
          <div className="grid lg:grid-cols-5 grid-cols-1 ">
            <div className="col-span-3 p-4">
              <div className="flex justify-between">
                <h1 className="text-xl font-bold text-start uppercase mb-8">
                  Shopping Cart
                </h1>
                <span className="text-lg font-semibold">
                  {uniqueProducts.length} Items
                </span>
              </div>

              <hr />

              {uniqueProducts.map((product) => (
                <div
                  className="flex md:flex-row flex-col justify-between items-center  w-full bg-slate-50 my-4 p-4 rounded-xl space-y-4 space-x-4"
                  key={product.id}
                >
                  <div>
                    <img
                      className="w-[80px] object-cover h-[100px] "
                      src={product.image}
                      alt={product.name}
                    />
                  </div>

                  <div>
                    <p className="text-lg text-center">{product.name}</p>
                    <p className="text-orange-10 font-bold text-lg text-center">
                      ${product.price}
                    </p>
                  </div>

                  <div className="md:flex-grow flex md:flex-row flex-col items-center justify-evenly gap-4 ">
                    {/* increase button */}
                    <div className="flex ">
                      <div className="border flex justify-center items-center w-8 h-8 rounded-l-lg">
                        <LuPlus
                          onClick={() => dispatch(increment(product.id))}
                        />
                      </div>

                      <div className="border flex  justify-center items-center w-8 h-8">
                        <span>{product.quantity}</span>
                      </div>

                      <div className=" border flex  justify-center items-center w-8 h-8 rounded-r-lg">
                        <LuMinus
                          onClick={() => dispatch(decrement(product.id))}
                        />
                      </div>
                    </div>

                    <div>
                      <p className="text-orange-10 font-bold text-lg">
                        ${product.price * (product.quantity || 1)}
                      </p>
                    </div>

                    {/* remove button */}
                    <div>
                      <Button
                        isIconOnly
                        onClick={() =>
                          dispatch(removeFromCart(product.id))
                        }
                        className="bg-red-500 text-white p-2 rounded-xl"
                      >
                        <LuTrash />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="col-span-2 bg-slate-50 rounded-lg m-4 p-4 h-[500px]">
              <h1 className="text-xl font-bold text-start uppercase mb-8">
                Order Summary
              </h1>

              <hr />

              <div className="flex justify-between items-center mt-4">
                <p className="text-based font-semibold">
                  {uniqueProducts.length} Items
                </p>
                <p className="text-based font-semibold">${totalPrice}</p>
              </div>

              <div className="flex w-full flex-col gap-4 p-4 my-4">
                <Input
                    className="p-2.5 border-none"
                  type="text"
                  label="shipping"
                  placeholder=""
                />
                <Input
                className="p-2.5"
                  type="text"
                  label="Promotion Code"
                  placeholder=""
                />
                <Button className="bg-gray-500 text-white p-2 rounded-xl">
                  Apply
                </Button>
              </div>

              <hr />

              <div className="flex justify-between items-center my-4">
                <p className="text-based font-semibold">
                  {products.length} Items
                </p>
                <p className="text-lg font-bold text-orange-10">
                  ${totalPrice}
                </p>
              </div>

              <Button className="bg-yellow-10 w-full rounded-xl">
                Checkout
              </Button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
