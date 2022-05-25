import { PanelModule } from "./panel/panel.module";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule, Injector, Optional } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthModule } from "./auth/auth.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CoreModule } from "./core";
import { SystemsModule } from "./systems/systems.module";
import { registerLocaleData } from "@angular/common";
import { NZ_I18N, fa_IR } from "ng-zorro-antd/i18n";
import fa from "@angular/common/locales/fa";
import { BidiModule } from "@angular/cdk/bidi";
registerLocaleData(fa);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PanelModule,
    AuthModule,
    CoreModule,
    BrowserAnimationsModule,
    SystemsModule,
    BidiModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: fa_IR }],
  bootstrap: [AppComponent],
})
export class AppModule {}
