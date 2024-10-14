import { start } from "repl";
import { Member } from "../Models/Member";
import { addDays } from "./Utility";

interface IFellowship {
  members: Member[];
  goal: number; // In miles
  startDate: Date;
  targetDate: Date;
}

class Fellowship implements IFellowship {
  members: Member[] = [];
  goal: number = 1800;
  startDate: Date = new Date();
  targetDate: Date = addDays(this.startDate, 365);

  constructor() {
    console.log(this.members, this.goal, this.startDate, this.targetDate)
  }

  addMember(member: Member) {
    this.members.push(member);
  }
}

export default Fellowship;