import React  from "react";
import { Router, RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { ROUTES } from "./utils/constants";
import HomePage from "./components/pages/HomePage";
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


// import "./index.scss";


const Application = () => {
 
  const ele  = window.location.pathname == '/' ? <HomePage /> : <Layout />
  const router = createBrowserRouter([
    // {
    //   path: ROUTES.HOME,
    //   element: <HomePage/>,
    // },

    {
      path: "/",
      ErrorBoundary: Errorpage,
      element: ele,
      children: [
        {
          index: true,
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
