import { Component, OnInit, Input } from '@angular/core';
import { MzBaseModal, MzToastService } from 'ngx-materialize';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { RolesService } from 'src/app/services/roles.service';
import { Role } from 'src/app/models/role';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.sass']
})
export class ModalUserComponent extends MzBaseModal implements OnInit {

  constructor(
    private usersService : UserService, 
    private toastService: MzToastService,
    private rolesService: RolesService
  ) {
    super();
  }

  roles : Array<Role>;

  @Input() user: User = {
    id: 0,
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
    api_token: "",
  };

  @Input() users : Array<User>;

  ngOnInit() {

    let vv = this;
    setTimeout(function() {
      vv.getRoles();
    },10);

    this.form = new FormGroup({
      firstname : new FormControl("", Validators.required),
      lastname : new FormControl("", Validators.required),
      email : new FormControl("", Validators.required),
      role_id : new FormControl("", Validators.required),
      password : new FormControl("", Validators.required),
      
    });
    
  }

  form : FormGroup;

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }


  getRoles() {
    this.rolesService.getRoles()
    .subscribe((data: Array<Role>) =>  {
      this.roles = data;
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.user = Object.assign(this.form.value);
    this.storeUser();
  }

  storeUser () {
    this.usersService.storeUser(this.user).subscribe((data) => {
      this.toastService.show('Saved', 4000);
      this.users.push(this.user);
      this.modalComponent.closeModal();
    });
  }

}
