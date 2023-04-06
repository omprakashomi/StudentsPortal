import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  formGroup!: FormGroup;
  constructor(private authService: AuthServiceService, private _snackBar: MatSnackBar) { }
  ngOnInit(): void {
    this.initForm();
  }
  initForm(){
    this.formGroup = new FormGroup({
      firstName: new FormControl('',[Validators.required]),
      lastName: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    })
  }

  signUpProcess(){
    if(this.formGroup.valid)
      this.authService.signUp(this.formGroup.value).subscribe(result =>{
        if(result.id){
          console.log(result);
          this._snackBar.open("Registration successfully done!", "", {
            duration: 3000
          });
        }
        else{
          this._snackBar.open("Registration failed!", "", {
            duration: 3000
          });
        }
      })
  }

}

