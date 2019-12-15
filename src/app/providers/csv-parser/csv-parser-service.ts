import { Injectable } from "@angular/core";
import * as Papa from 'papaparse';
import { Player, CsvRow } from 'src/app/common/model/interfaces';

@Injectable()
export class CsvParserService {
  public constructor() { }

  public async parseCsvFile(file: File): Promise<CsvRow[]> {
    return new Promise((resolve, reject) => {
      try {
        Papa.parse(file, {
          complete: (response) => {
            // Get rid of the header files
            const csvData = response.data.slice(1);
            resolve(csvData);
          },
        })
      } catch (error) {
        reject(error);
      }
    });
  }

  public generatePlayersFromCsv(csvData: CsvRow[]): Player[] {
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

    console.log(`Players generated from CSV file: ${JSON.stringify(players, null, 2)}`);
    return players;
  }
}
