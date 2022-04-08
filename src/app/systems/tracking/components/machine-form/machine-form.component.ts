import { OperationStationService } from "./../../services/operation-station.service";
import { MachineService } from "./../../services/machine.service";
import { Component, OnInit, Injector } from "@angular/core";
import { AxForm } from "shared/ax-form";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { FormConfig } from "shared/ax-form/models/form-config";
import { Machine } from "../../models/machine.model";
import { map } from "rxjs/operators";

@Component({
  selector: "app-machine-form",
  templateUrl: "./machine-form.component.html",
  styleUrls: ["./machine-form.component.scss"],
})
export class MachineFormComponent extends AxForm<Machine> implements OnInit {
  redirectUrl = "/panel/tracking/machines";
  editParam = "machineId";
  constructor(
    protected httpService: MachineService,
    protected osService: OperationStationService,
    injector: Injector
  ) {
    super(httpService, injector);
  }

  setModelForCreate(data) {}

  setModelForUpdate(data) {
    const { machineDetail } = data || {};
    this.baseFormComponent.model = machineDetail;
  }

  getConfig(): FormConfig {
    return {
      title: "دستگاه جدید",
      icon: "",
    };
  }

  getFields(): FormlyFieldConfig[] {
    const responsiveOption = {
      labelSm: 8,
      controlSm: 16,
    };

    return [
      {
        wrappers: ["card"],
        templateOptions: {
          title: "مشخصات ماشین",
        },
        fieldGroup: [
          {
            wrappers: ["row"],
            templateOptions: {
              colSpan: 8,
              colXs: 24,
              colSm: 24,
              colMd: 12,
              colLg: 6,
              colXl: 6,
              colXXl: 6,
            },
            fieldGroup: [
              {
                key: "name",
                type: "input",
                templateOptions: {
                  type: "text",
                  label: "نام",
                  required: true,
                },
              },
              {
                key: "code",
                type: "input",
                templateOptions: {
                  type: "text",
                  label: "کد ماشین",
                  required: true,
                },
              },
              {
                key: "isActive",
                type: "checkbox",
                templateOptions: {
                  label: "فعال / غیر فعال",
                },
              },
              {
                key: "operationStationId",
                type: "select",
                templateOptions: {
                  label: "ایستگاه کاری",
                  lazyLoad: true,
                  labelProp: "name",
                  valueProp: "id",
                  required: true,
                  loadData: (searchTerm) => {
                    return this.osService
                      .getList(null, {
                        "Filters[0].Property": "name",
                        "Filters[0].Value1": searchTerm,
                        "Filters[0].Operation": 2,
                      })
                      .pipe(map((result) => result.data));
                  },
                },
              },
            ],
          },
        ],
      },
    ];
  }

  ngOnInit(): void {}
}
