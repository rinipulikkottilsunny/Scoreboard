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

  private currentMatch : Match={
    homeTeam: '',
    awayTeam: '',
    homeTeamScore: 0,
    awayTeamScore: 0
  };

  getCurrentMatch() : Match{
    return this.currentMatch;
  }
 

  startNewMatch(homeTeam: string, awayTeam: string) {
    this.currentMatch={homeTeam,awayTeam,homeTeamScore:0,awayTeamScore:0}
  }

}
