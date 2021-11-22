import { FormConfig } from "./models/form-config";
import { SnackBarService } from "./../services/snack-bar.service";
import { ActivatedRoute, Router } from "@angular/router";
import { catchError } from "rxjs/operators";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { FormGroup } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";
import { empty } from "rxjs";
import {
  OnInit,
  ViewChild,
  AfterViewInit,
  ComponentRef,
  OnDestroy,
  Injector,
  ComponentFactoryResolver,
  Output,
  EventEmitter,
  Component,
} from "@angular/core";
import { AxFormComponent } from "./components/ax-form/ax-form.component";
import { FormMode } from "./models/form-mode.model";
import { DynamicFormHostDirective } from "./directives/dynamic-form-host.directive";
import { ResourceSerivce } from "shared/services/api/resource.service";
import * as jalaliMoment from "jalali-moment";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";

@Component({
  template: "",
})
export abstract class AxForm<DataModel>
  implements OnInit, AfterViewInit, OnDestroy
{
  baseFormComponent: AxFormComponent<DataModel>;
  baseFormComponentRef: ComponentRef<AxFormComponent<DataModel>>;
  protected formMode: FormMode;
  protected redirectUrl: string;
  protected editParam: string;

  private _route: ActivatedRoute;
  private _snackBar: SnackBarService;
  private _componentFactoryResolver: ComponentFactoryResolver;
  private _router: Router;
  private _dialog: MatDialog;

  @Output() formSaved = new EventEmitter();

  @ViewChild(DynamicFormHostDirective, { static: true })
  formHost: DynamicFormHostDirective;

  constructor(
    protected httpService: ResourceSerivce<DataModel>,
    protected injector: Injector
  ) {}

  protected get route(): ActivatedRoute {
    if (!this._route) {
      this._route = this.injector.get(ActivatedRoute);
    }
    return this._route;
  }

  protected get dialog(): MatDialog {
    if (!this._dialog) {
      this._dialog = this.injector.get(MatDialog);
    }
    return this._dialog;
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.createForm();
    this.initializeFormState();
    this.subscribeToFormEvents();
    this.subscribeToRouteData();
    this.initializeForm();
    this.detectChanges();
  }

  detectChanges() {
    this.baseFormComponentRef.changeDetectorRef.detectChanges();
  }

  ngOnDestroy() {
    if (this.baseFormComponent) {
      this.baseFormComponentRef.destroy();
    }
  }

  public get snackBar(): SnackBarService {
    if (!this._snackBar) {
      this._snackBar = this.injector.get(SnackBarService);
    }
    return this._snackBar;
  }

  public get componentFactoryResolver(): ComponentFactoryResolver {
    if (!this._componentFactoryResolver) {
      this._componentFactoryResolver = this.injector.get(
        ComponentFactoryResolver
      );
    }
    return this._componentFactoryResolver;
  }

  public get router(): Router {
    if (!this._router) {
      this._router = this.injector.get(Router);
    }
    return this._router;
  }

  createForm() {
    let componentFactory =
      this.componentFactoryResolver.resolveComponentFactory<
        AxFormComponent<DataModel>
      >(AxFormComponent);
    let viewContainerRef = this.formHost.viewContainerRef;

    viewContainerRef.clear();

    this.baseFormComponentRef =
      viewContainerRef.createComponent(componentFactory);
    this.baseFormComponent = <AxFormComponent<DataModel>>(
      this.baseFormComponentRef.instance
    );
  }

  initializeFormState() {
    this.formMode = this.route.snapshot.data
      ? this.route.snapshot.data["formMode"]
      : FormMode.New;
  }

  subscribeToFormEvents() {
    this.baseFormComponent.formSubmitted.subscribe(() => {
      if (this.formMode == FormMode.New) {
        this.create();
      } else if (this.formMode == FormMode.Edit) {
        this.update();
      }
    });

    this.baseFormComponent.formCanceled.subscribe(() => {
      this.cancel();
    });
  }

  subscribeToRouteData() {
    if (this.formMode == FormMode.New) {
      this.route.data.subscribe((data) => {
        if (data !== null) {
          this.setModelForCreate(data);
        }
      });
    } else if (this.formMode == FormMode.Edit) {
      this.route.data.subscribe((data) => {
        if (data !== null) {
          this.setModelForUpdate(data);
        }
      });
    }
  }

  setModelForUpdate(data) {}
  setModelForCreate(data) {}

  initializeForm() {
    this.baseFormComponent.form = new FormGroup({});
    this.baseFormComponent.model =
      this.baseFormComponent.model || <DataModel>{};
    this.baseFormComponent.fields = this.getFields();
    this.baseFormComponent.config = this.getConfig();
  }

  getFields(): FormlyFieldConfig[] {
    return [];
  }

  getConfig(): FormConfig {
    return {
      title: "",
      icon: "",
    };
  }

  getFormModel() {
    return this.baseFormComponent.model;
  }

  create() {
    this.httpService
      .create(this.getFormModel())
      .pipe(catchError(this.handleError.bind(this)))
      .subscribe((result) => {
        this.snackBar.showSuccessMessage("با موفقیت ذخیره شد.");
        this.onSaveSuccess();
      });
  }

  onSaveSuccess() {
    if (this.redirectUrl) {
      this.router.navigate([this.redirectUrl]);
    }
  }

  update() {
    this.httpService
      .update(this.getFormModel())
      .pipe(catchError(this.handleError.bind(this)))
      .subscribe((result) => {
        this.snackBar.showSuccessMessage("با موفقیت ذخیره شد");
        this.onSaveSuccess();
      });
  }

  handleError(error: HttpErrorResponse) {
    let me = this;
    if (error.error instanceof ErrorEvent) {
      me.snackBar.showErrorMessage("خطا در ذخیره سازی");
    } else {
      me.snackBar.showErrorMessage("خطا در ذخیره سازی");
    }
    return empty();
  }

  cancel() {
    this.router.navigate([this.redirectUrl]);
  }

  dateTimeParser(value: jalaliMoment.Moment) {
    if (value) {
      return value.toISOString();
    }
  }

  mapObject(object) {
    if (object && object.hasOwnProperty("id")) {
      return object.id;
    }
    return null;
  }
}
