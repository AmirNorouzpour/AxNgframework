import { FormMode } from "./../../../../shared/ax-form/models/form-mode.model";
import { UserService } from "./../../services/user.service";
import { Component, OnInit, Injector, ChangeDetectorRef } from "@angular/core";
import { AxForm } from "shared/ax-form";
import { User } from "../../models";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { FormConfig } from "shared/ax-form/models/form-config";
import { AddressListComponent } from "../address-list/address-list.component";
import { TranslateService } from "@ngx-translate/core";
import { of } from "rxjs";

@Component({
  selector: "app-user-form",
  templateUrl: "./user-form.component.html",
  styleUrls: ["./user-form.component.scss"],
})
export class UserFormComponent extends AxForm<User> implements OnInit {
  redirectUrl = "/panel/basic/users";
  editParam = "userId";

  constructor(
    protected httpService: UserService,
    injector: Injector,
    private translator: TranslateService,
    private cdr: ChangeDetectorRef
  ) {
    super(httpService, injector);
  }

  setModelForCreate(data) {}

  setModelForUpdate(data) {
    const { userDetail } = data || {};
    this.baseFormComponent.model = userDetail;
  }
  getConfig(): FormConfig {
    return {
      title: "کاربر جدید",
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
          title: "مشخصات کاربر",
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
                key: "test",
                type: "select",
                templateOptions: {
                  label: "تست",
                  lazyLoad: true,
                  groupProp: "groupLabel",
                  required: true,
                  loadData: (searchTerm) => {
                    const { form } = this.baseFormComponent;
                    const firstName = form.get("firstName").value;
                    const lastName = form.get("lastName").value;

                    form.get("firstName").valueChanges.subscribe((value) => {
                      this.cdr.detectChanges();
                    });

                    return of([
                      {
                        value: "1",
                        label: firstName + lastName,
                      },
                      {
                        value: "2",
                        label: firstName,
                      },
                    ]);
                  },
                },
              },
              {
                key: "firstName",
                type: "input",
                templateOptions: {
                  type: "text",
                  label: "نام",
                  required: true,
                },
              },
              {
                key: "lastName",
                type: "input",
                templateOptions: {
                  type: "text",
                  label: "نام خانوادگی",
                  required: true,
                },
              },
              {
                key: "birthDate",
                type: "datetime",
                templateOptions: {
                  label: "تاریخ تولد",
                },
              },
              {
                key: "genderType",
                type: "radio",
                templateOptions: {
                  required: true,
                  label: "جنسیت",
                  options: [
                    {
                      label: "مرد",
                      value: 1,
                    },
                    {
                      label: "زن",
                      value: 2,
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
      {
        wrappers: ["card"],
        templateOptions: {
          title: "اطلاعات حساب کاربری",
        },
        fieldGroup: [
          {
            validators: {
              validation: [
                {
                  name: "fieldMatch",
                  options: { errorPath: "passwordConfirm" },
                },
              ],
            },
            wrappers: ["row"],
            templateOptions: {
              colXs: 24,
              colSm: 24,
              colMd: 12,
            },
            fieldGroup: [
              {
                key: "userName",
                type: "input",
                templateOptions: {
                  type: "text",
                  readonly: this.formMode === FormMode.Edit,
                  label: "نام کاربری",
                  required: true,
                },
              },
              {
                key: "expireDateTime",
                type: "datetime",
                templateOptions: {
                  label: "تاریخ اعتبار حساب",
                },
              },
              {
                key: "password",
                type: "input",
                hide: this.formMode === FormMode.Edit,
                templateOptions: {
                  type: "password",
                  required: true,
                  label: "رمز عبور",
                },
              },
              {
                key: "passwordConfirm",
                type: "input",
                hide: this.formMode === FormMode.Edit,
                templateOptions: {
                  type: "password",
                  required: true,
                  label: "تکرار رمز عبور",
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
      {
        wrappers: ["card"],
        templateOptions: {
          title: "تصویر کاربر",
        },
        fieldGroup: [
          {
            key: "file1",
            type: "file",
            templateOptions: {
              action:
                "http://2.188.160.254/services/api/v1/users/UploadUserPic/1",
              title: "بارگذاری تصویر",
              listType: "picture-card",
              showUploadList: false,
              // customRequest: (item) => {
              //   const formData: FormData = new FormData();
              //   formData.append("Image", item.file, item.file.name);

              //   debugger;
              // },
            },
          },
        ],
      },
      {
        type: "dynamic-field",
        templateOptions: {
          component: AddressListComponent,
          title: "آدرس ها",
          readonly: this.formMode === FormMode.New,
        },
      },
    ];
  }

  ngOnInit(): void {}
}
