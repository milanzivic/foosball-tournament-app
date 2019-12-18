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
  public groups: Team[][] = [[], [], [], []];
  public isDone: boolean;
  public generateStarted: boolean;
  public showGenerateTeams: boolean;
  public delay: number = 1000; // Should be editable
  public readonly numOfGroups: number = 4; // Should be editable
  public groupNames: string[];

  public constructor(
    private teamSorterService: TeamSorterService,
  ) {
    this.groupNames = this.generateGroupNames();
  }

  public setPlayers(players: Player[]) {
    this.players = players;
    this.showGenerateTeams = true;
  }

  public generateTeams() {
    if (!this.players.length) {
      alert('Please select CSV or XLSX file first!');
      return;
    }
    this.showGenerateTeams = false;
    this.teams = this.teamSorterService.generateTeams(this.players, this.groupNames);
    this.generateGroups();
  }

  // Move this to separate service...?
  public generateGroups() {
    const teamsToSort = this.teams.slice(0);
    const numOfTeamsInGroups: number = teamsToSort.length / this.numOfGroups;
    const groupArr = _.chunk(teamsToSort, numOfTeamsInGroups);

    const getGroupLength = (): number => {
      return _.flatten(this.groups).length;
    };

    const addToGroups = (groupIndex: number): void => {
      this.groups[groupIndex].push(groupArr[groupIndex].shift());
    };
    const t = setInterval(() => {
      if (this.teams.length === getGroupLength()) {
        clearInterval(t);
        this.isDone = true;
        return;
      }
      addToGroups(getGroupLength() % this.numOfGroups);
    }, this.delay);
  }

  public transformGroupNameToClass(groupName: string): string {
    return groupName.toLowerCase().split(' ').join('-');
  }

  private generateGroupNames(): string[] {
    let asciiValue = 65;
    return Array(this.numOfGroups)
      .fill('')
      .map(() => `Group ${String.fromCharCode(asciiValue++)}`);
  }

}
