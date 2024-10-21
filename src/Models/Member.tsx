import { Character } from "./Character";
import { Distance } from "./Distance";

export interface Member {
  name: string;
  character: Character;
  distances: Distance[];
  totalDistance: number;
  portrat?: string;
}