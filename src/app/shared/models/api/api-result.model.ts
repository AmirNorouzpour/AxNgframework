import { ResponseMetaData } from "./response-meta-data.model";

export interface ApiResult<Resource> {
  data?: Resource;
  isSuccess: string;
  statusCode: string;
  message: string;
  metaData: ResponseMetaData;
}
