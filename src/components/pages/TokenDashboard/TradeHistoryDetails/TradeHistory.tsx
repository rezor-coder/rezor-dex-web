import React, { useEffect, useState } from 'react';
import './history.css';
import { Table } from 'react-bootstrap';
import { useAppSelector } from '../../../../app/hooks';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { FaFilter, FaCopy } from 'react-icons/fa6';
import { LiaSortSolid } from 'react-icons/lia';
import axios from 'axios';
import { NetworkTypes } from '../../../../interfaces/common';
import { useSelector } from 'react-redux';

const TradeHistorySection: React.FC = () => {
    const { theme } = useAppSelector((state) => state.theme);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    const selectedChain: NetworkTypes = useSelector(
        (state: any) => {
            const symbol = state?.user?.chainValues?.symbol;
            return symbol === 'STC' ? 'SBC' : symbol;
        }
    );

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                // const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/coin/transaction/history?chain=stc&symbol=motn&page=1&limit=50`);
                const response = await axios.get("https://api.stage-rezormask.com/api/v1/coin/transaction/history?chain=sbc&symbol=motn&page=1&limit=50")
                setData(response?.data?.data);
            } catch (err) {
                setError('Failed to fetch data. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const columns = [
        { label: 'Date', icon: <RiArrowDropDownLine fontSize={18} fontWeight={600} /> },
        { icon: <FaFilter /> },
        { label: 'Price', icon: <><LiaSortSolid fontSize={13} fontWeight={600} /> <FaFilter /></> },
        { label: 'Price STC', icon: <><LiaSortSolid fontSize={13} fontWeight={600} /> <FaFilter /></> },
        { label: 'Amount Token', icon: <><LiaSortSolid fontSize={13} fontWeight={600} /> <FaFilter /></> },
        { label: 'Maker', icon: <FaFilter /> },
    ];

    const formatMakerAddress = (address: string) => `${address.slice(0, 4)}...${address.slice(-4)}`;

    // const formatDate = (timestamp: number) => new Date(timestamp * 1000).toLocaleString();

    const formatDate = (timestamp: number) => {
        const date = new Date(timestamp * 1000);
        const options: Intl.DateTimeFormatOptions = {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };
        return date.toLocaleDateString('en-US', options).replace(',', '');
    };


    const tableTdColor = theme === "light" ? "lightTd" : "darkTd";

    return (
        <div className="info-section">
            <div className="table-container">
                <Table responsive className={`table ${theme === 'dark' ? 'table-dark' : 'white'}`}>
                    <thead>
                        <tr>
                            {columns.map((col, index) => (
                                <th key={index}>
                                    {col.label && <span>{col.label}</span>} {col.icon}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((row, index) => (
                            <tr key={row.id} className={`tableData ${row.transactionType === "buy" ? "buy-row" : "sell-row"} ${tableTdColor}`}>
                                <td>{formatDate(row.timestamp)}</td>
                                <td className={`pe-4 ${row.transactionType === "buy" ? "BuyColor" : "changeColorOne"}`}>{row.transactionType}</td>
                                <td>${row.tokenPrice.toFixed(6)}</td>
                                <td>{row.amountSTC && Math.abs(row.amountSTC)}</td>
                                <td>{row.amountToken}</td>
                                <td className="changeColorTwo">
                                    {formatMakerAddress(row.maker)} <FaCopy color='#818EA3' />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default TradeHistorySection;
