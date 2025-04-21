import routerABI from "../abi/router.json";
import factoryABI from "../abi/factory.json";
import pairABI from "../abi/pair.json";
import stakingABI from "../abi/stakingFactory.json";
import STAKINGABISBC from "../abi/stakingABIsbc.json"
import BlueSparrow from "../icons/blue-sparrow.svg";
import BNB from "../icons/tokens/bnb.svg";
import BONE from "../icons/bone.svg";
import BUSD from "../icons/USDT.svg";
import CRO from "../icons/crocro.svg";
import DOGE from "../icons/dogecoin-logo.svg";
import DUBX from "../icons/dubx.svg";
import ETH from "../icons/ETH-Token.svg";
import FUND from "../icons/fund.svg";
import SLAKE from "../icons/slake.svg";
import iRYDE from "../icons/iryde.svg";
import Jasmy from "../icons/jasmy.svg";
import Kishimoto from "../icons/Automata.svg";
import LUNAC from "../icons/Lunac.svg";
import MANDOX from "../icons/Audius.svg";
import MAZI from "../icons/mazi.svg";
import RezorChain from "../icons/stcIcon.svg";
import { TOKEN_DATA } from "../../interfaces/Liquidity";
import motionToken from "../icons/MOTN.svg"
import STB from  "../icons/STB.png"
import SLEEPY from  "../icons/SLEEPY.svg"
import MAGA from "../icons/latestTruMaga.svg"
import HIVE from "../icons/mainHive1.svg"
import BDEFI from "../icons/BDEFI.svg"
import FOF from "../icons/FOFIconNewSmall.svg"






export const envType: string = process.env.REACT_APP_ENV_TYPE || "production";
export const BSC_CONTRACT_LIST =
  envType !== "production"
    ? {
      panRouter: {
        address: "add contract",
        Block: 15210794,
        abi: routerABI,
      },
        router: {
          address: "0x41bA041A2A5532baa39C59dEFF895eBdF4899Afb",
          Block: 6615558,
          abi: routerABI,
        },
        panCakeRouter: {
          address: "add contract",
          blockNumber: 6810080,
          abi: routerABI,
        },
        factory: {
          address: "0x48586786d16468cb456A484cD1Cf47cc3bDFFFa6",
          blockNumber: 6430279,
          abi: factoryABI,
        },
        pair: {
          address: "",
          blockNumber: 0,
          abi: pairABI,
        },
        stakingFactory: {
          address: "add contract",
          blockNumber: 0,
          abi: stakingABI,
        },
      }
    : {
        panRouter: {
          address: "add contract",
          Block: 6615558,
          abi: routerABI,
        },
        router: {
          address: "add contract",
          Block: 6615558,
          abi: routerABI,
        },
        panCakeRouter: {
          address: "add contract",
          blockNumber: 6810080,
          abi: routerABI,
        },
        factory: {
          address: "add contract",
          blockNumber: 6430279,
          abi: factoryABI,
        },
        pair: {
          address: "",
          blockNumber: 0,
          abi: pairABI,
        },
        stakingFactory: {
          address: "add contract",
          blockNumber: 0,
          abi: stakingABI,
        },
      };

export const ETHEREUM_CONTRACT_LIST =
  envType !== "production"
    ? {
        router: {
          address: "add contract",
          Block: 15210794,
          abi: routerABI,
        },
        panCakeRouter: {
          address: "add contract",
          blockNumber: 15210794,
          abi: routerABI,
        },
        factory: {
          address: "add contract",
          blockNumber: 6430279,
          abi: factoryABI,
        },
        pair: {
          address: "",
          blockNumber: 0,
          abi: pairABI,
        },
        stakingFactory: {
          address: "add contract",
          blockNumber: 0,
          abi: stakingABI,
        },
      }
    : {
        panRouter: {
          address: "add contract",
          Block: 15210794,
          abi: routerABI,
        },
        router: {
          address: "add contract",
          Block: 15210794,
          abi: routerABI,
        },
        panCakeRouter: {
          address: "add contract",
          blockNumber: 15210794,
          abi: routerABI,
        },
        factory: {
          address: "add contract",
          blockNumber: 6430279,
          abi: factoryABI,
        },
        pair: {
          address: "",
          blockNumber: 0,
          abi: pairABI,
        },
        stakingFactory: {
          address: "add contract",
          blockNumber: 0,
          abi: stakingABI,
        },
      };

export const REZORCHAIN_CONTRACT_LIST =
  envType !== "production"
    ? {
        // router: {
        //   address: "0x0134480c6Fce13dD9280FC2572C704384cE4D097",
        //   Block: 15210794,
        //   abi: routerABI,
        // },
        router: {
          address: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
          Block: 6615558,
          abi: routerABI,
        },
        panCakeRouter: {
          address: "0x1619c2Bd9186f7D84dbf0e09bb473F07A4F55D6c",
          blockNumber: 15210794,
          abi: routerABI,
        },
        factory: {
          address: "0x1619c2Bd9186f7D84dbf0e09bb473F07A4F55D6c",
          blockNumber: 6430279,
          abi: factoryABI,
        },
        pair: {
          address: "",
          blockNumber: 0,
          abi: pairABI,
        },
        stakingFactory: {
          address: "0x8e58C35D946b704F63560359A79A687968c599e5",
          blockNumber: 0,
          abi: STAKINGABISBC,
        }
      }
    : {
        // router: {
        //   address: "0x389020A592e3da50506e1Efc04acFfdc17D8891e",
        //   Block: 15210794,
        //   abi: routerABI,
        // },
        router: {
          address: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
          Block: 6615558,
          abi: routerABI,
        },
        panCakeRouter: {
          address: "0x1445A124201a1eF724Db086Be3B3FF7c3f541022",
          blockNumber: 15210794,
          abi: routerABI,
        },
        factory: {
          address: "0xb188664590cB69B696b86B721B502F006222b7ea",
          blockNumber: 6430279,
          abi: factoryABI,
        },
        pair: {
          address: "",
          blockNumber: 0,
          abi: pairABI,
        },
        stakingFactory: {
          address: "0xB6b8c74D1a315fC1053526922E23840e8849d976",
          blockNumber: 1232639,
          abi: STAKINGABISBC,
        },
      };
export const BSC_TOKEN_LIST: TOKEN_DATA[] =
  envType !== "production"
    ? [
        // {
        //   name: "BNB",
        //   address: "0xfDd1a163518E7ee5e98b60c87E93e2881dbFfCd0",
        //   isNative: true,
        //   decimals: 18,
        //   symbol: "BNB",
        //   icon: BNB,
        // },
        {
          name: "WBTC",
          address: "0xaB4E7fdE1E17f6d3409cC591529292b2a994A706",
          isNative: true,
          decimals: 18,
          symbol: "WBTC",
          icon: BNB,
        },
        {
          name: "Mazimatic",
          address: "0xcC12487954C2b0deA99F8f0b6Bf2Edd13779075a",
          isNative: false,
          decimals: 18,
          symbol: "MAZI",
          icon: MAZI,
        },
        {
          name: "SHIB",
          address: "0x457ff09A1BAb107ADa686e1373709Cf1d1B8d094",
          isNative: false,
          decimals: 18,
          symbol: "SHIB",
          icon: BUSD,
        },
        {
          name: "TUSDC",
          address: "0x6e4BB331Fd5fd9d7d9Cb7De52C2426ED861d5302",
          isNative: false,
          decimals: 18,
          symbol: "USDC",
          icon: BUSD,
        },
        {
          name: "DogeCoin",
          address: "0xA5d77349db339eaC3E0AC749A03fde07653CC00B",
          isNative: false,
          decimals: 8,
          symbol: "DOGE",
          icon: DOGE,
        },
      ]
    : [
        // {
        //   name: "BNB",
        //   address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
        //   isNative: true,
        //   decimals: 18,
        //   symbol: "BNB",
        //   icon: BNB,
        // },
        // {
        //   name: "Mazimatic",
        //   address: "0x5B8650Cd999B23cF39Ab12e3213fbC8709c7f5CB",
        //   isNative: false,
        //   decimals: 18,
        //   symbol: "MAZI",
        //   icon: MAZI,
        // },
        // {
        //   name: "TruMaga",
        //   address: "0x328Ea6e5Ba4cc4B58799F2AEC3d8BA839f4314Ba",
        //   isNative: false,
        //   decimals: 18,
        //   symbol: "TruMaga",
        //   icon: MAGA,
        // },
        // {
        //   name: "Blokdefi",
        //   address: "0xE078118Fd1EC3E96750ab30bb32bB7aaF95d42D4",
        //   isNative: false,
        //   decimals: 18,
        //   symbol: "BDEFI",
        //   icon: BDEFI,
        // },
        // {
        //   name: "Flame Of Floki",
        //   address: "0xf0fcf7602c4722ad4cbc1b1d8bf8b3a79ee4c8e1",
        //   isNative: false,
        //   decimals: 18,
        //   symbol: "FOF",
        //   icon: FOF,
        // },
        // {
        //   name: "USDT",
        //   address: "0x55d398326f99059fF775485246999027B3197955",
        //   isNative: false,
        //   decimals: 18,
        //   symbol: "USDT",
        //   icon: BUSD,
        // },
        // {
        //   name: "TUSDT",
        //   address: "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd",
        //   isNative: false,
        //   decimals: 18,
        //   symbol: "USDT",
        //   icon: BUSD,
        // },
        // {
        //   name: "MotionToken",
        //   address: "0x5dEF381F3A069ECD90AE69361F61d96Bd9f3Ad70",
        //   isNative: false,
        //   decimals: 18,
        //   symbol: "MOTN",
        //   icon: motionToken,
        // },
        // {
        //   name: "DogeCoin",
        //   address: "0xba2ae424d960c26247dd6c32edc70b295c744c43",
        //   isNative: false,
        //   decimals: 8,
        //   symbol: "DOGE",
        //   icon: DOGE,
        // },
      ];

export const REZOR_TOKEN_LIST: TOKEN_DATA[] =
  [
      // {
      //   name: "DOGE",
      //   address: "0xA5d77349db339eaC3E0AC749A03fde07653CC00B",
      //   isNative: true,
      //   decimals: 18,
      //   symbol: "DOGE",
      //   icon: DOGE,
      // },
      // {
      //   name: "USDC",
      //   address: "0x6e4BB331Fd5fd9d7d9Cb7De52C2426ED861d5302",
      //   isNative: true,
      //   decimals: 18,
      //   symbol: "USDC",
      //   icon: BUSD,
      // },
      // {
      //   name: "SHIB",
      //   address: "0x457ff09A1BAb107ADa686e1373709Cf1d1B8d094",
      //   isNative: true,
      //   decimals: 18,
      //   symbol: "SHIB",
      //   icon: BNB,
      // },
      // {
      //   name: "WBTC",
      //   address: "0xaB4E7fdE1E17f6d3409cC591529292b2a994A706",
      //   isNative: true,
      //   decimals: 18,
      //   symbol: "WBTC",
      //   icon: BNB,
      // },
    ]
// envType !== "production"
//   ? [
//       {
//         name: "BNB",
//         address: "0xfDd1a163518E7ee5e98b60c87E93e2881dbFfCd0",
//         isNative: true,
//         decimals: 18,
//         symbol: "BNB",
//         icon: BNB,
//       },
  //       {
  //         name: "RezorChain",
  //         address: "0xfC0b3e6D09566bA2Bb5F069Da59390EA001904Fb",
  //         isNative: false,
  //         decimals: 9,
  //         symbol: "STC",
  //         icon: RezorChain,
  //       },
  //       {
  //         name: "Mazimatic",
  //         address: "0xcC12487954C2b0deA99F8f0b6Bf2Edd13779075a",
  //         isNative: false,
  //         decimals: 18,
  //         symbol: "MAZI",
  //         icon: MAZI,
  //       },
  //       {
  //         name: "USDT",
  //         address: "0x06251D86D2EB6a67323014C1ED7b94422AFC5349",
  //         isNative: false,
  //         decimals: 18,
  //         symbol: "USDT",
  //         icon: BUSD,
  //       },
  //       {
  //         name: "USDT1",
  //         address: "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd",
  //         isNative: false,
  //         decimals: 18,
  //         symbol: "USDT",
  //         icon: BUSD,
  //       },
  //       {
  //         name: "DogeCoin",
  //         address: "0x3Fea0Ca76Ac13D41C784f4AF6898479dfA8BBDd3",
  //         isNative: false,
  //         decimals: 8,
  //         symbol: "DOGE",
  //         icon: DOGE,
  //       },
  //     ]
  //   : [
  //       {
  //         name: "BNB",
  //         address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  //         isNative: true,
  //         decimals: 18,
  //         symbol: "BNB",
  //         icon: BNB,
  //       },
  //       {
  //         name: "RezorChain",
  //         address: "0x19Ae49B9F38dD836317363839A5f6bfBFA7e319A",
  //         isNative: false,
  //         decimals: 9,
  //         symbol: "STC",
  //         icon: RezorChain,
  //       },{
  //         name: "RezorChain Burn",
  //         address: "0xe5c3029c20a0e5bba2ca778efd9cea9980f0abdc",
  //         isNative: false,
  //         decimals: 18,
  //         symbol: "STCB",
  //         icon: STB,
  //       },
  //       {
  //         name: "Mazimatic",
  //         address: "0x5B8650Cd999B23cF39Ab12e3213fbC8709c7f5CB",
  //         isNative: false,
  //         decimals: 18,
  //         symbol: "MAZI",
  //         icon: MAZI,
  //       },
  //       {
  //         name: "TruMaga",
  //         address: "0x328Ea6e5Ba4cc4B58799F2AEC3d8BA839f4314Ba",
  //         isNative: false,
  //         decimals: 18,
  //         symbol: "TruMaga",
  //         icon: MAGA,
  //       },
  //       {
  //         name: "Blokdefi",
  //         address: "0xE078118Fd1EC3E96750ab30bb32bB7aaF95d42D4",
  //         isNative: false,
  //         decimals: 18,
  //         symbol: "BDEFI",
  //         icon: BDEFI,
  //       },
  //       {
  //         name: "Flame Of Floki",
  //         address: "0xf0fcf7602c4722ad4cbc1b1d8bf8b3a79ee4c8e1",
  //         isNative: false,
  //         decimals: 18,
  //         symbol: "FOF",
  //         icon: FOF,
  //       },
  //       {
  //         name: "USDT",
  //         address: "0x55d398326f99059fF775485246999027B3197955",
  //         isNative: false,
  //         decimals: 18,
  //         symbol: "USDT",
  //         icon: BUSD,
  //       },
  //       {
  //         name: "TUSDT",
  //         address: "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd",
  //         isNative: false,
  //         decimals: 18,
  //         symbol: "USDT",
  //         icon: BUSD,
  //       },
  //       {
  //         name: "MotionToken",
  //         address: "0x5dEF381F3A069ECD90AE69361F61d96Bd9f3Ad70",
  //         isNative: false,
  //         decimals: 18,
  //         symbol: "MOTN",
  //         icon: motionToken,
  //       },
  //       {
  //         name: "DogeCoin",
  //         address: "0xba2ae424d960c26247dd6c32edc70b295c744c43",
  //         isNative: false,
  //         decimals: 8,
  //         symbol: "DOGE",
  //         icon: DOGE,
  //       },
  //     ];



export const REZORCHAIN_TOKEN_LIST: TOKEN_DATA[] =
  envType !== "production"
    ? [
        {
          name: "RezorChain",
          address: "0x1d98A34E975a9eB31f563B99705b37b769a2A41A",
          isNative: true,
          decimals: 18,
          symbol: "STC",
          icon: RezorChain,
        },
        {
          name: "Qwerty",
          address: "0x997C9d106cc5dD458e7E12FcC422e19357181e25",
          isNative: false,
          decimals: 18,
          symbol: "QRY",
          icon: MAZI,
        }
      ]
    : [
        {
          name: "RezorChain",
          address: "0x69C7FC9d0f3a396153cC2709FC7A79378F0B8577",
          isNative: true,
          decimals: 18,
          symbol: "STC",
          icon: RezorChain,
        },
        {
          name: "MotionToken",
          address: "0x24eb9171FF4406db6b3EdA19ac2E9d53A843D101",
          isNative: false,
          decimals: 18,
          symbol: "MOTN",
          icon: motionToken,
        },
        {
          name: "RezorChain Burn",
          address: "0x249F08dAFD0275C488264Eb229116D41676bb7CD",
          isNative: false,
          decimals: 18,
          symbol: "STCB",
          icon: STB, 
        },
        {
          name: "Sleepy Joe",
          address: "0xC98807ca213a5A858206CA3326122f328BE970B9",
          isNative: false,
          decimals: 18,
          symbol: "SLEEPY",
          icon: SLEEPY, 
        },
        {
          name: "TruMaga",
          address: "0x328Ea6e5Ba4cc4B58799F2AEC3d8BA839f4314Ba",
          isNative: false,
          decimals: 18,
          symbol: "TruMaga",
          icon: MAGA, 
        },
        {
          name: "Hive Token",
          address: "0x54bcD78F0048a4F82DE1Bf24Ad0D646A6EFF464B",
          isNative: false,
          decimals: 18,
          symbol: "HIVE",
          icon: HIVE, 
        }
        // {
        //   name: "WETH",
        //   address: "0x69C7FC9d0f3a396153cC2709FC7A79378F0B8577",
        //   isNative: true,
        //   decimals: 18,
        //   symbol: "WETH",
        //   icon: ETH,
        // },
        // {
        //   name: "TESt",
        //   address: "0xaec3bef1E7caDF1B66F280Da0Df4adF0d39F7Aa0",
        //   isNative: false,
        //   decimals: 18,
        //   symbol: "TESt",
        //   icon: ETH,
        // },
      ];

export const ETHEREUM_TOKEN_LIST: TOKEN_DATA[] =
  envType !== "production"
    ? [
        {
          name: "ETH",
          address: "0xC8d8Ad6092aA5929E521f81114615b113460dE27",
          isNative: true,
          decimals: 18,
          symbol: "ETH",
          icon: ETH,
        },
        {
          name: "Kishimoto",
          address: "0xae36155a55f04a696b8362777620027882b31db5",
          isNative: false,
          decimals: 9,
          symbol: "Kishimoto",
          icon: Kishimoto,
        },
        {
          name: "Slake",
          address: "0x9C2500CfD2f1De40255Cee5EC8AdA6466E1eddf1",
          isNative: false,
          decimals: 18,
          symbol: "SLAKE",
          icon: SLAKE,
        },
        {
          name: "FUND",
          address: "0xe9B076B476D8865cDF79D1Cf7DF420EE397a7f75",
          isNative: false,
          decimals: 9,
          symbol: "Unification(FUND)",
          icon: FUND,
        },
        {
          name: "Mandox",
          address: "0x33d203fa03bb30b133de0fe2d6533c268ba286b6",
          isNative: false,
          decimals: 9,
          symbol: "MANDOX",
          icon: MANDOX,
        },
        {
          name: "Bone",
          address: "0x9813037ee2218799597d83D4a5B6F3b6778218d9",
          isNative: false,
          decimals: 18,
          symbol: "BONE",
          icon: BONE,
        },
        {
          name: "BlueSparrow Token",
          address: "0x24ccedebf841544c9e6a62af4e8c2fa6e5a46fde",
          isNative: false,
          decimals: 9,
          symbol: "BlueSparrow",
          icon: BlueSparrow,
        },
        {
          name: "Cronos",
          address: "0xA0b73E1Ff0B80914AB6fe0444E65848C4C34450b",
          isNative: false,
          decimals: 8,
          symbol: "CRO",
          icon: CRO,
        },
        {
          name: "JasmyCoin",
          address: "0x7420b4b9a0110cdc71fb720908340c03f9bc03ec",
          isNative: false,
          decimals: 18,
          symbol: "JASMY",
          icon: Jasmy,
        },
        {
          name: "LUNA Classic",
          address: "0xd2877702675e6ceb975b4a1dff9fb7baf4c91ea9",
          isNative: false,
          decimals: 18,
          symbol: "LUNC",
          icon: LUNAC,
        },
        {
          name: "iRYDE",
          address: "0x74fE27e70db10147F8B6b38b3C9d12BBdcf3b5AF",
          isNative: false,
          decimals: 18,
          symbol: "iRYDE",
          icon: iRYDE,
        },
        {
          name: "DUBX",
          address: "0x75CE16D11B83605aa039D40d7d846ff23064Fb65",
          isNative: false,
          decimals: 9,
          symbol: "DUB",
          icon: DUBX,
        },
      ]
    : [
        {
          name: "ETH",
          address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
          isNative: true,
          decimals: 18,
          symbol: "ETH",
          icon: ETH,
        },
        {
          name: "Kishimoto",
          address: "0xae36155a55f04a696b8362777620027882b31db5",
          isNative: false,
          decimals: 9,
          symbol: "Kishimoto",
          icon: Kishimoto,
        },
        {
          name: "Slake",
          address: "0x9C2500CfD2f1De40255Cee5EC8AdA6466E1eddf1",
          isNative: false,
          decimals: 18,
          symbol: "SLAKE",
          icon: SLAKE,
        },
        // {
        //   name: "FUND",
        //   address: "0xe9B076B476D8865cDF79D1Cf7DF420EE397a7f75",
        //   isNative: false,
        //   decimals: 9,
        //   symbol: "Unification(FUND)",
        //   icon: FUND,
        // },
        {
          name: "Mandox",
          address: "0x33d203fa03bb30b133de0fe2d6533c268ba286b6",
          isNative: false,
          decimals: 9,
          symbol: "MANDOX",
          icon: MANDOX,
        },
        // {
        //   name: "Bone",
        //   address: "0x9813037ee2218799597d83D4a5B6F3b6778218d9",
        //   isNative: false,
        //   decimals: 18,
        //   symbol: "BONE",
        //   icon: BONE,
        // },
        {
          name: "BlueSparrow Token",
          address: "0x24ccedebf841544c9e6a62af4e8c2fa6e5a46fde",
          isNative: false,
          decimals: 9,
          symbol: "BlueSparrow",
          icon: BlueSparrow,
        },
        // {
        //   name: "Cronos",
        //   address: "0xA0b73E1Ff0B80914AB6fe0444E65848C4C34450b",
        //   isNative: false,
        //   decimals: 8,
        //   symbol: "CRO",
        //   icon: CRO,
        // },
        // {
        //   name: "JasmyCoin",
        //   address: "0x7420b4b9a0110cdc71fb720908340c03f9bc03ec",
        //   isNative: false,
        //   decimals: 18,
        //   symbol: "JASMY",
        //   icon: Jasmy,
        // },
        // {
        //   name: "LUNA Classic",
        //   address: "0xd2877702675e6ceb975b4a1dff9fb7baf4c91ea9",
        //   isNative: false,
        //   decimals: 18,
        //   symbol: "LUNC",
        //   icon: LUNAC,
        // },
        {
          name: "iRYDE",
          address: "0x74fE27e70db10147F8B6b38b3C9d12BBdcf3b5AF",
          isNative: false,
          decimals: 18,
          symbol: "iRYDE",
          icon: iRYDE,
        },
        {
          name: "DUBX",
          address: "0x75CE16D11B83605aa039D40d7d846ff23064Fb65",
          isNative: false,
          decimals: 9,
          symbol: "DUB",
          icon: DUBX,
        },
      ];
