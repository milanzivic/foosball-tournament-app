import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TeamSorterService } from './providers/team-sorter-service/team-sorter-service';
import { MockDataService } from './providers/mock-data-service/mock-data-service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    TeamSorterService,
    MockDataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
