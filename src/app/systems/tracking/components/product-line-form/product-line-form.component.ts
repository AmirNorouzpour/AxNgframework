import { FactoryService } from "../../services/factory.service";
import { ProductLineService } from "../../services/product-line.service";
import { Component, OnInit, Injector } from "@angular/core";
import { AxForm } from "shared/ax-form";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { FormConfig } from "shared/ax-form/models/form-config";
import { ProductLine } from "../../models/productLine.model";
import { map } from "rxjs/operators";

@Component({
  selector: "app-product-line-form",
  templateUrl: "./product-line-form.component.html",
  styleUrls: ["./product-line-form.component.scss"],
})
export class ProductLineFormComponent extends AxForm<ProductLine>
  implements OnInit {
  redirectUrl = "/panel/tracking/productLines";
  editParam = "productLineId";
  constructor(
    protected httpService: ProductLineService,
    protected factoryService: FactoryService,
    injector: Injector
  ) {
    super(httpService, injector);
  }

  setModelForCreate(data) {}

  setModelForUpdate(data) {
    const { productLineDetail } = data || {};
    this.baseFormComponent.model = productLineDetail;
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
                  label: "کد ایستگاه کاری",
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
                key: "factoryId",
                type: "select",
                templateOptions: {
                  label: "کارخانه",
                  lazyLoad: true,
                  labelProp: "name",
                  valueProp: "id",
                  required: true,
                  loadData: (searchTerm) => {
                    return this.factoryService
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
