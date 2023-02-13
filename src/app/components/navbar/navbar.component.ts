import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  constructor(public dialog: MatDialog,
              private userService: UserService
  ) { }

  ngOnInit(): void {

  }

  addUserDialog() {
    this.userService.communicationService()
  }


}
