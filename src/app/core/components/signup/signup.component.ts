import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  signUp(value){
   this.auth.signUp(value);
 }
}
