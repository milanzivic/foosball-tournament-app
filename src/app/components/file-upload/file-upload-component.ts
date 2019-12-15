import { Component, Output, EventEmitter } from '@angular/core'
import { CsvParserService } from 'src/app/providers/csv-parser/csv-parser-service';
import { Player, CsvRow } from 'src/app/common/model/interfaces';

@Component({
  selector: 'file-upload',
  templateUrl: 'file-upload-component.html',
})
export class FileUploadComponent {
  private fileToUpload: File;
  @Output() playersEvent = new EventEmitter<Player[]>();

  public constructor(
    private csvParser: CsvParserService,
  ) { }

  public async handleFileInput(files: FileList): Promise<void> {
    this.fileToUpload = files.item(0);
    const csv: CsvRow[] = await this.csvParser.parseCsvFile(this.fileToUpload);
    const players: Player[] = this.csvParser.generatePlayersFromCsv(csv);
    console.log(`List of players: ${JSON.stringify(players, null, 2)}`)
    // Emit the list of players!
    this.playersEvent.emit(players);
  }
}
