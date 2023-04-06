import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;
  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private _snackBar: MatSnackBar,
    ) { }
  ngOnInit(): void {
    this.initForm();
  }
  initForm(){
    this.formGroup = new FormGroup({
      username: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    })
  }
  LoginProcess(){
    if(this.formGroup.valid)
      this.authService.login(this.formGroup.value).subscribe(result =>{
        if(result.authToken){
          console.log(result);
          // alert("Login Successful !!");
          console.log(result);
          this._snackBar.open("Login successfully done!", "", {
            duration: 3000
          });
          localStorage.setItem('user', JSON.stringify(result.appUser));
          localStorage.setItem('token', JSON.stringify(result.authToken));
          const userRole=this.authService.getUserRole();
          if (userRole=="ROLE_ADMIN") {
            this.router.navigateByUrl('/admin');
            // window.location.href="/admin";
          }
         } else{
          this._snackBar.open("Login failed!", "", {
            duration: 3000
          });
        }
      }
    )
  }
}


