"use client";

import Image from "next/image";
import PandaLogo from "../../public/assets/pandaLogo.png";
import { FaCartShopping } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const [menuFlag, setMenuFlag] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const cartDataList = useSelector(
    (state: RootState) => state.cartDataReducer.value
  );
  console.log({ pathname });

  return (
    <div className="h-12 flex items-center px-10 justify-between p-1 bg-gray-300">
      <div
        className="flex h-full items-center gap-2 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <Image src={PandaLogo} alt="Logo image" className="h-full w-fit" />
        <div className="text-xl">Panda Shop</div>
      </div>
      {pathname === "/" && <div className="hidden sm:flex">search</div>}
      <div className="w-fit relative hidden sm:flex">
        <button
          className="hover:bg-gray-400 rounded-md p-1"
          onClick={() => router.push("/cart")}
        >
          <FaCartShopping size={30} />
          {cartDataList && cartDataList[0].id !== 0 && (
            <span className="h-5 w-5 flex items-center justify-center absolute -top-0 -right-3 bg-red-500 text-white rounded-full text-xs">
              {cartDataList.length}
            </span>
          )}
        </button>
      </div>
      <div className="sm:hidden">
        {menuFlag ? (
          <button
            className="hover:bg-slate-300"
            onClick={() => setMenuFlag(false)}
          >
            <IoMdCloseCircleOutline size={25} />
          </button>
        ) : (
          <button
            className="hover:bg-slate-300"
            onClick={() => setMenuFlag(true)}
          >
            <RxHamburgerMenu size={25} />
          </button>
        )}
      </div>
      {menuFlag && (
        <div className="p-3 absolute top-12 bottom-0 left-0 flex flex-col items-center gap-2 bg-gray-200 h-full w-full border">
          <div className="h-8 w-full flex items-center justify-center rounded-md border border-black">
            <p>Search</p>
          </div>
          <div className="h-8 w-full flex items-center justify-center rounded-md border border-black">
            <button
              className="sm:hover:bg-gray-400 rounded-md p-1 flex items-center gap-2"
              onClick={() => {router.push("/cart"); setMenuFlag(false)}}
            >
              <FaCartShopping size={16} />
              Cart
              {cartDataList && cartDataList[0].id !== 0 && (
                <span className="h-5 w-5 flex items-center justify-center bg-red-500 text-white rounded-full text-xs">
                  {cartDataList.length}
                </span>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
