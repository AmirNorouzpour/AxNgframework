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
      breadcrumb: "Users",
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
          breadcrumb: "New User",
          formMode: FormMode.New,
        },
      },
      {
        path: "edit/:userId",
        component: UserFormComponent,
        data: {
          breadcrumb: "Edit User",
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
      breadcrumb: "Exceptions",
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
      breadcrumb: "Groups",
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
          breadcrumb: "New Group",
          formMode: FormMode.New,
        },
      },
      {
        path: "edit/:groupId",
        component: GroupFormComponent,
        data: {
          breadcrumb: "Edit Group",
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
      breadcrumb: "Audit Histories",
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
      breadcrumb: "Authorization Management",
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
