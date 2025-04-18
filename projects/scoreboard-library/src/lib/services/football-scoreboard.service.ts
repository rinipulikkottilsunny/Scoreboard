import { Injectable } from '@angular/core';
import { Match } from '../models/match.interface';

@Injectable({
  providedIn: 'root'
})
export class FootballScoreboardService {

  constructor() { }

  private activeMatches : Match[]=[];

  startNewMatch(homeTeam: string, awayTeam: string) {
    const newMatch={homeTeam,awayTeam,homeTeamScore:0,awayTeamScore:0,startTime:Date.now()}
    this.activeMatches.push(newMatch);
  }

  updateMatchScore(homeTeam: string, awayTeam: string, homeTeamScore: number, awayTeamScore: number) {
    const match =this.activeMatches.find(match => match.homeTeam === homeTeam && match.awayTeam === awayTeam);
    if(match){
      match.homeTeamScore = homeTeamScore;
      match.awayTeamScore = awayTeamScore;
    }
  }

  endMatch(homeTeam: string, awayTeam: string) {
    this.activeMatches=this.activeMatches.filter(match => match.homeTeam !== homeTeam && match.awayTeam !== awayTeam);
  }

  getMatchSummary() : Match[]{

  const sortedMatches = this.activeMatches
  .map(match => ({
    ...match,
    totalScore: match.homeTeamScore + match.awayTeamScore
  }))
  .sort((a, b) =>{
    if(a.totalScore !== b.totalScore) {
      return b.totalScore - a.totalScore;
     }
     else{
      return b.startTime - a.startTime;
     } 
  });
  return sortedMatches;
  }

  getActiveMatches() : Match[]{
    return this.activeMatches;
  }

}
