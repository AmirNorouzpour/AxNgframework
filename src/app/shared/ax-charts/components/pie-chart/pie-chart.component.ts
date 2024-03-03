import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  Output,
  EventEmitter,
  ViewChild,
} from "@angular/core";
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
} from "ng-apexcharts";
import { PieChart } from "shared/ax-charts/models/pie-chart.model";
import {
  RED_COLOR,
  YELLOW_COLOR,
  ORANGE_COLOR,
  BLUE_COLOR,
  GREEN_COLOR,
} from "./../../utils/chart-color";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: "ax-pie-chart",
  templateUrl: "./pie-chart.component.html",
  styleUrls: ["./pie-chart.component.scss"],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: "ax-pie-chart",
  },
})
export class PieChartComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  @Input() model: PieChart;
  @Input() pieChartType: "pie" | "doughnut" = "pie";
  @Input() showLegend: boolean = true;
  @Input() chartId: number;
  @Output() onClick: EventEmitter<any> = new EventEmitter();

  // public pieChartOptions: ChartOptions = {
  //   responsive: true,
  //   tooltips: {
  //     bodyFontFamily: "Inter",
  //     callbacks: {
  //       label: (item: ChartTooltipItem, data: ChartData) => {
  //         const { index, datasetIndex } = item;
  //         const dataset = data.datasets[datasetIndex].data;
  //         const total = (<number[]>dataset).reduce((acc, curr) => acc + curr);
  //         const value = <number>dataset[index];
  //         const percentage = ((value / total) * 100).toFixed(1);

  //         return `${data.labels[index]} (${percentage}%) : ${value}`;
  //       },
  //     },
  //   },
  //   maintainAspectRatio: false,
  //   legend: {
  //     position: "top",
  //     labels: {
  //       fontFamily: "Inter",
  //     },
  //   },
  // };

  // public pieChartColors: Color[] = [
  //   {
  //     backgroundColor: [
  //       RED_COLOR,
  //       BLUE_COLOR,
  //       GREEN_COLOR,
  //       ORANGE_COLOR,
  //       YELLOW_COLOR,
  //     ],
  //   },
  // ];

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "My-series",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
        },
      ],
      chart: {
        height: 350,
        type: "bar",
      },
      title: {
        text: "My First Angular Chart",
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
        ],
      },
    };
  }

  ngOnInit() {}

  public handleClick({ event, active }): void {
    const index = active[0]["_index"];
    const label = this.model.labels[index];

    this.onClick.emit(label.tag);
  }
}
