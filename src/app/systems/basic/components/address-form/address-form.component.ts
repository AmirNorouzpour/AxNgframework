import { Geo } from "./../../models/geo.model";
import { GeoService } from "./../../services/geo.service";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit, Injector } from "@angular/core";
import { AxForm } from "shared/ax-form";
import { Address } from "../../models/address.model";
import { AddressService } from "../../services/address.service";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { FormConfig } from "shared/ax-form/models/form-config";
import { Location } from "@angular/common";

@Component({
  selector: "app-address-form",
  templateUrl: "./address-form.component.html",
  styleUrls: ["./address-form.component.scss"],
})
export class AddressFormComponent extends AxForm<Address> implements OnInit {
  editParam = "addressId";
  geoList: any[];

  constructor(
    protected httpService: AddressService,
    injector: Injector,
    private location: Location,
    private geoService: GeoService
  ) {
    super(httpService, injector);
  }

  setModelForCreate(data) {
    const userId = this.route.parent.snapshot.params["userId"];
    this.baseFormComponent.model.userId = userId;
    this.baseFormComponent.model.geoId = 1;

    console.log(this.baseFormComponent.model);
  }

  setModelForUpdate(data) {
    const { addressDetail } = data || {};
    this.baseFormComponent.model = addressDetail;
  }

  getConfig(): FormConfig {
    return {
      title: "آدرس جدید",
      icon: "",
    };
  }

  cancel() {
    const userId = this.route.parent.snapshot.params["userId"];
    this.router.navigate([`/panel/basic/users/edit/${userId}`], {
      replaceUrl: true,
    });
  }

  onSaveSuccess() {
    this.httpService.onResourceSaved.next();
    this.location.back();
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
          title: "آدرس کاربر",
        },
        fieldGroup: [
          {
            wrappers: ["row"],
            templateOptions: {
              colSpan: 8,
              colXs: 24,
              colSm: 24,
              colMd: 12,
              colLg: 12,
              colXl: 12,
              colXXl: 12,
            },
            fieldGroup: [
              {
                key: "geoTitle",
                type: "input",
                templateOptions: {
                  type: "text",
                  label: "شهر",
                  required: true,
                },
              },
              {
                key: "geoId",
                type: "cascader",
                templateOptions: {
                  label: "شهر",
                  required: true,
                  options: this.geoList,
                },
              },
              {
                key: "type",
                type: "select",
                templateOptions: {
                  required: true,
                  label: "نوع آدرس",
                  options: [
                    {
                      label: "خانه",
                      value: 0,
                    },
                    {
                      label: "محل کار",
                      value: 1,
                    },
                    {
                      label: "سایر",
                      value: 2,
                    },
                  ],
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
                key: "isMainAddress",
                type: "checkbox",
                templateOptions: {
                  label: "آدرس اصلی",
                },
              },
            ],
          },
          {
            wrappers: ["row"],
            templateOptions: {
              colSpan: 24,
            },
            fieldGroup: [
              {
                key: "content",
                type: "textarea",
                templateOptions: {
                  label: "آدرس",
                },
              },
            ],
          },
          {
            key: "geoId",
            type: "input",
            hide: true,
          },
          {
            key: "userId",
            type: "input",
            hide: true,
          },
        ],
      },
    ];
  }

  ngOnInit(): void {
    this.geoService.getChildren(null).subscribe((result) => {
      console.log(result);
      this.geoList = this.mapGeoChildren(result);
      console.log(this.geoList);
    });
  }

  mapGeoChildren(items) {
    console.log(items);
    return (
      items &&
      items.map((geoItem) => ({
        value: geoItem.key,
        label: geoItem.title,
        isLeaf: geoItem.isLeaf,
        children: !geoItem.isLeaf ? this.mapGeoChildren(geoItem.children) : [],
      }))
    );
  }
}
