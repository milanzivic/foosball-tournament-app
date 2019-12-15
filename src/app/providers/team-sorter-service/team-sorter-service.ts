import { Injectable } from "@angular/core";
import { Player, Team, Bucket } from '../../common/model/interfaces';
import * as _ from 'lodash';
import { MockDataService } from '../mock-data-service/mock-data-service';

@Injectable()
export class TeamSorterService {

  public constructor(
    private mockDataService: MockDataService,
  ) { }

  public generateTeams(players: Player[]): Team[] {
    console.log(`List of players: ${JSON.stringify(players, null, 2)}`);

    // Sort players by ascending skill level
    players.sort((first: Player, second: Player) => first.skill - second.skill);
    console.log(`Sorted players: ${JSON.stringify(players, null, 2)}`);

    const buckets: Bucket[] = this.splitToBuckets(players);
    console.log(`Buckets: ${JSON.stringify(buckets, null, 2)}`);

    const teams: Team[] = this.createTeamsFromBuckets(buckets, true);

    // Blablabla
    return teams;
  }

  private splitToBuckets(players: Player[], numOfBuckets: number = 4): Bucket[] {
    if (!Number.isInteger(Math.log2(numOfBuckets))) {
      throw new Error('The number of buckets is not the exponent of 2');
    }

    const bucketSize: number = players.length / numOfBuckets;
    return _.chunk(players, bucketSize);
  }

  private createTeamsFromBuckets(buckets: Bucket[], shuffle: boolean = true) {
    const lowerBuckets: Bucket[] = buckets.slice(0, buckets.length / 2);

    const allTeams: Team[][] = lowerBuckets.map((lowerBucket: Bucket, iLowerBucket: number) => {
      // Get the correspnding upper bucket:
      const iUpperBucket: number = buckets.length - iLowerBucket - 1;
      const upperBucket = buckets[iUpperBucket];

      console.log(`iLowerBucket: ${iLowerBucket}`);
      console.log(`iUpperBucket: ${iUpperBucket}`);

      // Shuffle the buckets:
      const leftShuffle: Bucket = _.shuffle(lowerBucket);
      const rightShuffle: Bucket = _.shuffle(upperBucket);

      console.log(`leftShuffle: ${JSON.stringify(leftShuffle)}`);
      console.log(`rightShuffle: ${JSON.stringify(rightShuffle)}`);

      const teams: Team[] = leftShuffle.map((lowerPlayer: Player, index: number) => {
        const upperPlayer: Player = rightShuffle[index];

        // Shuffle team members:
        const [playerOne, playerTwo] = _.shuffle([lowerPlayer, upperPlayer])


        const teamName: string = this.mockDataService.getDefaultTeamName(playerOne, playerTwo);

        return { teamName, playerOne, playerTwo };
      });

      console.log(`Teams for lower index ${iLowerBucket} and upper index ${iUpperBucket} => ${JSON.stringify(teams, null, 2)}`);
      return teams;
    });

    // Flatten the teams array and shuffle teams if neccessary
    const response: Team[] = (shuffle) ? _.shuffle(_.flatten(allTeams)) : _.flatten(allTeams);

    console.log(`Final team list: ${JSON.stringify(response, null, 2)}`)
    return response;
  }
}
