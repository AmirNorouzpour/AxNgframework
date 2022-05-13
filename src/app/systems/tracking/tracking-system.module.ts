import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { SharedModule } from "./../../shared";
import { FactoryListComponent } from "./components/factory-list/factory-list.component";
import { ProductLineListComponent } from "./components/product-line-list/product-line-list.component";
import { MachineListComponent } from "./components/machine-list/machine-list.component";
import { OperationStationListComponent } from "./components/operation-station-list/operation-station-list.component";
import { ShiftListComponent } from "./components/shift-list/shift-list.component";
import { PersonnelListComponent } from "./components/personnel-list/personnel-list.component";
import { FactoryFormComponent } from "./components/factory-form/factory-form.component";
import { MachineFormComponent } from "./components/machine-form/machine-form.component";
import { ProductLineFormComponent } from "./components/product-line-form/product-line-form.component";
import { OperationStationFormComponent } from "./components/operation-station-form/operation-station-form.component";
import { PersonnelFormComponent } from "./components/personnel-form/personnel-form.component";
import { ShiftFormComponent } from "./components/shift-form/shift-form.component";
import { ProductInstanceListComponent } from "./components/product-instance-list/product-instance-list.component";
import { ProductHistoryListComponent } from "./components/product-history-list/product-history-list.component";
import { DamagedListComponent } from './components/damaged-list/damaged-list.component';
import { StopListComponent } from './components/stop-list/stop-list.component';

@NgModule({
  declarations: [
    FactoryListComponent,
    ProductLineListComponent,
    MachineListComponent,
    OperationStationListComponent,
    ShiftListComponent,
    PersonnelListComponent,
    FactoryFormComponent,
    MachineFormComponent,
    ProductLineFormComponent,
    OperationStationFormComponent,
    PersonnelFormComponent,
    ShiftFormComponent,
    ProductInstanceListComponent,
    ProductHistoryListComponent,
    DamagedListComponent,
    StopListComponent,
  ],
  imports: [SharedModule, RouterModule.forChild([])],
})
export class TrackingSystemModule {}
