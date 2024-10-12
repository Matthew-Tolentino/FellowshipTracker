import { Member } from "../Models/Member";

interface IFellowship {
  members: Member[];
}

class Fellowship {
  members: Member[] = []

  constructor() { }

  addMember(member: Member) {
    this.members.push(member);
  }
}

export default Fellowship;