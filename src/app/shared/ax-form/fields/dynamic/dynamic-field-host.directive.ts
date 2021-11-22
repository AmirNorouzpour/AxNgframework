import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
  selector: "[ax-dynamic-field]",
})
export class DynamicFieldHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
