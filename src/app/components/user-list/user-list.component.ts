import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map, Observable } from 'rxjs';
import { UserRequestModel } from 'src/app/models/userRequestModel';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';
import Swal from 'sweetalert2';
import { UserAddComponent } from '../user-add/user-add.component';
import { UserEditComponent } from '../user-edit/user-edit.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  USERS$: Observable<UserRequestModel[]>;
  filterText: string = '';

  constructor(
    private userService: UserService,
    private utilsService: UtilsService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.USERS$ = this.userService.getAllUsers();
    this.userService.callUserAdd.subscribe(() => {
      this.addUserDialog();
    });
  }

  filterChanged(data) {
    this.filterText = data;
    this.USERS$ = this.userService.getAllUsers().pipe(map(data => data.filter(res => {
      if (this.filterText != '') {
        return (
          res.firstName.toLocaleLowerCase().includes(this.filterText) ||
          res.lastName.toLocaleLowerCase().includes(this.filterText) ||
          res.email.toLocaleLowerCase().includes(this.filterText)) 
      }
      return true;
    })))
  }


  addUserDialog() {
    this.dialog.open(UserAddComponent, {
    })
      .afterClosed()
      .subscribe(response => {
        this.USERS$ = this.userService.getAllUsers();
      });;
  }

  editUserDialog(userId: number) {
    this.dialog.open(UserEditComponent, {
      data: { id: userId }
    })
      .afterClosed()
      .subscribe(response => {
        this.USERS$ = this.userService.getAllUsers();
      });;
  }


  //Delete User
  deleteUser(id: number) {
    this.utilsService.swDialog(
      {
        confirmDialogTitle: `İstifadəçi silindi.`,
      },
      () => {
        this.userService.deleteUser(id).subscribe((data) => {
          this.USERS$ = this.userService.getAllUsers();
        })
      }
    );
  }
}
