import './FellowshipStats.scss';
import { IFellowship } from "../../Util/Fellowship";
import { GiRing } from "react-icons/gi";
import { dayDiff } from '../../Util/Utility';

export interface IFellowshipStats { 
  fellowship: IFellowship
}

const FellowshipStats: React.FC<IFellowshipStats> = (({fellowship}) => {
  return (
    <div className="fellowshipStats-container">
      <h1>Fellowship Progress</h1>
      <div className='stats'>
        <span>
          Day {Math.floor(dayDiff(fellowship.startDate, new Date()))} of {dayDiff(fellowship.startDate, fellowship.endDate)}
        </span>
        <GiRing />
        <span>{fellowship.getTotalMiles()} mi / {fellowship.goal} mi Traveled</span>
      </div>
    </div>
  )
})

export default FellowshipStats;