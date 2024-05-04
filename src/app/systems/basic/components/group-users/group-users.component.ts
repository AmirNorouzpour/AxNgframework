import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { GroupService } from "../../services/group.service";
import { TranslateService } from "@ngx-translate/core";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../../services";
import { SnackBarService } from "shared/services/snack-bar.service";

@Component({
  selector: "app-group-users",
  templateUrl: "./group-users.component.html",
  styleUrl: "./group-users.component.scss",
})
export class GroupUsersComponent implements OnInit {
  columns = [
    {
      title: this.translate.instant("FullName"),
      index: "name",
    },
    {
      title: this.translate.instant("DateTime"),
      index: "insertDateTime",
    },
  ];
  randomUserUrl: any;
  optionList: any[] = [];
  isLoading: boolean;

  constructor(
    public groupService: GroupService,
    public userService: UserService,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private changeDetectorRefs: ChangeDetectorRef,
    private snackBarService: SnackBarService
  ) {}
  listOfData;
  selectedUsers = [];
  isVisible = false;

  ngOnInit(): void {
    this.loadUsers();

    this.isLoading = true;
    this.userService.getList(null, null).subscribe({
      next: (data) => {
        data.data.forEach((item) => {
          this.optionList.push({
            text: item.firstName + " " + item.lastName,
            value: item.id,
          });
        });
        this.isLoading = false;
      },
    });
  }

  loadUsers() {
    var groupId = this.route.snapshot.paramMap.get("groupId");
    this.groupService.getUsersAndGroups([groupId]).subscribe((data) => {
      this.listOfData = data.data;
      this.changeDetectorRefs.detectChanges();
    });
  }

  showModal() {
    this.selectedUsers = [];
    this.isVisible = true;
  }
  handleCancel() {
    this.selectedUsers = [];
    this.isVisible = false;
  }
  handleOk() {
    var groupId = this.route.snapshot.paramMap.get("groupId");
    var data = {
      groupId: parseInt(groupId),
      userIds: this.selectedUsers,
    };
    this.groupService.addUserstoGroup(data).subscribe((result) => {
      this.snackBarService.showSuccessMessage(result.message);
      this.isVisible = false;
      this.loadUsers();
    });
  }

  del(id) {
    this.groupService.removeUserFromGroup([id]).subscribe((result) => {
      // this.snackBarService.showSuccessMessage(result.body.message);
      this.loadUsers();
    });
  }
}
