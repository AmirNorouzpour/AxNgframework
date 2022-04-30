import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { UserListComponent } from "./components/user-list/user-list.component";
import { SharedModule } from "./../../shared";
import { GroupListComponent } from "./components/group-list/group-list.component";
import { ServerlogListComponent } from "./components/serverlog-list/serverlog-list.component";
import { AuditListComponent } from "./components/audit-list/audit-list.component";
import { AuthorizationFormComponent } from "./components/authorization-form/authorization-form.component";
import { GeoFormComponent } from "./components/geo-form/geo-form.component";
import { GroupFormComponent } from "./components/group-form/group-form.component";
import { GroupUsersFormComponent } from "./components/group-users-form/group-users-form.component";
import { UserFormComponent } from "./components/user-form/user-form.component";
import { GeoTreeComponent } from "./components/geo-tree/geo-tree.component";
import { AddressListComponent } from "./components/address-list/address-list.component";
import { AddressFormComponent } from "./components/address-form/address-form.component";
import { AuthorizationTreeComponent } from "./components/authorization-tree/authorization-tree.component";
import { ChangePasswordComponent } from './components/change-password/change-password.component';

@NgModule({
  declarations: [
    UserListComponent,
    GroupListComponent,
    ServerlogListComponent,
    AuditListComponent,
    AuthorizationFormComponent,
    GeoFormComponent,
    GroupFormComponent,
    GroupUsersFormComponent,
    UserFormComponent,
    GeoTreeComponent,
    AddressListComponent,
    AddressFormComponent,
    AuthorizationTreeComponent,
    ChangePasswordComponent,
  ],
  imports: [SharedModule, RouterModule.forChild([])],
})
export class BasicSystemModule {}
