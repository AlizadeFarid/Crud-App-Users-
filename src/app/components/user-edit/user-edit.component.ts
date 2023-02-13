import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { MessageType } from 'src/app/models/enums/swal-eunms';
import { UserRequestModel } from 'src/app/models/userRequestModel';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  USERS$: Observable<UserRequestModel[]>; //Burdaki USERS$ llerin user-list component ts dekinden elaqesi yoxdu. Dialog baglanandan sonra user list component.ts deki Usersler yenilenmelidi.
  ////Umumiyyetce burda USerlere ehtiyac yoxdu Indi qalir Nece hell elemek olar. Qo baxim hele bir sey aglima gelmiyib
  editUserForm: FormGroup;
  id: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    public utilsService: UtilsService,
    public dialogRef: MatDialogRef<UserEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.id = this.data.id
  }

  ngOnInit(): void {
    this.createEditUserForm();
    this.getUserById();
  }


  //Create Edit User
  createEditUserForm() {
    this.editUserForm = this.formBuilder.group({
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
    });
  }

  //Get User ById
  getUserById() {
    if (this.id) {
      this.userService.getUserById(this.id).subscribe(
        (res) => {
          if (res) {
            this.editUserForm.patchValue({
              firstName: res.firstName,
              lastName: res.lastName,
              gender: res.gender,
              email: res.email,
              phone: res.phone,
              username: res.username,
              birthday: res.birthday,
              password: res.password
            });
          }
        }
      );
    }

  }


  //Edit User
  editUser() {
    this.editUserForm.markAllAsTouched();
    if (this.editUserForm.valid) {
      let userModel: UserRequestModel = Object.assign(
        {},
        this.editUserForm.value
      );
      this.userService.editUser(userModel, this.id).subscribe(
        (res) => {
          this.utilsService.swAlert('İstifadəçi məlumatları dəyişdirildi.', {
            messageType: MessageType.Success,
            delay: 5000
          });
          this.dialogRef.close();
          
        },
        (err) => {
          this.utilsService.swAlert(err?.error.errorCode, {
            messageType: MessageType.Error,
          });
        }
      );
    }
  }
}
