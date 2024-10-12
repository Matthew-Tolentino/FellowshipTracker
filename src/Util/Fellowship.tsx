interface IFellowship {
  members: Member[];
}

export interface Member {
  name: string;
  character: Character;
  distances: number[];
  totalDistance: number;
}

export enum Character {
  Frodo = 'Frodo',
  Sam = 'Sam',
  Mary = 'Mary',
  Pippin = 'Pippin',
  Boromir = 'Boromir',
  Aragorn = 'Aragorn',
  Gimli = 'Gimli',
  Legolas = 'Legolas',
  Gandalf = 'Gandalf'
}

class Fellowship {
  members: Member[] = []

  constructor() { }

  addMember(member: Member) {
    this.members.push(member);
  }
}

export default Fellowship;