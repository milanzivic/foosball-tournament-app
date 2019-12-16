import { Injectable } from '@angular/core';
import { Player, Team } from 'src/app/common/model/interfaces';
import { uniqueNamesGenerator, names, adjectives, colors, animals } from 'unique-names-generator';
import { mockTeams } from './mock-teams';

@Injectable()
export class MockDataService {

  private readonly SKILL_RANGE: number = 10;

  public constructor() { }

  public generateMockPlayerList(limit: number = 48): Player[] {
    const players: Player[] = new Array(limit)
      .fill(null)
      .map(() => {
        const name: string = this.getMockPersonName();
        const email = this.getMockEmail(name);
        const skill = Math.ceil(this.SKILL_RANGE * Math.random());

        return { name, email, skill };
      });

    return players;
  }

  public getMockTeamName(): string {
    const teamName: string = uniqueNamesGenerator({
      dictionaries: [colors, animals],
      length: 2,
      separator: ' ',
      style: 'capital',
    });

    return teamName;
  }

  public getDefaultTeamName(one: Player, two: Player): string {
    return `${one.name} & ${two.name}`;
  }

  public getMockTeams(): Team[] {
    return mockTeams;
  }

  private getMockPersonName(): string {
    const name: string = uniqueNamesGenerator({
      dictionaries: [adjectives, names],
      length: 2,
      separator: ' ',
      style: 'capital',
    });

    return name;
  }

  private getMockEmail(name: string): string {
    const [first, last] = name.split(' ');
    return `${first.slice(0, 1)[0].toLowerCase()}${last.toLowerCase()}@ztech.io`;
  }
}
