import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreboardLibraryComponent } from './scoreboard-library.component';

describe('ScoreboardLibraryComponent', () => {
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
