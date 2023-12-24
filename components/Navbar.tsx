import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useRouter } from "next/router";
import Logo from "@/public/assets/Saave.png";
import Image from "next/image";

const Navbar = () => {
  const router = useRouter();
  return (
    <nav className="w-full flex justify-between my-5">
      <div className="m-5 px-8 flex items-center">
        <Image
          src={Logo}
          alt="img"
          height={400}
          width={400}
          className="h-10 w-10"
        />

        <h2 className="text-2xl text-white font-bold pb-1 ">
          <Link href="/">SAAVE</Link>
        </h2>
      </div>
      <div className="ml-8  my-auto px-8  flex justify-around text-[#ffffffcc] ">
        <Link
          href="/deposit"
          className={
            router.pathname === "/deposit"
              ? "mx-3 hover:scale-110 text-white"
              : "mx-3 hover:scale-110 hover:text-white"
          }
        >
          Deposit
        </Link>
        <Link
          href="/withdraw"
          className={
            router.pathname === "/withdraw"
              ? "mx-3 hover:scale-110 text-white"
              : "mx-3 hover:scale-110 hover:text-white"
          }
        >
          Withdraw
        </Link>
        <Link
          href="/earnings"
          className={
            router.pathname === "/earnings"
              ? "mx-3 hover:scale-110 text-white"
              : "mx-3 hover:scale-110 hover:text-white"
          }
        >
          Earnings
        </Link>
      </div>
      <div className="m-5 px-8">
        <ConnectButton
          showBalance={{
            smallScreen: false,
            largeScreen: true,
          }}
          accountStatus={{
            smallScreen: "avatar",
            largeScreen: "full",
          }}
          chainStatus="icon"
        />
      </div>
    </nav>
  );
};

export default Navbar;
