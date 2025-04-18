import { Component } from '@angular/core';

interface Match{
  homeTeam: string;
  awayTeam: string;
  homeTeamScore: number;
  awayTeamScore:number;
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

  updateMatchScore(homeTeam: string, awayTeam: string, homeTeamScore: number, awayTeamScore: number) {
    const match =this.activeMatches.find(match => match.homeTeam === homeTeam && match.awayTeam === awayTeam);
    if(match){
      match.homeTeamScore = homeTeamScore;
      match.awayTeamScore = awayTeamScore;
    }
  }

  private activeMatches : Match[]=[];

  endNewMatch(homeTeam: string, awayTeam: string) {
    this.activeMatches=this.activeMatches.filter(match => match.homeTeam !== homeTeam && match.awayTeam !== awayTeam);
  }

  getActiveMatches() : Match[]{
    return this.activeMatches;
  }
 

  startNewMatch(homeTeam: string, awayTeam: string) {
    const newMatch={homeTeam,awayTeam,homeTeamScore:0,awayTeamScore:0}
    this.activeMatches.push(newMatch);
  }

}
