import { Pipe, PipeTransform } from "@angular/core";

const keyLinkMap = {
  "010201": "/panel/basic/users",
  "010211": "/panel/basic/authorization",
  "010101": "/panel/basic/serverLogs",
  "010206": "/panel/basic/groups",
  "010102": "/panel/basic/audits",
  "010501": "/panel/basic/geo",
  "020101": "/panel/tracking/factories",
  "020102": "/panel/tracking/productLines",
  "020103": "/panel/tracking/machines",
  "020104": "/panel/tracking/operationStations",
  "020105": "/panel/tracking/shifts",
  "020106": "/panel/tracking/personnels",
  "020201": "/panel/tracking/productInstances",
  "020202": "/panel/tracking/productInstanceHistories",
};

@Pipe({
  name: "keyToLink",
})
export class KeyTolinkPipe implements PipeTransform {
  transform(val) {
    const link = keyLinkMap[val];
    return link ? link : "";
  }
}
