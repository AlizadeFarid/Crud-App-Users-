import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { MessageType } from 'src/app/models/enums/swal-eunms';
import { UserRequestModel } from 'src/app/models/userRequestModel';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {

  USERS$: Observable<UserRequestModel[]>;
  addUserForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private utilsService: UtilsService,
    public dialogRef: MatDialogRef<UserAddComponent>,

  ) { }

  ngOnInit(): void {
    this.userAddForm();
  }

  //Add User Form
  userAddForm() {
    (this.addUserForm = this.formBuilder.group({
      firstName: [null, [Validators.required, Validators.maxLength(30)]],
      lastName: [null, [Validators.required, Validators.maxLength(40)]],
      gender: [null, [Validators.required]],
      email: [
        null,
        [
          Validators.required,
          Validators.maxLength(30)]
      ],
      phone: [
        null,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(30)]
      ],
      username: [null, [Validators.required, Validators.maxLength(25)]],
      birthday: [null, [Validators.required]],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(16)
        ]
      ],
    }))
  }


  //Create User
  createUser() {
    if (this.addUserForm.valid) {
      let userModel: UserRequestModel = Object.assign(
        {},
        this.addUserForm.value
      );
      this.userService.createUser(userModel).subscribe(
        (res) => {
          if (this.addUserForm.valid) {
            this.USERS$ = this.userService.getAllUsers();
            this.utilsService.swAlert('İstifadəçi əlavə edildi.', {
              messageType: MessageType.Success,
              delay: 5000
            });
            this.dialogRef.close();
          }
        },
        (err) => {
          this.utilsService.swAlert(err?.error.errorCode, {
            messageType: MessageType.Error,
          });
        }

      )
    }
  }

}
