import { LiveChartService } from "./../../services/live-chart.service";
import { ChartService } from "shared/ax-charts/services/chart.service";
import { DashboardChart } from "./../../../ax-dashboard/models/dashboard-chart.model";
import { BehaviorSubject, Subscription } from "rxjs";
import { ProgressSpinnerMode } from "@angular/material/progress-spinner";
import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  OnDestroy,
  ChangeDetectorRef,
} from "@angular/core";

@Component({
  selector: "ax-chart-panel",
  templateUrl: "./chart-panel.component.html",
  styleUrls: ["./chart-panel.component.scss"],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: "ax-chart-panel",
  },
})
export class ChartPanelComponent implements OnInit, OnDestroy {
  @Input() chart: DashboardChart;

  chartModel$: BehaviorSubject<any> = new BehaviorSubject(null);
  loading$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  diameter: number = 32;
  progressMode: ProgressSpinnerMode = "indeterminate";
  liveChartReceivingData: boolean = false;

  private subs: Subscription[] = [];
  timeOuts: NodeJS.Timeout[] = [];

  constructor(
    private chartService: ChartService,
    private liveChartService: LiveChartService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const { id } = this.chart;

    if (this.chart.isLive) {
      this.loadLiveChart();
      this.listenToLiveChartData();
    } else {
      this.loadChart(id);
    }
  }

  ngOnDestroy() {
    this.subs.forEach((x) => x.unsubscribe());
    this.timeOuts.forEach((timeout) => clearTimeout(timeout));
  }

  handleChartClick(chartClickEventArg) {
    if (chartClickEventArg && this.chartModel$.value) {
      this.loadChart(this.chartModel$.value.nextChartId, chartClickEventArg);
    }
  }

  loadChart(id, filter?) {
    this.loading$.next(true);
    this.subs.push(
      this.chartService.getChart<any>(id, filter).subscribe((val) => {
        this.chartModel$.next(val);
        this.chart.title = val.title;
        this.loading$.next(false);
      })
    );
  }

  loadLiveChart() {
    const { id: chartId } = this.chart;
    this.loadChart(chartId, null);
  }

  listenToLiveChartData() {
    this.liveChartService.onDataReceived.subscribe((data) => {
      if (data && data.axChartId === this.chart.id) {
        this.chartModel$.next(data);

        this.liveChartReceivingData = true;
        this.timeOuts.push(
          setTimeout(() => {
            this.liveChartReceivingData = false;
          }, 1000)
        );

        this.cdr.detectChanges();
      }
    });
  }
}
