import { Component, input } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
@Component({
  selector: 'app-worker-time-line',
  imports: [NgxChartsModule],
  templateUrl: './worker-time-line.component.html',
  styleUrl: './worker-time-line.component.scss'
})
export class WorkerTimeLineComponent {

  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = true;
  public showXAxisLabel = true;
  public xAxisLabel = 'Workers';
  public showYAxisLabel = true;
  public yAxisLabel = 'Day';
  public colorScheme = 'cool';
  public single = input();
}
