import { GroupService } from "./services/group.service";
import { GroupFormComponent } from "./components/group-form/group-form.component";
import { GeoTreeComponent } from "./components/geo-tree/geo-tree.component";
import { UserService } from "./services/user.service";
import { UserFormComponent } from "./components/user-form/user-form.component";
import { ServerlogListComponent } from "./components/serverlog-list/serverlog-list.component";
import { Routes } from "@angular/router";
import { UserListComponent } from "./components/user-list/user-list.component";
import { GroupListComponent } from "./components/group-list/group-list.component";
import { AuditListComponent } from "./components/audit-list/audit-list.component";
import { FormMode } from "shared/ax-form/models/form-mode.model";
import { AuthorizationFormComponent } from "./components/authorization-form/authorization-form.component";

export const BasicSystemRoutes: Routes = [
  {
    path: "users",
    data: {
      breadcrumb: "کاربران",
    },
    children: [
      {
        path: "",
        component: UserListComponent,
        data: {
          breadcrumb: null,
        },
      },
      {
        path: "new",
        component: UserFormComponent,
        data: {
          breadcrumb: "کاربر جدید",
          formMode: FormMode.New,
        },
      },
      {
        path: "edit/:userId",
        component: UserFormComponent,
        data: {
          breadcrumb: "ویرایش کاربر",
          formMode: FormMode.Edit,
        },
        resolve: {
          userDetail: UserService,
        },
      },
    ],
  },
  {
    path: "serverLogs",
    data: {
      breadcrumb: "لیست خطا ها",
    },
    children: [
      {
        path: "",
        component: ServerlogListComponent,
        data: {
          breadcrumb: null,
        },
      },
    ],
  },
  {
    path: "groups",
    data: {
      breadcrumb: "لیست گروه ها",
    },
    children: [
      {
        path: "",
        component: GroupListComponent,
        data: {
          breadcrumb: null,
        },
      },
      {
        path: "new",
        component: GroupFormComponent,
        data: {
          breadcrumb: "گروه جدید",
          formMode: FormMode.New,
        },
      },
      {
        path: "edit/:groupId",
        component: GroupFormComponent,
        data: {
          breadcrumb: "ویرایش گروه",
          formMode: FormMode.Edit,
        },
        resolve: {
          groupDetail: GroupService,
        },
      },
    ],
  },
  {
    path: "audits",
    data: {
      breadcrumb: "تاریخچه تغییرات",
    },
    children: [
      {
        path: "",
        component: AuditListComponent,
        data: {
          breadcrumb: null,
        },
      },
    ],
  },
  {
    path: "geo",
    data: {
      breadcrumb: "Geometry Information",
    },
    children: [
      {
        path: "",
        component: GeoTreeComponent,
        data: {
          breadcrumb: null,
        },
      },
    ],
  },
  {
    path: "authorization",
    data: {
      breadcrumb: "حقوق دسترسی",
    },
    children: [
      {
        path: "",
        component: AuthorizationFormComponent,
        data: {
          breadcrumb: null,
          formMode: FormMode.Edit,
        },
      },
    ],
  },
];
