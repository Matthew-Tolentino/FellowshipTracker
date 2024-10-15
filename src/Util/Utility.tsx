import { Character } from "../Models/Character";
import { Distance } from "../Models/Distance";
import { Member } from "../Models/Member";
import Fellowship from "./Fellowship";

export function filterFellowshipCsv(data: string): Fellowship {
  let fellowship = new Fellowship();

  let lines = data.split('\n');
  lines.forEach((line: string) => {

    let rowarr = line.split(',');

    if (rowarr[0] == 'Start Date')
      fellowship.startDate = new Date(rowarr[1]);
    else if (rowarr[0] == 'End Date')
      fellowship.endDate = new Date(rowarr[1]);
    else if (isCharacter(rowarr[0])) {
      let distances: Distance[] = rowarr.splice(2, rowarr.length).map((dist, i) => {
        return {
          date: addDays(fellowship.startDate, i),
          distance: Number(dist)
        } as Distance;
      });
      let member: Member = {
        name: rowarr[1],
        character:  rowarr[0] as Character,
        distances: distances,
        totalDistance: distances.reduce((p, c, i , a) => {
          return i < a.length - 1 ? p + c.distance : p
        }, 0)
      } as Member;
      fellowship.addMember(member);
    }
  });

  return fellowship;
}

export function isCharacter(value: string): boolean {
  return Object.values(Character).includes(value as Character);
}

export function addDays(date: Date, days: number): Date {
  const newDate = date.setDate(date.getDate() + days);
  return new Date(newDate);
}