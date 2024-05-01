import { Subject } from "rxjs";
import { ApiHttpService, ApiEndpointsService } from "src/app/shared/services";
import { ApiResult, ResourceUrlFn } from "shared/models";

export abstract class ResourceSerivce<Resource> {
  public onResourceSaved: Subject<any> = new Subject();

  constructor(
    protected apiHttpService: ApiHttpService,
    protected apiEndpointsService: ApiEndpointsService,
    protected resourceName: string,
    protected resourceFn?: ResourceUrlFn
  ) {}

  getList(parameters?, queryParams?) {
    const { resourceFn, resourceName } = this;
    const { getUrlFn } = resourceFn || {};
    debugger;

    const resourceEndpoint =
      getUrlFn && typeof getUrlFn === "function"
        ? getUrlFn(parameters, queryParams)
        : this.apiEndpointsService.getResourceEndpoint(
            resourceName,
            parameters,
            queryParams
          );

    return this.apiHttpService.get<ApiResult<Resource[]>>(resourceEndpoint);
  }

  protected getById(params) {
    return this.apiHttpService.get<ApiResult<Resource>>(
      this.apiEndpointsService.getResourceEndpoint(this.resourceName, [
        ...params,
      ])
    );
  }

  create(data) {
    const { resourceFn, resourceName } = this;
    const { createUrlFn } = resourceFn || {};

    const resourceEndpoint =
      createUrlFn && typeof createUrlFn === "function"
        ? createUrlFn()
        : this.apiEndpointsService.getResourceEndpoint(resourceName);

    return this.apiHttpService.post(resourceEndpoint, data);
  }

  update(data) {
    const { resourceFn, resourceName } = this;
    const { updateUrlFn } = resourceFn || {};

    const resourceEndpoint =
      updateUrlFn && typeof updateUrlFn === "function"
        ? updateUrlFn()
        : this.apiEndpointsService.getResourceEndpoint(resourceName);

    return this.apiHttpService.put(resourceEndpoint, data);
  }

  delete(id) {
    const { resourceFn, resourceName } = this;
    const { deleteUrlFn } = resourceFn || {};

    const resourceEndpoint =
      deleteUrlFn && typeof deleteUrlFn === "function"
        ? deleteUrlFn([id])
        : this.apiEndpointsService.getResourceEndpoint(resourceName, [id]);

    return this.apiHttpService.delete<ApiResult<Resource[]>>(resourceEndpoint);
  }
}
