import { Component, OnInit } from "@angular/core";
import { AxTableColumnType } from "shared/ax-common/model/ax-table-column-type";
import { User } from "src/app/systems/basic/models/user.model";
import { UserService } from "src/app/systems/basic/services";
import { OperationStation } from "../../models/operationStation.model";
import { OperationStationService } from "../../services/operation-station.service";
import { ProductHistoryService } from "../../services/product-history.service";
import { saveAs } from "file-saver";
import { ProductLineService } from "../../services/product-line.service";
import { ProductLine } from "../../models/productLine.model";
import { Machine } from "../../models/machine.model";
import { MachineService } from "../../services/machine.service";
import { Color } from "ng2-charts";
import {
  BLUE_COLOR,
  GREEN_COLOR,
  ORANGE_COLOR,
  RED_COLOR,
  YELLOW_COLOR,
} from "shared/ax-charts/utils/chart-color";
import { ChartOptions } from "chart.js";

@Component({
  selector: "app-performance-chart",
  templateUrl: "./performance-chart.component.html",
  styleUrls: ["./performance-chart.component.scss"],
})
export class PerformanceChartComponent implements OnInit {
  constructor(
    public productHistoryService: ProductHistoryService,
    public userService: UserService,
    public productLineService: ProductLineService,
    public machineService: MachineService
  ) {}
  options: User[] = [];
  machineOptions: Machine[] = [];
  LinesOptions: ProductLine[] = [];
  code: string;
  user: number;
  machine: number;
  line: number;
  date1: Date;
  date2: Date;
  ngOnInit(): void {
    var users = this.userService.getList();
    users.subscribe((data) => {
      this.options = data.data.map(
        (item) =>
          ({
            id: item.id,
            fullName: item.firstName + " " + item.lastName,
          } as User)
      );
    });

    var lines = this.productLineService.getList();
    lines.subscribe((data) => {
      this.LinesOptions = data.data.map(
        (item) =>
          ({
            id: item.id,
            name: item.name,
          } as ProductLine)
      );
    });

    var machines = this.machineService.getList();
    machines.subscribe((data) => {
      this.machineOptions = data.data.map(
        (item) =>
          ({
            id: item.id,
            name: item.code,
          } as Machine)
      );
    });

    this.model = {
      labels: [],
      datasets: [
        {
          label: "تعداد ",
          data: [],
        },
      ],
    };
    this.barChartOptions = Object.assign({}, this.barChartOptions, {
      animation: {
        duration: 1000,
      },
    });
  }

  public barChartOptions: ChartOptions = {
    responsive: true,
    tooltips: {
      bodyFontFamily: "IranSans",
      titleFontFamily: "IranSans",
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          id: "x",
          ticks: {
            fontFamily: "IranSans",
            minRotation: 45,
          },
        },
      ],
      yAxes: [
        {
          id: "y",
          ticks: {
            fontFamily: "IranSans",
            min: 0,
            stepSize: 10,
          },
        },
      ],
    },
    plugins: {
      datalabels: {
        anchor: "end",
        align: "end",
      },
    },
    legend: {
      labels: {
        fontFamily: "IranSans",
      },
    },
  };

  clear() {
    this.user = null;
    this.date1 = null;
    this.date2 = null;
    this.machine = null;
    this.line = null;
  }
  isLoading = false;
  model = { datasets: [], labels: [] };
  onSearch(value: string): void {}
  filters = {};
  submitForm(): void {
    this.filters = {
      code: this.code,
      userId: this.user,
      date1: this.date1?.toJSON(),
      date2: this.date2?.toJSON(),
      machine: this.machine,
      line: this.line,
    };
    this.isLoading = true;
    this.productHistoryService.chart(this.filters).subscribe((data) => {
      this.model.labels = data.data.labels;
      this.model.datasets = [
        {
          label: data.data.series[0].name,
          data: data.data.series[0].data,
        },
      ];
      this.isLoading = false;
    });
  }
  public barChartColors: Color[] = [
    {
      backgroundColor: BLUE_COLOR,
    },
    {
      backgroundColor: GREEN_COLOR,
    },
    {
      backgroundColor: ORANGE_COLOR,
    },
    {
      backgroundColor: YELLOW_COLOR,
    },
  ];
}
