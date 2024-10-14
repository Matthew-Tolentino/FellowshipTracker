import { Character } from "../Models/Character";
import { Member } from "../Models/Member";

export function filterDataCsv(data: string): Member[] {
  let members: Member[] = [];
  let lines = data.split('\n')
      
  lines.forEach((line: string) => {
    let m = line.split(',').filter(x => x.length > 0);

    if (isCharacter(m[0])) {
      let distances = m.splice(2, m.length).map(s => Number(s));
      let member = {
        name: m[1],
        character: m[0] as Character,
        distances: distances,
        totalDistance: distances.reduce((p, c, i , a) => {
          return i < a.length - 1 ? p + c : p
        }, 0)
      } as Member;

      members.push(member);
    }
  });

  // console.log(members);

  return members;
}

export function isCharacter(value: string): boolean {
  return Object.values(Character).includes(value as Character);
}

export function addDays(date: Date, days: number): Date {
  const newDate = date.setDate(date.getDate() + days);
  return new Date(newDate);
}