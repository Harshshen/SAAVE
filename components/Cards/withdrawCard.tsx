import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import SAAVEABI from "@/abis/SAAVEABI.json";
import Circle from "@/public/assets/Polygon.png";
import Logo from "@/public/assets/Saave.png";
import Network from "@/public/assets/network.png";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/auth";
import { useContract, useSigner } from "wagmi";

function Saave() {
  const [depositClicked, setDepositClicked] = useState(false);
  const [withdrawClicked, setWithdrawClicked] = useState(false);
  const {
    totalLP,
    userLP,
    daiPoolBal,
    usdcPoolBal,
    usdtPoolBal,
    crvValue,
    crvValueUSD,
  } = useContext(AuthContext);
  const [estimatedDai, setEstimatedDai] = useState("0");
  const [estimatedUsdc, setEstimatedUsdc] = useState("0");
  const [estimatedUsdt, setEstimatedUsdt] = useState("0");
  const [estimatedTotal, setEstimatedTotal] = useState("0");
  const saaveContract = {
    address: SAAVEABI.address,
    abi: SAAVEABI.abi,
  };
  const { data: signer, isError, isLoading } = useSigner();
  const saaveContract2 = useContract({
    ...saaveContract,
    signerOrProvider: signer,
  });
  const handleWithdraw = () => {
    saaveContract2!.withdraw();
  };
  useEffect(() => {
    if (totalLP === "0") return;
    const dai =
      parseFloat(daiPoolBal) * (parseFloat(userLP) / parseFloat(totalLP));
    const usdc =
      parseFloat(usdcPoolBal) * (parseFloat(userLP) / parseFloat(totalLP));
    const usdt =
      parseFloat(usdtPoolBal) * (parseFloat(userLP) / parseFloat(totalLP));
    const total = dai + usdc + usdt;
    setEstimatedDai(dai.toString());
    setEstimatedUsdc(usdc.toString());
    setEstimatedUsdt(usdt.toString());
    setEstimatedTotal(total.toString());
  }, [totalLP, userLP, daiPoolBal, usdcPoolBal, usdtPoolBal]);

  const handleClick = () => {
    setDepositClicked(true);
  };
  const router = useRouter();
  return (
    <div className="font-Inter h-[60vh] w-full p-10 flex items-center justify-center relative">
      {/* <h1 className='text-white text-2xl'>Hello</h1> */}
      <div className="absolute h-full w-full md:w-[80vw] -z-30 -top-[45px] left-[120px] flex flex-col">
        <div className="flex justify-end">
          <Image
            src={Circle}
            alt="img"
            height={400}
            width={400}
            className="h-64 w-64 flex-end"
          />
        </div>
        <div className="flex justify-start">
          <Image
            src={Circle}
            alt="img"
            height={400}
            width={400}
            className="h-96 w-96 flex-end"
          />
        </div>
      </div>

      <div className="relative mt-10 h-auto w-full md:w-[60vw] p-10 bg-gray-400 rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-40 border border-gray-100">
        <div className="flex-col lg:flex-row flex items-center justify-center lg:divide-x-2 ">
          <div className="w-full justify-center grid">
            <h2 className="text-xl md:text-4xl font-bold text-gray-300 hover:text-white mt-4 text-center">
              Withdraw
            </h2>
            <div className="mt-2  flex">
              <div className="p-2">
                <p  className="text-lg text-white leading-8">DAI : $ {estimatedDai}</p>
                <p  className="text-lg text-white leading-8">USDT : $ {estimatedUsdt}</p>
                <p  className="text-lg text-white leading-8">CRV (USD) : {crvValueUSD}</p>
              </div>
              <div className="p-2 pl-4">
                <p  className="text-lg text-white leading-8">USDC : $ {estimatedUsdc}</p>
                <p  className="text-lg text-white leading-8">CRV : {crvValue}</p>
                <p  className="text-lg text-white leading-8">Estimated Total: {estimatedTotal}</p>
              </div>
              
            </div>

            <div className=" w-full px-4  pt-6 content-center justify-center align-middle text-center">
            <button type="button" onClick={handleWithdraw} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 rounded-lg text-xl md:text-3xl font-bold px-5 py-2.5 text-center mr-2 mb-2">Withdraw</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Saave;
