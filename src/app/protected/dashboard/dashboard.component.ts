import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent  {

  get usuario(){
    return this.authSerive.usuario;
  }



  constructor(private router:Router,
              private authSerive: AuthService) { }

  LogOut(){
    this.router.navigateByUrl('/auth')
    this.authSerive.logOut();
  }

}
