import { start } from "repl";
import { Member } from "../Models/Member";
import { addDays } from "./Utility";

export interface IFellowship {
  members: Member[];
  goal: number; // In miles
  startDate: Date;
  endDate: Date;
}

class Fellowship implements IFellowship {
  members: Member[] = [];
  goal: number = 1800;
  startDate: Date = new Date();
  endDate: Date = addDays(this.startDate, 365);

  constructor() {
    console.log(this.members, this.goal, this.startDate, this.endDate)
  }

  addMember(member: Member) {
    this.members.push(member);
  }
}

export default Fellowship;