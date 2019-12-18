import { Injectable } from '@angular/core';
import { Player, Team } from 'src/app/common/model/interfaces';
import { uniqueNamesGenerator, names, adjectives, colors, animals } from 'unique-names-generator';
import { mockTeams } from './mock-teams';

@Injectable()
export class MockDataService {

  private readonly SKILL_RANGE: number = 10;

  public constructor() { }

  /**
   * Mock method which generates the list of players
   *
   * @param limit: number - num of players generated
   */
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

  /**
   * Mock method which generates fake team names
   */
  public getMockTeamName(): string {
    const teamName: string = uniqueNamesGenerator({
      dictionaries: [colors, animals],
      length: 2,
      separator: ' ',
      style: 'capital',
    });

    return teamName;
  }

  /**
   * Method which returns default team name in format of
   * 'Player One & Player Two'
   *
   * @param one : Player - player one
   * @param two : Player - player two
   */
  public getDefaultTeamName(one: Player, two: Player): string {
    return `${one.name} & ${two.name}`;
  }

  /**
   * Returns preexisting list of mock teams.
   * Useful for UI development, but nothing else
   */
  public getMockTeams(): Team[] {
    return mockTeams;
  }

  /**
   * Mock method which returns fake name
   */
  private getMockPersonName(): string {
    const name: string = uniqueNamesGenerator({
      dictionaries: [adjectives, names],
      length: 2,
      separator: ' ',
      style: 'capital',
    });

    return name;
  }

  /**
   * Mock method which returns fake email address
   * in format of flastname@ztech.io
   */
  private getMockEmail(name: string): string {
    const [first, last] = name.split(' ');
    return `${first.slice(0, 1)[0].toLowerCase()}${last.toLowerCase()}@ztech.io`;
  }
}
