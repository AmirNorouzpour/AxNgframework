import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { LoaderState } from "../models";

@Injectable({
  providedIn: "root",
})
export class LoaderService {
  private _loaderSubject = new Subject<LoaderState>();
  public loaderState = this._loaderSubject.asObservable();

  public show() {
    this._loaderSubject.next(<LoaderState>{ show: true });
  }

  public hide() {
    this._loaderSubject.next(<LoaderState>{ show: false });
  }
}
