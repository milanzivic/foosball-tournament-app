import { Component } from '@angular/core';
import { TeamSorterService } from './providers/team-sorter-service/team-sorter-service';
import { MockDataService } from './providers/mock-data-service/mock-data-service';
import { Team, Player } from './common/model/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private players: Player[];
  private teams: Team[];


  public constructor(
    private teamSorterService: TeamSorterService,
    private mockDataService: MockDataService,
  ) { }

  public get Players(): string {
    return JSON.stringify(this.players, null, 2);
  }

  public get Teams(): string {
    return JSON.stringify(this.teams, null, 2);
  }

  public generateMockNames(): void {
    this.players = this.mockDataService.generateMockPlayerList();
  }

  public generateMockTeams(): void {
    this.teams = this.teamSorterService.generateTeams(this.players);
  }

  public getPlayerList(players: Player[]) {
    this.players = players;
  }
}
