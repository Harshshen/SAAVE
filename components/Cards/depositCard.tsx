import React, { useContext, useState } from "react";
import Image from "next/image";
import Circle from "@/public/assets/Ellipse.png";
import Logo from "@/public/assets/Saave.png";
import Network from "@/public/assets/network.png";
import { AuthContext } from "@/context/auth";
import { useRouter } from "next/router";
import USDCABI from "@/abis/usdc.json";
import USDTABI from "@/abis/usdt.json";
import DAIABI from "@/abis/DAI.json";
import { ethers } from "ethers";
import SAAVEABI from "@/abis/SAAVEABI.json";
import { useContract, useSigner } from "wagmi";

const DepositCard = () => {
  const [depositClicked, setDepositClicked] = useState(false);
  const [withdrawClicked, setWithdrawClicked] = useState(false);
  const {
    usdtAllowance,
    daiAllowance,
    usdcAllowance,
    depositDAIValue,
    depositUSDTValue,
    depositUSDCValue,
    setDaiAllowance,
    setUsdcAllowance,
    setDepositUSDTValue,
    setUsdtAllowance,
    setDepositUSDCValue,
    setDepositDAIValue,
  } = useContext(AuthContext);
  const handleClick = () => {
    setDepositClicked(true);
  };
  const { data: signer, isError, isLoading } = useSigner();
  const USDCContract = useContract({
    address: USDCABI.address,
    abi: USDCABI.abi,
    signerOrProvider: signer,
  });
  const saaveContract = useContract({
    address: SAAVEABI.address,
    abi: SAAVEABI.abi,
    signerOrProvider: signer,
  });
  const USDTContract = useContract({
    address: USDTABI.address,
    abi: USDTABI.abi,
    signerOrProvider: signer,
  });

  const DAIContract = {
    address: DAIABI.address,
    abi: DAIABI.abi,
  };

  const handleApproveUSDC = () => {
    console.log("Approving USDC");
    USDCContract!.approve(
      "0xEC68681511D9992bB297223b0f5195a2C8e55f84",
      "1000000000000"
      // ethers.utils.parseUnits(depositUSDCValue.toString(), "ethers")
    );
  };
  const handleApproveUSDT = () => {
    console.log("Approving USDC");
    USDTContract!.approve(
      "0xEC68681511D9992bB297223b0f5195a2C8e55f84",
      "1000000000000"
      // ethers.utils.parseUnits(depositUSDCValue.toString(), "ethers")
    );
  };
  // const handleApproveDAI = () => {
  //   console.log("Approving USDC");
  //   USDCContract!.approve(
  //     "0xEC68681511D9992bB297223b0f5195a2C8e55f84",
  //     "1000000000000"
  //     // ethers.utils.parseUnits(depositUSDCValue.toString(), "ethers")
  //   );
  // };
  // const { data } = useContractRead({
  //   address: USDCABI.address,
  //   abi: USDCABI.abi,
  //   functionName: 'getBalance',
  //   onSuccess: (data) => {
  //     console.log(data)
  //   }
  // })
  // }
  const handleSubmit = () => {
    saaveContract!.deposit();
  };
  const router = useRouter();
  return (
    <div className="font-Inter h-[80vh] w-full p-10 flex items-center justify-center relative">
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
        <div className="text-white font-bold text-base flex items-center">
          <Image
            src={Logo}
            alt="img"
            height={400}
            width={400}
            className="h-10 w-10"
          />
          SAAVE
        </div>

        <div className="mt-5 flex-col lg:flex-row flex items-center justify-center lg:divide-x-2 ">
          <div className="w-full">
            <h2 className="text-xl md:text-3xl font-bold text-gray-300 hover:text-white mt-4">
              DEPOSIT
            </h2>
            <div className="flex-col md:flex-row flex w-full">
              <div className="flex flex-col align-middle justify-center text-white">
                <input
                  placeholder="Amount of USDC"
                  type="number"
                  className="p-4 rounded border-none bg-[#7b7676] my-2 outline-none  "
                  // value={depositUSDCValue}
                  onChange={(e) => setDepositUSDCValue(e.target.value)}
                />
                {!(depositUSDCValue === "0") && (
                  <button
                    className="p-3 bg-[#77f177]"
                    onClick={handleApproveUSDC}
                  >
                    Approve
                  </button>
                )}
                <input
                  placeholder="Amount of USDT"
                  type="number"
                  className="p-4 rounded border-none bg-[#7b7676] my-2 outline-none "
                  // value={depositUSDTValue}
                  onChange={(e) => setDepositUSDTValue(e.target.value)}
                />
                {!(depositUSDTValue === "0") && (
                  <button
                    className="p-3 bg-[#77f177]"
                    onClick={handleApproveUSDT}
                  >
                    Approve
                  </button>
                )}
                <input
                  placeholder="Amount of DAI"
                  type="number"
                  className="p-4 rounded border-none bg-[#7b7676] my-2 outline-none "
                  // value={depositDAIValue}
                  onChange={(e) => setDepositDAIValue(e.target.value)}
                />
                {!(depositDAIValue === "0") && (
                  <button
                    className="p-3 bg-[#77f177]"
                    onClick={handleApproveUSDT}
                  >
                    Approve
                  </button>
                )}
                <button className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 rounded-lg text-xl md:text-3xl font-bold px-5 py-2.5 text-center mr-2 mb-2">
                  Submit
                </button>
              </div>
            </div>
          </div>

          <div className=" w-full ml-4 px-4">
            <h2 className="text-xl md:text-3xl font-bold text-gray-300 hover:text-white mt-4">
              Wallet Balance
            </h2>
            <div className="mt-4 p-4">
              <p className="text-lg text-white "> DAI : $ 2.5775</p>
              <p className="text-lg text-white "> USDC : $ 2.763</p>
              <p className="text-lg text-white "> USDT : $ 3.245</p>
            </div>
          </div>
        </div>

        <div className="relative -bottom-4 sm:-bottom-6 flex justify-end">
          <Image
            src={Network}
            alt="img"
            height={400}
            width={400}
            className="h-10 w-10"
          />
        </div>
      </div>
    </div>
  );
};

export default DepositCard;
