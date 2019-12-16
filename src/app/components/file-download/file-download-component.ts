import { Component, Input } from "@angular/core";
import { Team } from 'src/app/common/model/interfaces';
import { XlsxParserService } from 'src/app/providers/xlsx-parser/xlsx-parser-service';

@Component({
  selector: 'file-download',
  templateUrl: 'file-download-component.html',
})
export class FileDownloadComponent {
  @Input() public isDone: boolean;
  @Input() public teams: Team[];

  public constructor(
    private xlsxService: XlsxParserService
  ) { }

  public initDownload() {
    this.xlsxService.downloadXlsxFile(this.teams);
  }
}
