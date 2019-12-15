import { Injectable } from "@angular/core";
import { Player, Team, Bucket } from '../../common/model/interfaces';
import * as _ from 'lodash';
import { generate } from 'rxjs';
import { MockDataService } from '../mock-data-service/mock-data-service';

@Injectable()
export class TeamSorterService {

  public constructor(
    private mockDataService: MockDataService,
  ) { }

  public generateTeams(players: Player[]): Team[] {
    const buckets: Bucket[] = this.splitToBuckets(players);
    const teams: Team[] = this.createTeamsFromBuckets(buckets);

    // Blablabla
    return teams;
  }

  private splitToBuckets(players: Player[], numOfBuckets?: number): Bucket[] {
    if (!Number.isInteger(Math.log2(numOfBuckets))) {
      throw new Error('The number of buckets is not the exponent of 2');
    }

    const bucketSize: number = players.length / numOfBuckets;
    return _.chunk(players, bucketSize);
  }

  private createTeamsFromBuckets(buckets: Bucket[], shuffle: boolean = true, generateFakeName?: boolean) {
    const lowerBuckets: Bucket[] = buckets.slice(0, buckets.length / 2);

    const allTeams: Team[][] = lowerBuckets.map((lowerBucket: Bucket, iLowerBucket: number) => {
      // Get the correspnding upper bucket:
      const iUpperBucket: number = buckets.length - iLowerBucket - 1;
      const upperBucket = buckets[iUpperBucket];

      // Shuffle the buckets:
      const leftShuffle: Bucket = _.shuffle(lowerBucket);
      const rightShuffle: Bucket = _.shuffle(upperBucket);

      const teams: Team[] = leftShuffle.map((playerOne: Player, index: number) => {
        const playerTwo: Player = rightShuffle[index];

        const teamName: string = generateFakeName
          ? this.mockDataService.getMockTeamName()
          : 'Enter team name';

        return { teamName, playerOne, playerTwo };
      });

      return teams;
    });

    // Flatten the teams array and shuffle teams if neccessary
    const response: Team[] = _.flatten((shuffle) ? _.shuffle(allTeams) : allTeams);
    return response;
  }
}
