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

  private activeMatches : Match[]=[];

  getActiveMatches() : Match[]{
    return this.activeMatches;
  }
 

  startNewMatch(homeTeam: string, awayTeam: string) {
    const newMatch={homeTeam,awayTeam,homeTeamScore:0,awayTeamScore:0}
    this.activeMatches.push(newMatch);
  }

}
