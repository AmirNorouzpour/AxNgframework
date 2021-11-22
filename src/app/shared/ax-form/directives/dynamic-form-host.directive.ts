import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
  selector: "[ax-dynamic-form]",
})
export class DynamicFormHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
