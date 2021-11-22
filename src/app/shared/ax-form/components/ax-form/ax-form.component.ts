import { FormConfig } from "./../../models/form-config";
import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  ViewChild,
  TemplateRef,
} from "@angular/core";
import { FormGroup, FormGroupDirective } from "@angular/forms";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "ax-form",
  templateUrl: "./ax-form.component.html",
  styleUrls: ["./ax-form.component.scss"],
})
export class AxFormComponent<DataModel> implements OnInit {
  @Input() form: FormGroup;
  @Input() model: DataModel = <DataModel>{};
  @Input() fields: FormlyFieldConfig[];
  @Input() config: FormConfig;

  @Output() formSubmitted = new EventEmitter();
  @Output() formCanceled = new EventEmitter();

  @ViewChild("axForm") axForm: FormGroupDirective;

  defaultWrapperCls = "";

  constructor(private cdr: ChangeDetectorRef, public dialog: MatDialog) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  submit() {
    this.axForm.ngSubmit.emit();
    this.formSubmitted.emit();
  }

  cancel(e) {
    e.preventDefault();
    this.formCanceled.emit();
  }
}
