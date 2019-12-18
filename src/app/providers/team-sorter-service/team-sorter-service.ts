import { Injectable } from "@angular/core";
import { Player, Team, Bucket } from '../../common/model/interfaces';
import * as _ from 'lodash';
import { MockDataService } from '../mock-data-service/mock-data-service';

@Injectable()
export class TeamSorterService {

  public constructor(
    private mockDataService: MockDataService,
  ) { }

  /**
   * Method which generates teams sorted to groups
   *
   *
   *
   *
   *
   *
   * @param players : Player[] - list of all players
   * @param groupNames : string[] - list of group names - Group A, Group B...
   */
  public generateTeams(players: Player[], groupNames: string[]): Team[] {
    // console.log(`List of players: ${JSON.stringify(players, null, 2)}`);

    // Sort players by ascending skill level
    players.sort((first: Player, second: Player) => first.skill - second.skill);
    // console.log(`Sorted players: ${JSON.stringify(players, null, 2)}`);

    const buckets: Bucket[] = this.splitToBuckets(players);
    // console.log(`Buckets: ${JSON.stringify(buckets, null, 2)}`);

    const teams: Team[] = this.createTeamsFromBuckets(buckets, groupNames);

    return teams;
  }

  /**
   * This method takes the list of players, sorts them by skill and splits them into buckets.
   * Number of buckets is by default 4 and it can only be the exponent of 2.
   *
   * @param players : Player[] - number of players
   * @param numOfBuckets : number - number of buckets, must be an exponent of 2
   */
  private splitToBuckets(players: Player[], numOfBuckets: number = 4): Bucket[] {
    if (!Number.isInteger(Math.log2(numOfBuckets))) {
      throw new Error('The number of buckets is not the exponent of 2');
    }

    const bucketSize: number = players.length / numOfBuckets;
    return _.chunk(players, bucketSize);
  }

  /**
   * This method takes in the buckets of playes and matches them inwards,
   * e.g. if there are 4 buckets then the players from the bucket 1 are matched with bucket 4
   * and from the bucket 2 with the bucket 3. Buckets, order of players in teams and the
   * final list are shuffled in progress in order to create randomness.
   *
   * @param buckets : Bucket[] - buckets
   * @param groupNames : string[] - names of groups
   */
  private createTeamsFromBuckets(buckets: Bucket[], groupNames: string[]) {
    const lowerBuckets: Bucket[] = buckets.slice(0, buckets.length / 2);

    const allTeams: Team[][] = lowerBuckets.map((lowerBucket: Bucket, iLowerBucket: number) => {
      // Get the corresponding upper bucket:
      const iUpperBucket: number = buckets.length - iLowerBucket - 1;
      const upperBucket = buckets[iUpperBucket];

      // Shuffle the buckets:
      const leftShuffle: Bucket = _.shuffle(lowerBucket);
      const rightShuffle: Bucket = _.shuffle(upperBucket);

      const teams: Team[] = this.generateTeamsFromBuckets(leftShuffle, rightShuffle);

      return teams;
    });

    // Flatten the teams array and shuffle teams
    const shuffledTeams: Team[] = _.shuffle(_.flatten(allTeams));

    // Assign groups to teams
    const finalTeams: Team[] = this.assignTeamsToGroups(shuffledTeams, groupNames);

    return finalTeams;
  }

  /**
   * Match player from first with the player from the second bucket.
   *
   * @param leftShuffle : Bucket - lower bucket
   * @param rightShuffle : Bucket - upper bucket
   */
  private generateTeamsFromBuckets(leftShuffle: Bucket, rightShuffle: Bucket): Team[] {
    return leftShuffle.map((lowerPlayer: Player, index: number) => {
      const upperPlayer: Player = rightShuffle[index];

      // Shuffle team members:
      const [playerOne, playerTwo] = _.shuffle([lowerPlayer, upperPlayer]);
      const teamName: string = this.mockDataService.getDefaultTeamName(playerOne, playerTwo);

      return { teamName, playerOne, playerTwo };
    });
  }

  /**
   * Assign teams to the groups
   *
   * @param shuffledTeams: Team[] - list of teams
   * @param groupNames: string[] - group names
   */
  private assignTeamsToGroups(shuffledTeams: Team[], groupNames: string[]): Team[] {
    return shuffledTeams.map((team: Team, index: number) => {
      const groupIndex = Math.floor(index / 6);
      return Object.assign({}, team, { group: groupNames[groupIndex] });
    });
  }
}
