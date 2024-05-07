import { Pipe, PipeTransform } from "@angular/core";
import { AxTableColumnType } from "../model/ax-table-column-type";
import * as moment from "jalali-moment";

const DEFAULT_DATETIME_FORMAT = "YYYY/MM/DD - HH:mm:ss";

@Pipe({
  name: "columnType",
})
export class ColumnPipe implements PipeTransform {
  transform(value, args) {
    const type = args[0];
    const options = args[1];

    const transformFn = getTransformFn(type);
    return transformFn(value, options);
  }
}

const getTransformFn = (type) => {
  switch (type) {
    case AxTableColumnType.Boolean:
      return transformBooleanColumn;
    case AxTableColumnType.DateTime:
      return transformDateTimeColumn;
    case AxTableColumnType.Enum:
      return transformEnumColumn;
    case AxTableColumnType.Text:
    default:
      return trnsformDefaultColumn;
  }
};

const transformBooleanColumn = (value, options) => {
  const { trueCaption, falseCaption } = options || {};
  if (value === true) {
    return trueCaption;
  } else if (value === false) {
    return falseCaption;
  } else {
    return "";
  }
};

const transformDateTimeColumn = (value, options: any = { isJalali: true }) => {
  const { format, isJalali } = options || {};
  const defaultFormat = isJalali
    ? "HH:mm:ss - jYYYY/jMM/jDD "
    : DEFAULT_DATETIME_FORMAT;
  const dateTimeFormat = format || defaultFormat;

  return value
    ? isJalali
      ? moment(value).locale("fa").format(dateTimeFormat)
      : moment(value).format(dateTimeFormat)
    : "";
};

const transformEnumColumn = (value, options) => {
  const { enumDict } = options || {};
  return (enumDict && enumDict[value]) || value;
};

const trnsformDefaultColumn = (value, options) => {
  return value;
};
