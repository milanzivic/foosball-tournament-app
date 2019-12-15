import { Component } from '@angular/core';
import { TeamSorterService } from './providers/team-sorter-service/team-sorter-service';
import { Team, Player } from './common/model/interfaces';
// import { MockDataService } from './providers/mock-data-service/mock-data-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public players: Player[] = [];
  public teams: Team[] = [];
  public flashyTeams: Team[] = [];
  public isDone: boolean = false;


  public constructor(
    private teamSorterService: TeamSorterService,
    // private mockService: MockDataService,
  ) {
    // this.flashyTeams = this.mockService.getMockTeams();
  }

  public setPlayers(players: Player[]) {
    this.players = players;
  }

  public generateTeams() {
    if (!this.players.length) {
      alert('Please select CSV or XLSX file first!');
      return;
    }

    this.teams = this.teamSorterService.generateTeams(this.players);
    this.generateFlashyTeams(this.teams);

  }

  public generateFlashyTeams(teams: Team[], delay: number = 10000) {
    const addToFlashyList = () => {
      this.flashyTeams.unshift(teams[this.flashyTeams.length]);
    };

    addToFlashyList();
    const t = setInterval(() => {
      if (this.flashyTeams.length === teams.length) {
        console.log('Teams generated');
        clearInterval(t);
        this.isDone = true;
        return;
      }
      addToFlashyList();
    }, delay)
  }
}
