import { Character } from "../Models/Character";
import { Distance } from "../Models/Distance";
import { Member } from "../Models/Member";
import Fellowship from "./Fellowship";

export function filterFellowshipCsv(data: string): Fellowship {
  let fellowship = new Fellowship();

  let lines = data.split('\n');
  lines.forEach((line: string) => {

    let rowarr = line.split(',');

    // console.log(rowarr);

    if (rowarr[0] == 'Start Date')
        fellowship.startDate = new Date(rowarr[1]);
    else if (rowarr[0] == 'End Date')
      fellowship.endDate = new Date(rowarr[1]);
    else if (isCharacter(rowarr[0].replace(' ', ''))) {
      let distances: Distance[] = rowarr.splice(3, rowarr.length).map((dist, i) => {
        return {
          date: addDays(fellowship.startDate, i),
          distance: Number(dist)
        } as Distance;
      });
      let member: Member = {
        name: rowarr[1],
        character:  rowarr[0] as Character,
        distances: distances,
        portrat: rowarr[2],
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
  const newDate = new Date(date);
  const newDateMs = newDate.setDate(newDate.getDate() + days);
  return new Date(newDateMs);
}

export function dayDiff(start: Date, end: Date): number {
  const diffMs = Math.abs(end.getTime() - start.getTime());
  // Convert ms to day
  const diffDay = diffMs / (24 * 60 * 60 * 1000);

  // console.log(start, end, diffMs, diffDay);

  return diffDay;
}