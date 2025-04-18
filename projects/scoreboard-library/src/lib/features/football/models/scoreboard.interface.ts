import { Team } from "../../../core/models/team.interface";
import { Match } from "./match.interface";

export interface Scoreboard {
    startNewMatch(homeTeam: string, awayTeam: string): void;
    updateMatchScore(homeTeam: Team, awayTeam: Team): void;
    endMatch(homeTeam: Team, awayTeam: Team): void;
    getMatchSummary(): Match[];
    getActiveMatches(): Match[];
  }