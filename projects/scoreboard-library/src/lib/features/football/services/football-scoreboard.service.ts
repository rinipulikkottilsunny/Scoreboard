import { Inject, Injectable } from '@angular/core';
import { Match } from '../models/match.interface';
import { Scoreboard } from '../models/scoreboard.interface';
import { Team } from '../../../core/models/team.interface';

@Injectable({
  providedIn: 'root'
})
export class FootballScoreboardService implements Scoreboard {

  private activeMatches : Match[]=[];

  constructor(@Inject('matches') private matches: Match[]) {
    this.activeMatches = matches;
  }

  startNewMatch(homeTeamName: string, awayTeamName: string) {
    const homeTeam : Team = { name: homeTeamName, score: 0 };
    const awayTeam = { name: awayTeamName, score: 0 };
    const newMatch : Match ={homeTeam,awayTeam,startTime:Date.now()}
    console.log("New Match",newMatch)
    console.log("New Match",newMatch)
    console.log("New Match",newMatch)
    console.log("New Match",newMatch)
    this.activeMatches.push(newMatch);
  }

  updateMatchScore(homeTeam: Team, awayTeam: Team) {
    const match =this.activeMatches.find(match => match.homeTeam.name === homeTeam.name && match.awayTeam.name === awayTeam.name);
    if(match){
      match.homeTeam = homeTeam;
      match.awayTeam = awayTeam;
    }
  }

  endMatch(homeTeam: Team, awayTeam: Team) {
    this.activeMatches=this.activeMatches.filter(match => match.homeTeam.name !== homeTeam.name && match.awayTeam.name !== awayTeam.name);
  }

  getMatchSummary() : Match[]{
  const sortedMatches = this.activeMatches
  .map(match => ({
    ...match,
    totalScore: (match.homeTeam.score||0) + (match.awayTeam.score||0)
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
