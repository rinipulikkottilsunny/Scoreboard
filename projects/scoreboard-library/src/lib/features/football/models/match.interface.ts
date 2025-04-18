import { Team } from "../../../core/models/team.interface";

export interface Match{
  homeTeam: Team;
  awayTeam: Team;
  startTime:number;
}
