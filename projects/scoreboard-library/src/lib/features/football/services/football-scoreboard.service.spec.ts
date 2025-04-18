import { TestBed } from '@angular/core/testing';
import { FootballScoreboardService } from './football-scoreboard.service';
import { Team } from '../../../core/models/team.interface';
import { Match } from '../models/match.interface';


describe('FootballScoreboardService', () => {
  let service: FootballScoreboardService;
  let mockMatches: Match[] = [];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FootballScoreboardService,{provide: 'matches', useValue: mockMatches}],
    });
    service = TestBed.inject(FootballScoreboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start new match', () => {

    const homeTeamName= "Team A";
    const awayTeamName="Team B";

    const initialActiveMatchesCount =service.getActiveMatches().length;
    service.startNewMatch(homeTeamName,awayTeamName);

    const activeMatches = service.getActiveMatches();
    const currentMatch =activeMatches[activeMatches.length-1];

    expect(currentMatch.homeTeam.name).toBe(homeTeamName)
    expect(currentMatch.awayTeam.name).toBe(awayTeamName)
    expect(currentMatch.homeTeam.score).toBe(0)
    expect(currentMatch.awayTeam.score).toBe(0)
    expect(activeMatches.length).toBe(initialActiveMatchesCount+1)
  });

  
  it('should end the active match', () => {

    const homeTeam : Team= {name:"Team C"};
    const awayTeam: Team= {name:"Team D"};

    service.startNewMatch(homeTeam.name,awayTeam.name);
    const initialActiveMatchesCount =service.getActiveMatches().length;
    service.endMatch(homeTeam,awayTeam);
    const activeMatches = service.getActiveMatches();
    expect(activeMatches.length).toBe(initialActiveMatchesCount-1)
  });

    it('should update match score', () => {
      const homeTeam : Team= {name:"Team C", score: 2};
      const awayTeam: Team= {name:"Team D", score: 3};

    service.startNewMatch(homeTeam.name,awayTeam.name);
    service.updateMatchScore(homeTeam,awayTeam);
    const activeMatches = service.getActiveMatches();
    const updatedMatch = activeMatches.find(match=> match.homeTeam.name === homeTeam.name && match.awayTeam.name === awayTeam.name);
    expect(updatedMatch?.homeTeam.score).toBe(2);
    expect(updatedMatch?.awayTeam.score).toBe(3);
  });


  it('should get the summary of the active matches', () => {
    
    const matches = [
      { homeTeam: "Team A", awayTeam: "Team B", homeTeamScore: 6, awayTeamScore: 4 },
      { homeTeam: "Team C", awayTeam: "Team D", homeTeamScore: 3, awayTeamScore: 4 },
      { homeTeam: "Team E", awayTeam: "Team F", homeTeamScore: 1, awayTeamScore: 3 },
      { homeTeam: "Team G", awayTeam: "Team H", homeTeamScore: 7, awayTeamScore: 3 },
      { homeTeam: "Team I", awayTeam: "Team J", homeTeamScore: 2, awayTeamScore: 3 },
    ];

    const summary = [
      { homeTeam: "Team G", awayTeam: "Team H", homeTeamScore: 7, awayTeamScore: 3 },
      { homeTeam: "Team A", awayTeam: "Team B", homeTeamScore: 6, awayTeamScore: 4 },
      { homeTeam: "Team C", awayTeam: "Team D", homeTeamScore: 3, awayTeamScore: 4 },
      { homeTeam: "Team I", awayTeam: "Team J", homeTeamScore: 2, awayTeamScore: 3 },
      { homeTeam: "Team E", awayTeam: "Team F", homeTeamScore: 1, awayTeamScore: 3 },
    ];
  
    // Start matches and update scores
    for (const match of matches) {
      service.startNewMatch(match.homeTeam, match.awayTeam);
      service.updateMatchScore({name:match.homeTeam,score:match.homeTeamScore}, {name:match.awayTeam,score:match.awayTeamScore});
    }
    const matchSummary = service.getMatchSummary();
  
    // Validate match summary
    for (let i = 0; i < summary.length; i++) {
      const expectedMatch = summary[i];
      const actualMatch = matchSummary[i];
  
      expect(actualMatch.homeTeam.name).toBe(expectedMatch.homeTeam);
      expect(actualMatch.homeTeam.score).toBe(expectedMatch.homeTeamScore);
      expect(actualMatch.awayTeam.name).toBe(expectedMatch.awayTeam);
      expect(actualMatch.awayTeam.score).toBe(expectedMatch.awayTeamScore);
    }
  });

});
