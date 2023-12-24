import { useAccount } from "wagmi";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/auth";
import Image from "next/image";
import Circle from "@/public/assets/Polygon.png";

const Earnings = () => {
  const { isConnected } = useAccount();
  const {
    userDeposit,
    userEarned,
    totalLP,
    userLP,
    daiPoolBal,
    usdcPoolBal,
    usdtPoolBal,
    crvValue,
    crvValueUSD,
    estimatedDai,
    estimatedUsdc,
    estimatedUsdt,
    estimatedTotal,
    setEstimatedDai,
    setEstimatedUsdc,
    setEstimatedUsdt,
    setEstimatedTotal,
    setUserDeposit,
    setUserEarned,
  } = useContext(AuthContext);

  useEffect(() => {
    if (totalLP === "0") return;
    const dai =
      parseFloat(daiPoolBal) * (parseFloat(userLP) / parseFloat(totalLP));
    // console.log("DAI IS", dai);
    const usdc =
      parseFloat(usdcPoolBal) * (parseFloat(userLP) / parseFloat(totalLP));
    // console.log("USDC IS", usdc);
    const usdt =
      parseFloat(usdtPoolBal) * (parseFloat(userLP) / parseFloat(totalLP));
    // console.log("USDT IS", usdt);
    const total = dai + usdc + usdt;
    const earned = total - parseFloat(userDeposit);
    setUserEarned(earned.toString());
    setEstimatedDai(dai.toString());
    setEstimatedUsdc(usdc.toString());
    setEstimatedUsdt(usdt.toString());
    setEstimatedTotal(total.toString());
  }, [
    totalLP,
    userLP,
    daiPoolBal,
    usdcPoolBal,
    usdtPoolBal,
    userDeposit,
    setUserEarned,
    setEstimatedDai,
    setEstimatedUsdc,
    setEstimatedUsdt,
    setEstimatedTotal,
  ]);

  if (isConnected) {
    return (

      <><div className="font-Inter h-[60vh] w-full p-10 flex items-center justify-center relative">
        {/* <h1 className='text-white text-2xl'>Hello</h1> */}
        <div className="absolute h-full w-full md:w-[80vw] -z-30 -top-[45px] left-[120px] flex flex-col">
          <div className="flex justify-end">
            <Image
              src={Circle}
              alt="img"
              height={400}
              width={400}
              className="h-64 w-64 flex-end" />
          </div>
          <div className="flex justify-start">
            <Image
              src={Circle}
              alt="img"
              height={400}
              width={400}
              className="h-96 w-96 flex-end" />
          </div>
        </div>

        <div className="relative mt-10 h-auto w-full md:w-[60vw] p-10 bg-gray-400 rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-40 border border-gray-100">
          <div className="flex-col lg:flex-row flex items-center justify-center lg:divide-x-2 ">
            <div className="w-full justify-center grid">
              <h2 className="text-xl md:text-4xl font-bold text-gray-300 hover:text-white mt-4 text-center">
                Earning
              </h2>
              <div className="mt-2  flex">
                <div className="p-2">
                  <p className="text-lg text-white leading-8">Earned : $ {userEarned}</p>
                  {/* <p className="text-lg text-white leading-8">USDT : $ {estimatedUsdt}</p>
                  <p className="text-lg text-white leading-8">CRV (USD) : {crvValueUSD}</p> */}
                </div>
                <div className="p-2 pl-4">
                  <p className="text-lg text-white leading-8">Deposits : $ {userDeposit}</p>
                  {/* <p className="text-lg text-white leading-8">CRV : {crvValue}</p>
                  <p className="text-lg text-white leading-8">Estimated Total: {estimatedTotal}</p> */}
                </div>

              </div>
              <h2 className="my-5 text-2xl font-medium text-transparent bg-clip-text animate-text bg-gradient-to-r from-white to-[rgba(255,255,255,0.55)]">
            Wooho! You have earned a 4% interset on your deposit.
          </h2>
            </div>
          </div>
        </div>
      </div></>
    );
  } else {
    return (
      <div className="text-white text-center animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-5xl font-black ">
        Connect to wallet to earn{" "}
      </div>
    );
  }
};

export default Earnings;
