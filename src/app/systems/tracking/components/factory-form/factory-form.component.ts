import { FactoryService } from "./../../services/factory.service";
import { Component, OnInit, Injector } from "@angular/core";
import { AxForm } from "shared/ax-form";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { FormConfig } from "shared/ax-form/models/form-config";
import { Factory } from "../../models/factory.model";

@Component({
  selector: "app-factory-form",
  templateUrl: "./factory-form.component.html",
  styleUrls: ["./factory-form.component.scss"],
})
export class FactoryFormComponent extends AxForm<Factory> implements OnInit {
  redirectUrl = "/panel/tracking/factories";
  editParam = "factoryId";
  constructor(protected httpService: FactoryService, injector: Injector) {
    super(httpService, injector);
  }
  setModelForCreate(data) {}

  setModelForUpdate(data) {
    const { factoryDetail } = data || {};
    this.baseFormComponent.model = factoryDetail;
  }

  getConfig(): FormConfig {
    return {
      title: "کارخانه جدید",
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
          title: "مشخصات کارخانه",
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
                  label: "کد کارخانه",
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
            ],
          },
        ],
      },
    ];
  }

  ngOnInit(): void {}
}
