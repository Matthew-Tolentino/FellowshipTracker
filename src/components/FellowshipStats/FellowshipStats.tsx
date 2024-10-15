import './FellowshipStats.scss';
import { IFellowship } from "../../Util/Fellowship";

export interface IFellowshipStats { 
  fellowship: IFellowship
}

const FellowshipStats: React.FC<IFellowshipStats> = (({fellowship}) => {
  return (
    <div className="fellowshipStats-container">
      <h1>Fellowship Progress</h1>
      <div className='stats'>
        <span>Day X of 180</span>
        <span>123mi / 1800mi Traveled</span>
      </div>
    </div>
  )
})

export default FellowshipStats;