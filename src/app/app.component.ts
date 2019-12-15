import { Component } from '@angular/core';
import { TeamSorterService } from './providers/team-sorter-service/team-sorter-service';
import { MockDataService } from './providers/mock-data-service/mock-data-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'foosball-tournament-app';

  public constructor(
    private teamSorterService: TeamSorterService,
    private mockDataService: MockDataService,
  ) { }
}
