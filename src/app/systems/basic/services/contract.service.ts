import { Injectable } from "@angular/core";
import { ApiHttpService, ApiEndpointsService } from "src/app/shared/services";
import { ResourceSerivce } from "./../../../shared/services/api/resource.service";
import { environment } from "environments/environment";
import { Contract } from "../models/contract.model";

@Injectable({
  providedIn: "root",
})
export class ContractService extends ResourceSerivce<Contract> {
  constructor(
    apiHttpService: ApiHttpService,
    apiEndpointsService: ApiEndpointsService
  ) {
    super(apiHttpService, apiEndpointsService, environment.contractsApi);
  }
}
