import React, { ReactNode, createContext, useState } from "react";
import { BigNumber, BigNumberish, ethers } from "ethers";
import SAAVEABI from "@/abis/SAAVEABI.json";
import {
  useContract,
  useContractRead,
  useContractReads,
  useSigner,
} from "wagmi";
export const AuthContext = createContext({
  walletUSDCBalance: "0",
  walletUSDTBalance: "0",
  walletDAIBalance: "0",
  depositDAIValue: "0",
  depositUSDCValue: "0",
  depositUSDTValue: "0",
  daiAllowance: "0",
  usdcAllowance: "0",
  usdtAllowance: "0",
  daiPoolBal: "0",
  usdcPoolBal: "0",
  usdtPoolBal: "0",
  userLP: "0",
  totalLP: "0",
  crvValueUSD: "0",
  crvValue: "0",
  userEarned: "0",
  userDeposit: "0",
  estimatedTotal: "0",
  estimatedUsdt: "0",
  estimatedUsdc: "0",
  estimatedDai: "0",
  setEstimatedUsdt: (estimatedUsdt: string) => {},
  setEstimatedUsdc: (estimatedUsdt: string) => {},
  setEstimatedDai: (estimatedUsdt: string) => {},
  setEstimatedTotal: (estimatedTotal: string) => {},
  setUserDeposit: (userDeposit: string) => {},
  setUserEarned: (userEarned: string) => {},
  setCrvValue: (crvValue: string) => {},
  setCrvValueUSD: (crvValueUSD: string) => {},
  setTotalLP: (totalLP: string) => {},
  setUserLP: (userLP: string) => {},
  setUsdtPoolBal: (usdtPoolBal: string) => {},
  setUsdcPoolBal: (usdcPoolBal: string) => {},
  setDaiPoolBal: (daiPoolBal: string) => {},
  setUsdtAllowance: (usdtAllowance: string) => {},
  setUsdcAllowance: (usdcAllowance: string) => {},
  setDaiAllowance: (daiAllowance: string) => {},
  setDepositUSDTValue: (depositUSDTValue: string) => {},
  setDepositUSDCValue: (depositUSDCValue: string) => {},
  setDepositDAIValue: (depositDAIValue: string) => {},
  setWalletDAIBalance: (walletDAIBalance: string) => {},
  setWalletUSDTBalance: (walletUSDTBalance: string) => {},
  setWalletUSDCBalance: (walletUSDCBalance: string) => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [walletUSDCBalance, setWalletUSDCBalance] = useState("0");
  const [walletUSDTBalance, setWalletUSDTBalance] = useState("0");
  const [walletDAIBalance, setWalletDAIBalance] = useState("0");
  const [depositDAIValue, setDepositDAIValue] = useState("0");
  const [depositUSDCValue, setDepositUSDCValue] = useState("0");
  const [depositUSDTValue, setDepositUSDTValue] = useState("0");
  const [crvValue, setCrvValue] = useState("0");
  const [crvValueUSD, setCrvValueUSD] = useState("0");
  const [daiAllowance, setDaiAllowance] = useState("0");
  const [usdcAllowance, setUsdcAllowance] = useState("0");
  const [usdtAllowance, setUsdtAllowance] = useState("0");
  const [daiPoolBal, setDaiPoolBal] = useState("0");
  const [usdcPoolBal, setUsdcPoolBal] = useState("0");
  const [usdtPoolBal, setUsdtPoolBal] = useState("0");
  const [userLP, setUserLP] = useState("0");
  const [totalLP, setTotalLP] = useState("0");
  const [userDeposit, setUserDeposit] = useState("0");
  const [userEarned, setUserEarned] = useState("0");
  const [estimatedDai, setEstimatedDai] = useState("0");
  const [estimatedUsdc, setEstimatedUsdc] = useState("0");
  const [estimatedUsdt, setEstimatedUsdt] = useState("0");
  const [estimatedTotal, setEstimatedTotal] = useState("0");

  const saaveContract = {
    address: SAAVEABI.address,
    abi: SAAVEABI.abi,
  };
  const { data } = useContractRead({
    ...saaveContract,
    functionName: "getUserDeposit",
    onSuccess(data: BigNumber) {
      if (data) {
        var totalDeposited = ethers.utils.formatEther(data);
        setUserDeposit(totalDeposited);
      }
    },
    onError(error) {
      console.log("Error in UserDeposit", error);
    },
  });

  //getPoolDAIBalance

  useContractRead({
    ...saaveContract,
    functionName: "getPoolDAIBalance",
    onSuccess(data: BigNumber) {
      if (data) {
        var daiPool = ethers.utils.formatEther(data);
        setDaiPoolBal(daiPool);
      }
    },
    onError(error) {
      console.log("Error in getPoolDAIBalance", error);
    },
  });

  // getPoolUSDCBalance

  useContractRead({
    ...saaveContract,
    functionName: "getPoolUSDCBalance",
    onSuccess(data: BigNumber) {
      if (data) {
        var usdcPool = ethers.utils.formatEther(data);
        setUsdcPoolBal(usdcPool);
      }
    },
    onError(error) {
      console.log("Error in getPoolUSDCBalance", error);
    },
  });

  // getPoolUSDTBalance

  useContractRead({
    ...saaveContract,
    functionName: "getPoolUSDTBalance",
    onSuccess(data: BigNumber) {
      if (data) {
        var usdtPool = ethers.utils.formatEther(data);
        setUsdtPoolBal(usdtPool);
      }
    },
    onError(error) {
      console.log("Error in getPoolUSDTBalance", error);
    },
  });
  // totalLP
  useContractRead({
    ...saaveContract,
    functionName: "totalLP",
    onSuccess(data: BigNumber) {
      if (data) {
        var totalLP = ethers.utils.formatEther(data);
        setTotalLP(totalLP);
      }
    },
    onError(error) {
      console.log("Error in totalLP", error);
    },
  });

  // getUserLP
  useContractRead({
    ...saaveContract,
    functionName: "getUserLP",
    onSuccess(data: BigNumber) {
      if (data) {
        var userLP = ethers.utils.formatEther(data);
        setUserLP(userLP);
      }
    },
    onError(error) {
      console.log("Error in getUserLP", error);
    },
  });

  // totalCRVEarned
  useContractRead({
    ...saaveContract,
    functionName: "totalCRVEarned",
    onSuccess(data: BigNumber) {
      if (data) {
        var crv = ethers.utils.formatEther(data);
        setCrvValue(crv);
      }
    },
    onError(error) {
      console.log("Error in totalCRVEarned", error);
    },
  });
  // getCRVSold
  useContractRead({
    ...saaveContract,
    functionName: "getCRVSold",
    onSuccess(data: BigNumber) {
      if (data) {
        var crvUSD = ethers.utils.formatEther(data);
        setCrvValueUSD(crvUSD);
      }
    },
    onError(error) {
      console.log("Error in getCRVSold", error);
    },
  });

//   const { isError, isLoading } = useContractReads({
//     contracts: [
//       {
//         ...saaveContract,
//         functionName: "getWalletUSDCBalance",
//       },
//       {
//         ...saaveContract,
//         functionName: "getWalletUSDTBalance",
//       },
//       {
//         ...saaveContract,
//         functionName: "getWalletDAIBalance",
//       },
//     ],
//     async onSuccess(data: [BigNumberish, BigNumberish, BigNumberish]) {
//       if (data[0] && data[1] && data[2]) {
//         var totalDeposited = ethers.utils.formatEther(data[0]);
//         setWalletUSDCBalance(totalDeposited);
//         var totalEarned = ethers.utils.formatEther(data[1]);
//         setWalletUSDTBalance(totalEarned);
//         var totalEarned = ethers.utils.formatEther(data[2]);
//         setWalletDAIBalance(totalEarned);
//       }
//     },
//     onError(error) {
//       console.log("Error in getWalletBalance", error);
//     },
//   });

  return (
    <AuthContext.Provider
      value={{
        daiPoolBal,
        usdcPoolBal,
        usdtPoolBal,
        userLP,
        totalLP,
        daiAllowance,
        usdcAllowance,
        usdtAllowance,
        depositDAIValue,
        depositUSDCValue,
        depositUSDTValue,
        walletUSDCBalance,
        walletDAIBalance,
        walletUSDTBalance,
        crvValueUSD,
        crvValue,
        userDeposit,
        userEarned,
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
        setCrvValueUSD,
        setCrvValue,
        setTotalLP,
        setUserLP,
        setUsdtPoolBal,
        setUsdcPoolBal,
        setDaiPoolBal,
        setUsdtAllowance,
        setUsdcAllowance,
        setDaiAllowance,
        setWalletUSDCBalance,
        setDepositDAIValue,
        setDepositUSDCValue,
        setDepositUSDTValue,
        setWalletDAIBalance,
        setWalletUSDTBalance,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
