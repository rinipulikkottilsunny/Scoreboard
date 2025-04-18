import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScoreboardLibraryComponent } from './scoreboard-library.component';


describe('ScoreboardLibrary', () => {
  let component: ScoreboardLibraryComponent;
  let fixture: ComponentFixture<ScoreboardLibraryComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScoreboardLibraryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoreboardLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should start new match', () => {

    const homeTeam= "Team A";
    const awayTeam="Team B";

    const initialActiveMatchesCount =component.getActiveMatches().length;
    component.startNewMatch(homeTeam,awayTeam);

    const activeMatches = component.getActiveMatches();
    const currentMatch =activeMatches[activeMatches.length-1];

    expect(currentMatch.homeTeam).toBe(homeTeam)
    expect(currentMatch.awayTeam).toBe(awayTeam)
    expect(currentMatch.homeTeamScore).toBe(0)
    expect(currentMatch.awayTeamScore).toBe(0)
    expect(activeMatches.length).toBe(initialActiveMatchesCount+1)
  });

  it('should end the active match', () => {

    const homeTeam= "Team A";
    const awayTeam="Team B";

    component.startNewMatch(homeTeam,awayTeam);
    const initialActiveMatchesCount =component.getActiveMatches().length;
    component.endNewMatch(homeTeam,awayTeam);
    const activeMatches = component.getActiveMatches();
    expect(activeMatches.length).toBe(initialActiveMatchesCount-1)
  });

  it('should update match score', () => {
    const homeTeam= "Team A";
    const awayTeam="Team B";

    component.startNewMatch(homeTeam,awayTeam);
    component.updateMatchScore(homeTeam,awayTeam,2,3);
    const activeMatches = component.getActiveMatches();
    const updatedMatch = activeMatches.find(match=> match.homeTeam === homeTeam && match.awayTeam === awayTeam);
    expect(updatedMatch?.homeTeamScore).toBe(2);
    expect(updatedMatch?.awayTeamScore).toBe(3);
  });

  it('should get the summary of the active matches', () => {

    component.startNewMatch("Team A","Team B");
    component.updateMatchScore("Team A","Team B",6,3);

    component.startNewMatch("Team C","Team D");
    component.updateMatchScore("Team C","Team D",3,4);

    component.startNewMatch("Team E","Team F");
    component.updateMatchScore("Team E","Team F",1,3);

    component.startNewMatch("Team G","Team H");
    component.updateMatchScore("Team G","Team H",7,3);

    component.startNewMatch("Team I","Team J");
    component.updateMatchScore("Team I","Team J",2,3);

    const matchSummary =component.getMatchSummary();

    expect(matchSummary[0].homeTeam).toBe("Team G")
    expect(matchSummary[0].homeTeamScore).toBe(7)
    expect(matchSummary[0].awayTeam).toBe("Team H")
    expect(matchSummary[0].awayTeamScore).toBe(3)

    expect(matchSummary[1].homeTeam).toBe("Team A")
    expect(matchSummary[1].homeTeamScore).toBe(6)
    expect(matchSummary[1].awayTeam).toBe("Team B")
    expect(matchSummary[1].awayTeamScore).toBe(3)

    expect(matchSummary[2].homeTeam).toBe("Team C")
    expect(matchSummary[2].homeTeamScore).toBe(3)
    expect(matchSummary[2].awayTeam).toBe("Team D")
    expect(matchSummary[2].awayTeamScore).toBe(4)

    expect(matchSummary[3].homeTeam).toBe("Team I")
    expect(matchSummary[3].homeTeamScore).toBe(2)
    expect(matchSummary[3].awayTeam).toBe("Team J")
    expect(matchSummary[3].awayTeamScore).toBe(3)

    expect(matchSummary[4].homeTeam).toBe("Team E")
    expect(matchSummary[4].homeTeamScore).toBe(1)
    expect(matchSummary[4].awayTeam).toBe("Team F")
    expect(matchSummary[4].awayTeamScore).toBe(3)

  });
});


