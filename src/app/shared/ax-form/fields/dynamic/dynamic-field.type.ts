import { DynamicFieldHostDirective } from "./dynamic-field-host.directive";
import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  ComponentFactoryResolver,
  OnInit,
  ComponentRef,
  AfterViewInit,
} from "@angular/core";
import { FieldType } from "@ngx-formly/core";

@Component({
  selector: "formly-field-nz-dynamic",
  template: `
    <div *ngIf="to.readonly" class="dynamic-field__readonly-overlay"></div>
    <ng-template ax-dynamic-field></ng-template>
  `,
  styleUrls: ["./dynamic-field.type.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldDynamic extends FieldType
  implements OnInit, AfterViewInit {
  @ViewChild(DynamicFieldHostDirective, { static: true })
  dynamicFieldHost: DynamicFieldHostDirective;
  fieldComponentRef: ComponentRef<any>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    super();
  }

  ngOnInit() {
    this.loadComponent();
  }

  ngAfterViewInit() {
    //this.fieldComponentRef.changeDetectorRef.detectChanges();
  }

  ngOnDestroy() {
    if (this.fieldComponentRef) {
      this.fieldComponentRef.destroy();
    }
  }

  loadComponent() {
    if (this.to.component) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
        this.to.component
      );
      const viewContainerRef = this.dynamicFieldHost.viewContainerRef;
      viewContainerRef.clear();
      this.fieldComponentRef = viewContainerRef.createComponent(
        componentFactory
      );

      if(this.to.onInit){
        this.to.onInit({fieldRef: this.fieldComponentRef});
      }
    }
  }
}
