import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TeamSorterService } from './providers/team-sorter-service/team-sorter-service';
import { MockDataService } from './providers/mock-data-service/mock-data-service';
import { FileUploadComponent } from './components/file-upload/file-upload-component';
import { CsvParserService } from './providers/csv-parser/csv-parser-service';

@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    TeamSorterService,
    MockDataService,
    CsvParserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
