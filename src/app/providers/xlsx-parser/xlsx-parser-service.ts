import { Injectable } from "@angular/core";
import * as XLSX from 'xlsx';
import { XlsxRow, Player } from 'src/app/common/model/interfaces';

@Injectable()
export class XlsxParserService {
  public async parseXlsxFile(file: File): Promise<Player[]> {
    const generatePlayersFromXlsxWorkSheet = (rows: XLSX.WorkSheet): Player[] => {
      /**
       * // FIXME:
       * This approach assumes that the correct order of the data in the object is:
       * { timestamp, email, name, skill }
       * Please fix this in the future
       */
      return rows.map((row: XlsxRow) => {
        const [, email, name, skill] = Object.values(row);
        return { name, email, skill };
      });
    }

    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();

        reader.onload = (event: any) => {
          const data = new Uint8Array(event.target.result);
          const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'array' });
          const rows: XlsxRow[] = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])
          console.log(rows);

          const players: Player[] = generatePlayersFromXlsxWorkSheet(rows);
          resolve(players);
        }
        reader.readAsArrayBuffer(file);
      } catch (error) {
        reject(error);
      }
    });
  }
}
