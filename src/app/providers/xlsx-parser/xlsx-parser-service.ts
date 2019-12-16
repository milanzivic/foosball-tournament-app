import { Injectable } from "@angular/core";
import * as XLSX from 'xlsx';
import { XlsxRow, Player, Team, DataRow } from 'src/app/common/model/interfaces';

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
          const rows: XlsxRow[] = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);

          const players: Player[] = generatePlayersFromXlsxWorkSheet(rows);
          resolve(players);
        }
        reader.readAsArrayBuffer(file);
      } catch (error) {
        reject(error);
      }
    });
  }

  public downloadXlsxFile(teams: Team[]): void {
    const rows: DataRow[] = this.generateDataRowsFromTeams(teams);
    const worksheet = XLSX.utils.aoa_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet);
    XLSX.writeFile(workbook, 'teams.xlsx');
  }

  private generateDataRowsFromTeams(teams: Team[]): DataRow[] {
    const headers: DataRow = [
      'Team Name',
      'Player One', 'Player One Email', 'Player One Skill',
      'Player Two', 'Player Two Email', 'Player Two Skill',
    ];

    const flatTeams: DataRow[] = teams.map((team: Team) => {
      const {
        teamName,
        playerOne: {
          name: playerOneName,
          email: playerOneEmail,
          skill: playerOneSkill,
        },
        playerTwo: {
          name: playerTwoName,
          email: playerTwoEmail,
          skill: playerTwoSkill,
        },
      } = team;

      return [
        teamName,
        playerOneName, playerOneEmail, playerOneSkill.toString(),
        playerTwoName, playerTwoEmail, playerTwoSkill.toString(),
      ];
    });

    return [headers, ...flatTeams];
  }
}
