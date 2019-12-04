import { Injectable } from "@angular/core";
import { Player, Team, Bucket } from '../../common/model/interfaces';
import _ from 'lodash';

@Injectable()
export class TeamSorterService {

  public constructor() {

  }

  public generateTeams(players: Player[]): Team[] {
    const buckets: Bucket[] = this.splitToBuckets(players);
  }

  private splitToBuckets(players: Player[], numOfBuckets?: number): Bucket[] {
    if (!Number.isInteger(Math.log2(numOfBuckets))) {
      throw new Error('The number of buckets is not the exponent of 2');
    }

    const bucketSize: number = players.length / numOfBuckets;
    return _.chunk(players, bucketSize);
  }
}
