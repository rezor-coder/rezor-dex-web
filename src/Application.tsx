import React from "react";
import { Router, RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { ROUTES } from "./utils/constants";
import Swap from "./components/pages/Swap/Swap";
import Liquidity from "./components/pages/Liquidity/Liquidity";
import AddLiquidity from "./components/pages/Liquidity/Component/AddLiquidity";
import LiquidityForm from "./components/pages/Liquidity/Component/LiquidityForm";
import SwapCard from "./components/pages/Swap/SwapCard/SwapCard";
import ReviewSwap from "./components/pages/Swap/ReviewSwap/ReviewSwap";
import PageNotFound from "./components/pages/PageNotFound/PageNotFound";
import Errorpage from "./components/pages/ErrorPage/Errorpage";
import TokenDashboard from "./components/pages/TokenDashboard/TokenDashboard";
import Explorer from "./components/pages/Explorer/Explorer";
import HomePage from "./components/pages/HomePage";

const Application = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      ErrorBoundary: Errorpage,
      element: <Layout />,
      children: [
        {
          path: ROUTES.HOME,
          element: <HomePage/>,
        },
        {
          path: ROUTES.SWAP,
          // index: true,
          element: <Swap />,
          children: [
            {
              index: true,
              element: <SwapCard />,
            },
            {
              path: ROUTES.REVIEWSWAP,
              element: <ReviewSwap />,
            },
          ],
        },
        {
          path: ROUTES.LIQUIDITY,
          element: <Liquidity />,
          children: [
            {
              index: true,
              element: <AddLiquidity />,
            },
            {
              path: ROUTES.LIQUIDITYFORM,
              element: <LiquidityForm />,
            },
          ],
        },
       
       
       
        {
          path: ROUTES.TOKEN_ID,
          element: <TokenDashboard/>,
        },
        {
          path: ROUTES.EXPLORER,
          element: <Explorer />,
        },
        // {
        //   path: ROUTES.EXPLORER_ID,
        //   element: <SwapDetails />,
        // },
      ],
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default Application;
