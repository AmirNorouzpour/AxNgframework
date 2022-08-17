import { SharedNgZorroModule } from "./../ng-zorro/shared-ng-zorro.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoadingComponent } from "./components/loading/loading.component";
import { SideMenuComponent } from "./components/side-menu/side-menu.component";
import { GlobalLoadingComponent } from "./components/global-loading/global-loading.component";
import { SharedMaterialModule } from "shared/material/shared-material.module";
import { AxCardComponent } from "./components/ax-card/ax-card.component";
import { WithLoadingPipe } from "./pipes/with-loading.pipe";
import { AxToolbarComponent } from "./components/ax-toolbar/ax-toolbar.component";
import { KeyTolinkPipe } from "./pipes/key-to-link.pipe";
import { RouterModule } from "@angular/router";
import { ColumnPipe } from "./pipes/column-type.pipe";
import { CustomSnackBarComponent } from "./components/custom-snack-bar/custom-snack-bar.component";
import { FormsModule } from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        SharedMaterialModule,
        SharedNgZorroModule,
        FormsModule,
        RouterModule.forChild([]),
    ],
    declarations: [
        LoadingComponent,
        SideMenuComponent,
        GlobalLoadingComponent,
        AxCardComponent,
        WithLoadingPipe,
        AxToolbarComponent,
        KeyTolinkPipe,
        ColumnPipe,
        CustomSnackBarComponent,
    ],
    exports: [
        LoadingComponent,
        SideMenuComponent,
        GlobalLoadingComponent,
        AxCardComponent,
        WithLoadingPipe,
        AxToolbarComponent,
        ColumnPipe,
    ]
})
export class AxCommonModule {}
