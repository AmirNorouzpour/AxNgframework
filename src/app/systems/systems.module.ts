import { TrackingSystemModule } from "./tracking/tracking-system.module";
import { NgModule } from "@angular/core";
import { BasicSystemModule } from "./basic/basic-system.module";

@NgModule({
  declarations: [],
  imports: [BasicSystemModule, TrackingSystemModule],
  exports: [BasicSystemModule, TrackingSystemModule],
})
export class SystemsModule {}
