import { TestBed } from '@angular/core/testing';
import { FootballScoreboardService } from './football-scoreboard.service';
import { Team } from '../../../core/models/team.interface';
import { Match } from '../models/match.interface';


describe('FootballScoreboardService', () => {
  let service: FootballScoreboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FootballScoreboardService],
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
    const ismatchCreated = service.startNewMatch(homeTeamName,awayTeamName);

    const activeMatches = service.getActiveMatches();
    const currentMatch =activeMatches[activeMatches.length-1];

    expect(currentMatch.homeTeam.name).toBe(homeTeamName)
    expect(currentMatch.awayTeam.name).toBe(awayTeamName)
    expect(currentMatch.homeTeam.score).toBe(0)
    expect(currentMatch.awayTeam.score).toBe(0)
    expect(activeMatches.length).toBe(initialActiveMatchesCount+1)
    expect(ismatchCreated).toBe(true);
    console.log("active matches",service.getMatchSummary());
  });

  
  it('should end the active match', () => {

    const homeTeamName= "Team A";
    const awayTeamName="Team B";

    service.startNewMatch(homeTeamName,awayTeamName);
    const initialActiveMatchesCount =service.getActiveMatches().length;
    service.endMatch(homeTeamName,awayTeamName);
    const activeMatches = service.getActiveMatches();
    expect(activeMatches.length).toBe(initialActiveMatchesCount-1)
  });

    it('should update match score', () => {

      const homeTeam : Team= {name:"Team E", score: 2};
      const awayTeam: Team= {name:"Team F", score: 3};

    service.startNewMatch(homeTeam.name,awayTeam.name);
    service.updateMatchScore(homeTeam,awayTeam);
    const activeMatches = service.getActiveMatches();
    const updatedMatch = activeMatches.find(match=> match.homeTeam.name === homeTeam.name && match.awayTeam.name === awayTeam.name);
    expect(updatedMatch?.homeTeam.score).toBe(2);
    expect(updatedMatch?.awayTeam.score).toBe(3);
  });


  it('should get the summary of the active matches', () => {
    const matches : Match[] =[
      {homeTeam: {name: "Team A",score:6},awayTeam: {name: "Team B",score: 4},startTime: 1745009359889},
      {homeTeam: {name: "Team C",score:3},awayTeam: {name: "Team D",score: 4},startTime: 1745009359890},
      {homeTeam: {name: "Team E",score:1},awayTeam: {name: "Team F",score: 3},startTime: 1745009359891},
      {homeTeam: {name: "Team G",score:2},awayTeam: {name: "Team H",score: 3},startTime: 1745009359892},
      {homeTeam: {name: "Team I",score:7},awayTeam: {name: "Team J",score: 3},startTime: 1745009359893},
    ]
    
  
    service.setActiveMatches(matches);

    const summary = [
      { homeTeam: "Team I", awayTeam: "Team J", homeTeamScore: 7, awayTeamScore: 3 },
      { homeTeam: "Team A", awayTeam: "Team B", homeTeamScore: 6, awayTeamScore: 4 },
      { homeTeam: "Team C", awayTeam: "Team D", homeTeamScore: 3, awayTeamScore: 4 },
      { homeTeam: "Team G", awayTeam: "Team H", homeTeamScore: 2, awayTeamScore: 3 },
      { homeTeam: "Team E", awayTeam: "Team F", homeTeamScore: 1, awayTeamScore: 3 },
    ];
    
    const matchSummary = service.getMatchSummary();

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
