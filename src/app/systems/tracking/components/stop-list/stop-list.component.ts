import { Component, OnInit } from "@angular/core";
import { AxTableColumnType } from "shared/ax-common/model/ax-table-column-type";
import { MachineService } from "src/app/systems/tracking/services/machine.service";
import { Machine } from "../../models/machine.model";
import { StopService } from "../../services/stop.service";

@Component({
  selector: "app-stop-list",
  templateUrl: "./stop-list.component.html",
  styleUrls: ["./stop-list.component.scss"],
})
export class StopListComponent implements OnInit {
  constructor(
    public stopService: StopService,
    public machineService: MachineService
  ) {}
  columns = [
    {
      title: "ماشین",
      index: "machineName",
    },
    {
      title: "کد توقف",
      index: "code",
    },
    {
      title: "آخرین وضعیت",
      index: "lastStatus",
    },
    {
      title: "زمان",
      type: AxTableColumnType.DateTime,
      index: "insertDateTime",
    },
  ];

  toolbarItems = [
    {
      key: "refresh",
      title: "",
      icon: "reload",
      showAlways: true,
    },
  ];

  ngOnInit(): void {
    var machines = this.machineService.getList();
    machines.subscribe((data) => {
      this.options = data.data.map(
        (item) =>
          ({
            id: item.id,
            name: item.name,
          } as Machine)
      );
    });
  }

  inputValue?: string;
  options: Machine[] = [];
  code: string;
  machine: number;
  date: Date;
  filters = {};

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
  }
  submitForm(): void {
    this.filters = {
      code: this.code,
      date: this.date?.toJSON(),
      machine: this.machine,
    };
  }

  clear() {
    this.code = null;
    this.date = null;
    this.machine = null;
    this.filters = {};
  }
  isLoading = false;
  onSearch(value: string): void {
    this.isLoading = true;
  }
}
