import { Component, OnInit } from '@angular/core';
import { MzModalService, MzToastService } from 'ngx-materialize';
import { RolesService } from '../services/roles.service';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { ModalUserComponent } from '../_childComponents/user/modal-user/modal-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent implements OnInit {

  constructor(
    private rolesService : RolesService, 
    private usersService : UserService, 
    private modalService: MzModalService, 
    private toastService: MzToastService
  ) { }

  users : Array<User>;

  ngOnInit() {
      this.getUsers();
  }
  
  getUsers() {
    this.usersService.getUsers()
    .subscribe((data: any) =>  {
      this.users = data.users;
    });
  }

  public openUserModal() {
    this.modalService.open(ModalUserComponent,{users : this.users});
  }

  deleteUser(id) {
    if(confirm("Удалить?")) {

      let index = undefined;
      this.users.forEach(function(item : User, ind : number) {
        if(item.id == id) {
          index = ind;
        }
    });

      if(index) {
        this.usersService.deleteUser(this.users[index]).subscribe(() => {
          console.log(this.users.length);
          
          this.users.splice(index, 1);
        
          console.log(index);
          console.log(this.users.length);
          this.toastService.show('Deleted', 4000);
        });
      }


    }
  }

}
