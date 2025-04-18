import { Team } from "../../../core/models/team.interface";
import { Match } from "./match.interface";

export interface Scoreboard {
    startNewMatch(homeTeamName: string, awayTeamName: string): boolean;
    updateMatchScore(homeTeam: Team, awayTeam: Team): boolean;
    endMatch(homeTeamName: string, awayTeamName: string): boolean;
    getMatchSummary(): Match[];
  }