import { Injectable } from "@angular/core";
import * as Papa from 'papaparse';
import { Player, CsvRow } from 'src/app/common/model/interfaces';

@Injectable()
export class CsvParserService {
  public constructor() { }

  public async parseCsvFile(file: File): Promise<Player[]> {
    const generatePlayersFromCsv = (csvData: CsvRow[]): Player[] => {
      /**
       * // FIXME:
       * This approach assumes that the correct order of the data in the array is:
       * [timestamp, email, name, skill]
       * Please fix this in the future
       */

      const players: Player[] = csvData.map((row: CsvRow) => {
        const [, email, name, skill] = row;
        return { name, email, skill: Number.parseInt(skill) };
      });

      return players;
    }

    return new Promise((resolve, reject) => {
      try {
        Papa.parse(file, {
          complete: (response) => {
            // Get rid of the header files
            const csvData = response.data.slice(1);
            const players: Player[] = generatePlayersFromCsv(csvData);
            resolve(players);
          },
        })
      } catch (error) {
        reject(error);
      }
    });
  }
}
