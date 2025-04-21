import React, { useState, useEffect } from "react";
import {
  SearchIcon,
  StarIcon,
  StarIconFilled,
} from "../../../assets/icons/svgicons";
import Button from "../../common/Button/Button";
import CommonTable from "../../common/CommonTable/CommonTable";
import "./Explorer.scss";
import BuysellModal from "../../common/Modals/BuysellModal/BuysellModal";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { MarketServices } from "../../../services/MarketService/marketService";
import { toast } from "../../common/Toasts/Toast";
import { marketDataUpdate } from "../../../features/theme/market.slice";
import Shimmer from "../../common/Shimmer/Shimmer";

const Explorer = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();
  let navigate = useNavigate();
  const {
    walletAddress,
    transactionCounter,
    slippage,
  }: { walletAddress: string; transactionCounter: boolean; slippage: number } =
    useAppSelector((store: any) => store?.user);
  let dispatch = useAppDispatch();

  const intialPagination = {
    current: 1,
    pageSize: 10,

    total: 0,
  };

  const [show1, setShow1] = useState(false);
  const [currencyType, setcurrencyType] = useState({
    receivingCurrency: "htx",
    receivableCurrency: "usdt",
    symbol: "htxusdt",
    name: "htx/usdt",
  });
  const [marketData, setMarketData] = useState([]);
  const [favData, setFavData] = useState([]);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState(intialPagination);

  // for sorting

  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  // Handle Tab Navigation
  const handleNavigate = (receivableCurrency: any) => {
    setSearch("");
    setPagination(intialPagination);
    navigate(`/market/${receivableCurrency}`);
  };

  // Fetch Market Data
  const getMarketData = async (tab: any, current: any) => {
    let data = {
      receivableCurrency: tab || "usdt",
      page: current || pagination.current || 1,
      limit: pagination.pageSize,
      search: search || "",
    };
    try {
      let marketRes: any;
      if (tab == "fav") {
        marketRes = await MarketServices.getFavouriteService({
          page: pagination.current || 1,
          limit: pagination.pageSize,
          search: search || "",
          UserAddress: walletAddress,
        });
      } else {
        marketRes = await MarketServices.findDesiredTokenService(data);
      }
      if (marketRes?.data?.data?.length > 0) {
        setMarketData(marketRes?.data?.data);
        setPagination({
          ...pagination,
          total: Number(marketRes?.data?.totalCount),
          current: current,
        });
      } else {
        setMarketData([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Get Favourites
  const getFav = async () => {
    let data = {
      UserAddress: walletAddress,
    };
    try {
      let favRes: any = await MarketServices.getFavouriteService(data);
      if (favRes?.data?.data?.length > 0) {
        setFavData(favRes?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //Add Favourites
  const setFavourite = async (recard: any) => {
    let data = {
      UserAddress: walletAddress,
      favSymbol: recard?.symbol || recard?.favSymbol,
      receivingCurrency: recard.receivingCurrency,
      receivableCurrency: recard.receivableCurrency,
      name: recard?.name,
    };
    let SetFavRes: any = await MarketServices.setFavouriteService(data);
    if (SetFavRes?.data?.error == false) {
      toast.info(`${SetFavRes.data.message}`);
      getMarketData(params.tab, "");
      getFav();
    } else {
      if (!walletAddress) {
        return toast.info("Connect wallet first!");
      }
      setShow1(walletAddress ? false : true);
    }
  };
  // Remove Favourites
  const removeFavourite = async (recard: any) => {
    let data = {
      UserAddress: walletAddress,
      favSymbol: recard.symbol || recard?.favSymbol,
      receivingCurrency: recard.receivingCurrency,
      receivableCurrency: recard.receivableCurrency,
      name: recard?.name,
    };
    let removeFavRes: any = await MarketServices.removeFavouriteService(data);
    if (removeFavRes?.data?.error == false) {
      setFavData([]);
      toast.info(`${removeFavRes?.data?.message}`);
      getFav();
      getMarketData(params.tab, "");
    } else {
      toast.info("");
    }
  };
  // Compare Favourites with marketData
  let compareFav = (favData: any, nameRecard: any) => {
    let favorite = false;
    favData.filter((object: any) => {
      if (object?.name == nameRecard) {
        favorite = true;
      }
    });
    return favorite;
  };

  const handlePaginationChange = (current: any, pageSize: any) => {
    setPagination({
      ...pagination,
      current: current,
      pageSize: pageSize,
    });
    getMarketData(params.tab, current);
  };

  const handleSort = (columnName: any) => {
    if (sortColumn === columnName) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(columnName);
      setSortOrder("asc");
    }
  };
  const sortData = (data: any) => {
    if (!sortColumn) {
      return data;
    }

    const sortedData = [...data];
    sortedData.sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });

    return sortedData;
  };
  // Search

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.trim().toLowerCase();
    setSearch(searchTerm);
  };

  useEffect(() => {
    const getData = setTimeout(() => {
      getMarketData(params.tab, "");
    }, 500);
    return () => clearTimeout(getData);
  }, [search]);

  useEffect(() => {
    getMarketData(params.tab, "");
    getFav();
  }, [params.tab]);

  const sortedData = sortData(marketData);
  // const tableData = [
  //   {
  //     symbol: "PEPE/USDT",
  //     lastPrice: "0.000001225167",
  //     turn_over: "948621.16",
  //     volume: "776904727464.01",
  //     isFavorite: false,
  //   },
  //   {
  //     symbol: "LPT/USDT",
  //     lastPrice: "7.889",
  //     turn_over: "4320693.60",
  //     volume: "547364.16",
  //     isFavorite: true,
  //   },
  //   {
  //     symbol: "PEPE/USDT",
  //     lastPrice: "0.000001225167",
  //     turn_over: "948621.16",
  //     volume: "776904727464.01",
  //     isFavorite: true,
  //   },
  //   {
  //     symbol: "PEPE/USDT",
  //     lastPrice: "0.000001225167",
  //     turn_over: "948621.16",
  //     isFavorite: false,
  //     volume: "776904727464.01",
  //   },
  //   {
  //     symbol: "PEPE/USDT",
  //     lastPrice: "0.000001225167",
  //     turn_over: "948621.16",
  //     isFavorite: false,
  //     volume: "776904727464.01",
  //   },
  // ];
  const tableheading = [
    { label: "Trader" },
    { label: "From token" },
    { label: "To token" },
    { label: "Age" },
    { label: "Chain" },
    { label: "Status" },
  ];
  return (
    <>
      <div className="trade_page">
        <div className="trade_table">
          {/* <div className="table_head">
            <h5>Trade</h5>
            <div className="table_rightside">
              <div className="table_head_input">
                <span>
                  <SearchIcon />
                </span>
                <input
                  type="text"
                  placeholder="Search"
                  onChange={handleSearch}
                  maxLength={20}
                />
              </div>
            </div>
          </div> */}
          <div className="table_in">
            <CommonTable
              className="tableTrade last_btnfix"
              fields={tableheading}
            >
              {sortedData.map((content: any) => (
                <tr key={content.lastPrice}>
                  <td>123456789</td>
                  <td>BNB</td>
                  <td>SOL</td>
                  <td>2 minutes ago</td>
                  <td>logos</td>
                  <td>In progress</td>
                  <td>
                    {
                      // content.name != "--" &&
                      // content.volume != "--" &&
                      // content.price != "--" &&
                      // content.turnOver != "--" ? (
                      <Button className="trade_btn">Details</Button>
                      // ) : (
                      //   <Shimmer height={10} width={50} />
                      // )
                    }
                  </td>
                </tr>
              ))}
            </CommonTable>
          </div>
        </div>
      </div>
      <BuysellModal
        show={show}
        currencyType={currencyType}
        handleClose={() => setShow(false)}
      />
    </>
  );
};

export default Explorer;
