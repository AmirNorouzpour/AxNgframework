import { Component, ViewEncapsulation } from "@angular/core";
import { FieldType } from "@ngx-formly/core";
import { NzUploadChangeParam } from "ng-zorro-antd/upload";

@Component({
  selector: "formly-field-file",
  styleUrls: ["./file.type.scss"],
  template: `
    <nz-upload
      [nzAction]="to.action"
      [nzListType]="to.listType || 'text'"
      [nzShowUploadList]="to.showUploadList || true"
      (nzChange)="handleChange($event)"
      [nzBeforeUpload]="to.beforeUpload"
      [nzCustomRequest]="to.customRequest"
      [nzShowButton]="to.showButton || true"
      [nzDirectory]="to.uploadDirectory"
      [nzMultiple]="to.multiple || false"
      [nzLimit]="to.limit || 0"
      [nzSize]="to.limitFileSize || 0"
      [nzFileType]="to.fileType"
      [nzDownload]="to.onDownload"
      [nzRemove]="to.onRemove"
      [nzPreview]="to.onPreview"
      [(nzFileList)]="to.fileList"
    >
      <ng-container *ngIf="!to.listType || to.listType === 'text'">
        <button nz-button><i nz-icon nzType="upload"></i>{{ to.title }}</button>
      </ng-container>

      <ng-container
        *ngIf="!to.avatarUrl && to.listType && to.listType !== 'text'"
      >
        <i
          class="upload-icon"
          nz-icon
          [nzType]="to.loading ? 'loading' : 'plus'"
        ></i>
        <div class="ant-upload-text">{{ to.title }}</div>
      </ng-container>
      <img *ngIf="to.avatarUrl" [src]="to.avatarUrl" style="width: 100%" />
    </nz-upload>
  `,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: "ax-file-field",
  },
})
export class FormlyFieldFile extends FieldType {
  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status !== "uploading") {
      if (this.to.onChange) {
        this.to.onChange(info.file);
      }
    }
  }
}
