import { ApiEndpointsService } from "./api/api-endpoints.service";
import { ApiHttpService } from "./api/api-http.service";
import { Injectable, EventEmitter } from "@angular/core";
import * as signalR from "@microsoft/signalr";
import { environment } from "environments/environment";
import { ReplaySubject } from "rxjs";
import { ApiResult } from "shared/models";
import { SnackBarService } from "./snack-bar.service";

@Injectable({
  providedIn: "root",
})
export class SignalRService {
  onDataReceived: EventEmitter<any> = new EventEmitter();
  connectionEstablished: ReplaySubject<string> = new ReplaySubject<string>();

  private connectionId: string;
  private hubConnection: signalR.HubConnection;

  constructor(
    private httpService: ApiHttpService,
    private apiEndPointService: ApiEndpointsService
  ) {
    this.buildConnection();
    this.startConnection();

    this.hubConnection.onclose(() => {
      setTimeout(() => {
        console.log("reconnect!");
        this.startConnection();
      }, 5000);
    });
  }

  private buildConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.signalREndPoint)
      .build();
  }

  private startConnection() {
    console.log("connection state on start: ", this.hubConnection.state);

    if (this.hubConnection.state == signalR.HubConnectionState.Disconnected) {
      this.hubConnection
        .start()
        .then(() => this.getConnectionId())
        .then((connectionId) => this.setUserConnectionId(connectionId))
        .then((connectionId) => {
          this.connectionEstablished.next(connectionId);
          this.connectionId = connectionId;
        })
        .catch((err) => {
          console.log("Error while starting connection: " + err);
          console.log("connection state: ", this.hubConnection.state);
          this.hubConnection.stop().then();

          // if (
          //   this.hubConnection.state == signalR.HubConnectionState.Connected
          // ) {
          //   this.hubConnection.stop().then();
          // } else {
          //   setTimeout(
          //     function () {
          //       this.startConnection();
          //     }.bind(this),
          //     5000
          //   );
          // }
        });
    }
  }

  private getConnectionId() {
    return this.hubConnection.invoke("getConnectionId");
  }

  private setUserConnectionId(connectionId) {
    return new Promise<string>((resolve, reject) => {
      this.httpService
        .post<ApiResult<any>>(
          this.apiEndPointService.getSetUserConnectionIdEndPoint(),
          {
            connectionId: connectionId,
          }
        )
        .subscribe((result) => result?.isSuccess && resolve(connectionId));
    });
  }

  private disbaleUserConnectionId(connectionId) {
    return this.httpService.post<ApiResult<any>>(
      this.apiEndPointService.getDisableUserConnectionIdEndPoint(),
      {
        connectionId: connectionId,
      }
    );
  }

  public stopConnection() {
    const { connectionId } = this;
    return this.hubConnection
      .stop()
      .then(() => this.disbaleUserConnectionId(connectionId));
  }

  public addListener(methodName, eventEmmiter: EventEmitter<any>) {
    this.hubConnection.on(methodName, (data) => {
      // console.log(data);
      eventEmmiter.emit(data);
    });
  }

  public removeListener(methodName) {
    this.hubConnection.off(methodName);
  }
}
