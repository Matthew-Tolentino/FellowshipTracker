import { start } from "repl";
import { Member } from "../Models/Member";
import { addDays } from "./Utility";

export interface IFellowship {
  members: Member[];
  goal: number; // In miles
  startDate: Date;
  endDate: Date;

  getTotalMiles: Function;
}

class Fellowship implements IFellowship {
  members: Member[] = [];
  goal: number = 1800;
  startDate: Date = new Date();
  endDate: Date = addDays(this.startDate, 365);

  constructor() {
    // console.log(this.members, this.goal, this.startDate, this.endDate)
  }

  addMember(member: Member): void {
    this.members.push(member);
  }

  getTotalMiles(): number {
    return this.members
               .map(m => m.totalDistance)
               .reduce((a, c) => a + c, 0);
  }
}

export default Fellowship;