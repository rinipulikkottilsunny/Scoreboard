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
  });

  it('should get the summary of the active matches', () => {
  });
});
