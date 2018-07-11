import { UserDTO } from './../../models/user.dto';
import { SignupService } from './../../services/domain/signup.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ZipcodeService } from '../../services/zipcode.service';
import { ToastrService } from 'ngx-toastr';
import { StateService } from '../../services/state.service';
import { StateDTO } from '../../models/state.dto';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private zipcodeService: ZipcodeService,
    private toastrService: ToastrService,
    private stateService: StateService,
    private signupService: SignupService,
  ) { }

  formGroup: FormGroup;
  zipcode: string;
  states: StateDTO[] = [];
  phone: string;
  maskPhone: string = '(000) 00000-0000';
  user: UserDTO;

  ngOnInit() 
  {
    this.initForm();
    this.getState();
  };

  initForm()
  {
    this.formGroup = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email, Validators.maxLength(80)]],
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(80)]],
      password_confirmation: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(80)]],
      phone: [null, [Validators.required, Validators.minLength(11)]],
      address: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      city: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      state: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      zipcode: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
    }, {validator: this.matchingPasswords('password', 'password_confirmation')});
  };

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        this.formGroup.controls.password_confirmation.setErrors({"notEqual": true})
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

  back()
  {
    this.router.navigate(['login']);
  };

  getZipcode()
  {
    if(this.zipcode == null)
    {
      return;
    };
    this.zipcodeService.getZipcodeAPI(this.zipcode)
      .subscribe(response => {
        if(response['erro'] !== true)
        {
          this.formGroup.controls.address.setValue(response.logradouro +' - '+ response.bairro);
          this.formGroup.controls.city.setValue(response.localidade);
          this.formGroup.controls.state.setValue(response.uf);
          this.formGroup.controls.zipcode.setValue(response.cep);
        }
        else
        {
          this.toastrService.error('O CEP '+ this.zipcode +' não foi encontrado ', 'CEP inválido', {
            timeOut: 3000,
          });
        };
      }, error => {
        this.formGroup.controls.address.setValue(null);
        this.formGroup.controls.city.setValue(null);
        this.formGroup.controls.state.setValue(null);
        this.formGroup.controls.zipcode.setValue(null);
        this.toastrService.error('', 'O CEP não foi encontrado', {
          timeOut: 3000,
        });
      });
  };

  create()
  {
    this.user = {
      name: this.formGroup.value.name,
      password: this.formGroup.value.password,
      password_confirmation: this.formGroup.value.password_confirmation,
      email: this.formGroup.value.email,
      client: {
        phone: this.formGroup.value.phone ,
        address: this.formGroup.value.address ,
        city: this.formGroup.value.city ,
        state: this.formGroup.value.state ,
        zipcode: this.formGroup.value.zipcode ,
      }
    };
    this.signupService.create(this.user)
      .subscribe(response => {
        this.toastrService.success('Seu usuário foi criado com sucesso !', 'Parabéns, '+ response['name'] + ' !!!', {
          timeOut: 3000,
        });
        this.router.navigate(['login']);
      }, error => {

      });
  };

  getState()
  {
    this.stateService.getStateAPI()
      .subscribe(response => {
        this.states = response;
      }, error => {

      });
  };

  checkPhone()
  {
    if(this.phone.length === 11)
    {
      this.maskPhone = '(000) 0000-0000';
    };
  };
}
