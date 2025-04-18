import { Component } from '@angular/core';

interface Match{
  homeTeam: string;
  awayTeam: string;
  homeTeamScore: number;
  awayTeamScore:number;
  startTime:number;
}

@Component({
  selector: 'lib-scoreboardLibrary',
  standalone: true,
  imports: [],
  template: `
    <p>
      scoreboard-library works!
    </p>
  `,
  styles: ``
})
export class ScoreboardLibraryComponent {

  private activeMatches : Match[]=[];

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

  updateMatchScore(homeTeam: string, awayTeam: string, homeTeamScore: number, awayTeamScore: number) {
    const match =this.activeMatches.find(match => match.homeTeam === homeTeam && match.awayTeam === awayTeam);
    if(match){
      match.homeTeamScore = homeTeamScore;
      match.awayTeamScore = awayTeamScore;
    }
  }

  endNewMatch(homeTeam: string, awayTeam: string) {
    this.activeMatches=this.activeMatches.filter(match => match.homeTeam !== homeTeam && match.awayTeam !== awayTeam);
  }

  getActiveMatches() : Match[]{
    return this.activeMatches;
  }
 

  startNewMatch(homeTeam: string, awayTeam: string) {
    const newMatch={homeTeam,awayTeam,homeTeamScore:0,awayTeamScore:0,startTime:Date.now()}
    console.log(Date.now());
    this.activeMatches.push(newMatch);
  }

}
