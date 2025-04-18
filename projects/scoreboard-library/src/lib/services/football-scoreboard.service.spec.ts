import { TestBed } from '@angular/core/testing';
import { FootballScoreboardService } from './football-scoreboard.service';


describe('FootballScoreboardService', () => {
  let service: FootballScoreboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FootballScoreboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start new match', () => {

    const homeTeam= "Team A";
    const awayTeam="Team B";

    const initialActiveMatchesCount =service.getActiveMatches().length;
    service.startNewMatch(homeTeam,awayTeam);

    const activeMatches = service.getActiveMatches();
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

    service.startNewMatch(homeTeam,awayTeam);
    const initialActiveMatchesCount =service.getActiveMatches().length;
    service.endMatch(homeTeam,awayTeam);
    const activeMatches = service.getActiveMatches();
    expect(activeMatches.length).toBe(initialActiveMatchesCount-1)
  });

    it('should update match score', () => {
    const homeTeam= "Team A";
    const awayTeam="Team B";

    service.startNewMatch(homeTeam,awayTeam);
    service.updateMatchScore(homeTeam,awayTeam,2,3);
    const activeMatches = service.getActiveMatches();
    const updatedMatch = activeMatches.find(match=> match.homeTeam === homeTeam && match.awayTeam === awayTeam);
    expect(updatedMatch?.homeTeamScore).toBe(2);
    expect(updatedMatch?.awayTeamScore).toBe(3);
  });

  it('should get the summary of the active matches', () => {

    service.startNewMatch("Team A","Team B");
    service.updateMatchScore("Team A","Team B",6,4);

    service.startNewMatch("Team C","Team D");
    service.updateMatchScore("Team C","Team D",3,4);

    service.startNewMatch("Team E","Team F");
    service.updateMatchScore("Team E","Team F",1,3);

    service.startNewMatch("Team G","Team H");
    service.updateMatchScore("Team G","Team H",7,3);

    service.startNewMatch("Team I","Team J");
    service.updateMatchScore("Team I","Team J",2,3);

    const matchSummary =service.getMatchSummary();

    expect(matchSummary[0].homeTeam).toBe("Team G")
    expect(matchSummary[0].homeTeamScore).toBe(7)
    expect(matchSummary[0].awayTeam).toBe("Team H")
    expect(matchSummary[0].awayTeamScore).toBe(3)

    expect(matchSummary[1].homeTeam).toBe("Team A")
    expect(matchSummary[1].homeTeamScore).toBe(6)
    expect(matchSummary[1].awayTeam).toBe("Team B")
    expect(matchSummary[1].awayTeamScore).toBe(4)

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
