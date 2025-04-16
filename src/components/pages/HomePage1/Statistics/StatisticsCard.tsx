import { RightArrow } from "../../../../assets/icons/svgicons";
import "./Statistics.scss";

interface StatisticsCardProps {
  Title: string;
  Value: number | string | undefined;
}

const StatisticsCard = (props: StatisticsCardProps) => {
  return (
    <div className="tvl-card">
      <div className="tvl-card-content">
        <div className="top-section">
          <h2>{props.Value}</h2>
          <RightArrow />
        </div>
        <p>{props.Title}</p>
      </div>
    </div>
  );
};

export default StatisticsCard;
