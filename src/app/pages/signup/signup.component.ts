import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ZipcodeService } from '../../services/zipcode.service';
import { ToastrService } from 'ngx-toastr';

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
  ) { }

  formGroup: FormGroup;
  zipcode: string;

  ngOnInit() 
  {
    this.initForm();
  };

  initForm()
  {
    this.formGroup = this.formBuilder.group({
      email: [null, [Validators.required]],
      name: [null, [Validators.required]],
      password: [null, [Validators.required]],
      password_confirmation: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      address: [null, [Validators.required]],
      city: [null, [Validators.required]],
      state: [null, [Validators.required]],
      zipcode: [null, [Validators.required]],
    });
  };

  back()
  {
    this.router.navigate(['login']);
  };

  getZipcode()
  {
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

  login()
  {
    console.log(this.formGroup.value)
  };

}
