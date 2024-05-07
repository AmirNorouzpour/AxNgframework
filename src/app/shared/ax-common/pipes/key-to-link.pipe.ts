import { Pipe, PipeTransform } from "@angular/core";

const keyLinkMap = {
  "010201": "/panel/basic/users",
  "010211": "/panel/basic/authorization",
  "010101": "/panel/basic/serverLogs",
  "010206": "/panel/basic/groups",
  "010102": "/panel/basic/audits",
  "010501": "/panel/basic/geo",
  "010701": "/panel/basic/contracts",
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
