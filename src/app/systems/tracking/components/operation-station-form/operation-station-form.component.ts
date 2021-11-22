import { ProductLineService } from "./../../services/product-line.service";
import { OperationStationService } from "./../../services/operation-station.service";
import { Component, OnInit, Injector } from "@angular/core";
import { AxForm } from "shared/ax-form";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { FormConfig } from "shared/ax-form/models/form-config";
import { OperationStation } from "../../models/operationStation.model";
import { map } from "rxjs/operators";

@Component({
  selector: "app-operation-station-form",
  templateUrl: "./operation-station-form.component.html",
  styleUrls: ["./operation-station-form.component.scss"],
})
export class OperationStationFormComponent extends AxForm<OperationStation>
  implements OnInit {
  redirectUrl = "/panel/tracking/operationStations";
  editParam = "operationStationId";
  constructor(
    protected httpService: OperationStationService,
    protected productLineService: ProductLineService,
    injector: Injector
  ) {
    super(httpService, injector);
  }

  setModelForCreate(data) {}

  setModelForUpdate(data) {
    const { operationStationDetail } = data || {};
    this.baseFormComponent.model = operationStationDetail;
  }

  getConfig(): FormConfig {
    return {
      title: "ایستگاه کاری جدید",
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
          title: "مشخصات ایستگاه کاری",
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
                  label: "کدایستگاه کاری",
                  required: true,
                },
              },
              {
                key: "order",
                type: "number",
                templateOptions: {
                  type: "number",
                  label: "ترتیب",
                  required: true,
                },
              },
              {
                key: "productLineId",
                type: "select",
                templateOptions: {
                  label: "خط تولید",
                  lazyLoad: true,
                  labelProp: "name",
                  valueProp: "id",
                  required: true,
                  loadData: (searchTerm) => {
                    return this.productLineService
                      .getList(null, {
                        "Filters[0].Property": "name",
                        "Filters[0].Value1": searchTerm,
                        "Filters[0].Operation": 2,
                      })
                      .pipe(map((result) => result.data));
                  },
                },
              },
              {
                key: "isActive",
                type: "checkbox",
                templateOptions: {
                  label: "فعال / غیر فعال",
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
