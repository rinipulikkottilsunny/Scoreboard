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

    component.startNewMatch(homeTeam,awayTeam);

    const activeMatches = component.getActiveMatches();
    const currentMatch =activeMatches[activeMatches.length-1];

    expect(currentMatch.homeTeam).toBe(homeTeam)
    expect(currentMatch.awayTeam).toBe(awayTeam)
    expect(currentMatch.homeTeamScore).toBe(0)
    expect(currentMatch.awayTeamScore).toBe(0)
  });

  it('should end the active match', () => {
  });

  it('should update match score', () => {
  });

  it('should get the summary of the active matches', () => {
  });
});
