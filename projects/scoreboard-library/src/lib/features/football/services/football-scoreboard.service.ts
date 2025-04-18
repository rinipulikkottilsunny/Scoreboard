import { Inject, Injectable } from '@angular/core';
import { Match } from '../models/match.interface';
import { Scoreboard } from '../models/scoreboard.interface';
import { Team } from '../../../core/models/team.interface';

@Injectable({providedIn: 'root'})
export class FootballScoreboardService implements Scoreboard {

  private activeMatches : Match[]=[];

  constructor() {}

  setActiveMatches(matches: Match[]) {  
    this.activeMatches = matches;
  }

  startNewMatch(homeTeamName: string, awayTeamName: string) : boolean{
    
    if (this.isMatchExists(homeTeamName, awayTeamName)) {
      return false; 
    }
    else{
    const homeTeam : Team = { name: homeTeamName, score: 0 };
    const awayTeam = { name: awayTeamName, score: 0 };
    const newMatch : Match ={homeTeam,awayTeam,startTime:Date.now()}
    this.activeMatches.push(newMatch);
    return true;
    }
  }

  updateMatchScore(homeTeam: Team, awayTeam: Team) : boolean {
    if (this.isMatchExists(homeTeam.name, awayTeam.name)) {
      const match = this.activeMatches.find(match => match.homeTeam.name === homeTeam.name && match.awayTeam.name === awayTeam.name);
      if (match) {
        match.homeTeam.score = homeTeam.score;
        match.awayTeam.score = awayTeam.score;
      }
      return true;
    }
    else{
      return false;
    }
  }

  endMatch(homeTeamName: string, awayTeamName: string)  : boolean {
    if (this.isMatchExists(homeTeamName, awayTeamName)) {
    this.activeMatches=this.activeMatches.filter(match => match.homeTeam.name !== homeTeamName && match.awayTeam.name !== awayTeamName);
    return true;
    }
    else{
      return false;
    }
  }

  getMatchSummary(): Match[] {
    return [...this.activeMatches] 
      .sort((a, b) => {
        const scoreA = a.homeTeam.score + a.awayTeam.score;
        const scoreB = b.homeTeam.score + b.awayTeam.score;
  
        if (scoreA !== scoreB) {
          return scoreB - scoreA;
        } else {
          return b.startTime - a.startTime;
        }
      });
  }

  getActiveMatches() : Match[]{
    return this.activeMatches;
  }

  private isMatchExists(homeTeamName: string, awayTeamName: string): boolean {
    return this.activeMatches.some(match => match.homeTeam.name === homeTeamName && match.awayTeam.name === awayTeamName);
  }

}
