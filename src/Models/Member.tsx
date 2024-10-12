import { Character } from "./Character";

export interface Member {
  name: string;
  character: Character;
  distances: number[];
  totalDistance: number;
}