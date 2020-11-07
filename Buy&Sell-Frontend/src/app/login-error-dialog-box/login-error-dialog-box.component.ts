import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-error-dialog-box',
  templateUrl: './login-error-dialog-box.component.html',
  styleUrls: ['./login-error-dialog-box.component.css']
})
export class LoginErrorDialogBoxComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  BacktoPage(){
    console.log('dialog box btn pressed');
    this.router.navigate(['/SignupLogin']);
  }

}
