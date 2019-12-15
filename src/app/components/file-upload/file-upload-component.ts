import { Component, Output, EventEmitter } from '@angular/core'
import { CsvParserService } from 'src/app/providers/csv-parser/csv-parser-service';
import { Player, CsvRow } from 'src/app/common/model/interfaces';
import { XlsxParserService } from 'src/app/providers/xlsx-parser/xlsx-parser-service';

@Component({
  selector: 'file-upload',
  templateUrl: 'file-upload-component.html',
})
export class FileUploadComponent {
  @Output() playersEvent = new EventEmitter<Player[]>();

  public constructor(
    private csvParser: CsvParserService,
    private xlsxParser: XlsxParserService,
  ) { }

  public async handleFileInput(files: FileList): Promise<void> {
    const file = files.item(0);
    const players: Player[] = await this.parseFile(file);

    // Emit the list of players!
    this.playersEvent.emit(players);
  }


  private async parseFile(file: File) {
    const map = {
      'xlsx': this.xlsxParser.parseXlsxFile,
      'csv': this.csvParser.parseCsvFile,
    }
    const fileExtension = file.name.split('.').slice(-1)[0];

    return await map[fileExtension](file);
  }
}
