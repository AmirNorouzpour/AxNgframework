import { LiveChartService } from "./../ax-charts/services/live-chart.service";
import { DashboardChart } from "./models/dashboard-chart.model";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-ax-dashboard",
  templateUrl: "./ax-dashboard.component.html",
  styleUrls: ["./ax-dashboard.component.scss"],
})
export class AxDashboardComponent implements OnInit, OnDestroy {
  dashboardCharts: DashboardChart[];

  constructor(
    private route: ActivatedRoute,
    private liveChartService: LiveChartService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.dashboardCharts = data.dashboardCharts;
      if (this.dashboardCharts.find((chart) => chart.isLive)) {
        this.liveChartService.listenToUpdateChart();
      }
    });
  }

  ngOnDestroy() {
    this.liveChartService.removeUpdateChartListener();
  }
}
