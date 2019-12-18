import { Injectable } from "@angular/core";
import * as Papa from 'papaparse';
import { Player, DataRow } from 'src/app/common/model/interfaces';

@Injectable()
export class CsvParserService {
  public constructor() { }

  /**
   * Service which parses CSV file and returns the list of players
   *
   * @param file : File - CSV file
   */
  public async parseCsvFile(file: File): Promise<Player[]> {
    const generatePlayersFromCsv = (csvData: DataRow[]): Player[] => {
      /**
       * // FIXME:
       * This approach assumes that the correct order of the data in the array is:
       * [timestamp, email, name, skill]
       * Please fix this in the future
       */

      const players: Player[] = csvData.map((row: DataRow) => {
        const [, email, name, skill] = row;
        return { name, email, skill: Number.parseInt(skill) };
      });

      return players;
    }

    // Promise wrapper for PapaParse
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
