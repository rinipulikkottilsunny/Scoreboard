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
  });

  it('should end the active match', () => {
  });

  it('should update match score', () => {
  });

  it('should get the summary of the active matches', () => {
  });
});
