import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAuthService } from '../shared/admin-auth-service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.css',
})
export class AdminLogin {
  loginForm: any;
  visible: any;
  userSubmit: any;
  passSubmit: any;
  loginError: any;

  constructor(
    private builder: FormBuilder,
    private auth: AdminAuthService,
    private router: Router,
  ){}

  ngOnInit(): void {
    this.userSubmit = true
    this.passSubmit = true
    this.visible = false
    this.loginForm = this.builder.group({
      user: ['', Validators.required],
      pass: ['', Validators.required]
    });
    this.formControls['user'].valueChanges.subscribe(() => this.validateField('user'));
    this.formControls['pass'].valueChanges.subscribe(() => this.validateField('pass'));
  }

  validateField(controlName: 'user' | 'pass'): void {
    const control = this.formControls[controlName]
    
    if (control.valid) {
      if (controlName === 'user') {
        this.userSubmit = true
      } else if (controlName === 'pass') {
        this.passSubmit = true
      }
    }
  }

    changeVisibility() {
    this.visible = !this.visible
  }

  login(event: Event) {
    
    event.preventDefault()
    this.loginForm.markAllAsTouched()

    this.userSubmit = true
    this.passSubmit = true

    const userControl = this.formControls['user']
    const passControl = this.formControls['pass']

    let isFormValid = true  

    if (userControl.invalid) {
      this.userSubmit = false
      isFormValid = false
    } 

    if (passControl.invalid) {
      this.passSubmit = false
      isFormValid = false
    }

    if (!isFormValid) {
      console.log('Hiányos adatok!')
      return; 
    }

    console.log(this.loginForm.value)
    const user = this.loginForm.value.user
    const pass = this.loginForm.value.pass
    if(user=='admin' && pass=='admin') {
      console.log('belépés ok...')
      
      this.auth.loginSuccess()
      localStorage.setItem('isLoggedIn', 'true')
      this.router.navigate(['/navbar'])
    } else {
      this.loginError = true
      console.log('Hibás felhasználónév vagy jelszó!')
    }     
    event.preventDefault()
  }

  get formControls() {
    return this.loginForm.controls;
  }
}
