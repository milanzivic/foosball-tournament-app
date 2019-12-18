import { Component } from '@angular/core';
import { TeamSorterService } from './providers/team-sorter-service/team-sorter-service';
import { Team, Player } from './common/model/interfaces';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public players: Player[] = [];
  public teams: Team[] = [];
  public groups: Team[][];
  public isDone: boolean = false;
  public showGenerateTeams: boolean = true;
  public delay: number = 1000;


  public constructor(
    private teamSorterService: TeamSorterService,
  ) {
    this.groups = [[], [], [], []];
  }

  public setPlayers(players: Player[]) {
    this.players = players;
  }

  public generateTeams() {
    if (!this.players.length) {
      alert('Please select CSV or XLSX file first!');
      return;
    }
    this.showGenerateTeams = false;
    this.teams = this.teamSorterService.generateTeams(this.players);
    this.generateGroups(this.teams);
  }

  // FIXME: This code is badddd
  public generateGroups(teams: Team[]) {
    const teamsToSort = this.teams.slice(0);
    const [groupA, groupB, groupC, groupD] = _.chunk(teamsToSort, 6);
    const groupArr = [groupA, groupB, groupC, groupD];

    const getGroupLength = () => {
      return _.flatten(this.groups).length;
    }

    const addToGroups = (groupIndex: number): void => {
      this.groups[groupIndex].push(groupArr[groupIndex].pop());
    };

    addToGroups(0);
    const t = setInterval(() => {
      if (teams.length === getGroupLength()) {
        clearInterval(t);
        this.isDone = true;
        return;
      }
      addToGroups(getGroupLength() % 4);
    }, this.delay)
  }
}
