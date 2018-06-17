import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryDTO } from './../../../models/category.dto';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/domain/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: CategoryDTO[] = [];
  page: number;
  total: number;
  formGroup: FormGroup;
  idSelected: number = null;

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder) { }

  ngOnInit() 
  {
    this.list(0);
    this.formGroup = this.formBuilder.group({
      id: [null,],
      name: [null,[Validators.required]]
    });
  };
  
  list(page: number)
  {
    this.categoryService.list(page)
      .subscribe(response => {
        this.categories = response['data'];
        this.total = response['total']; 
      }, error => {});
  };

  save()
  {
    if(this.formGroup.value.id)
    {
      this.update(this.formGroup.value, this.formGroup.value.id);
    }
    else
    {
      this.create(this.formGroup.value);
    }
  };

  create(category)
  {
    this.categoryService.create(category)
    .subscribe(response => {
      console.log(response);
    }, error => {});
  };

  update(category, id)
  {
    this.categoryService.update(category, id)
      .subscribe(response => {
        console.log(response);
      }, error => {});
  };

  edit(category)
  {
   this.idSelected = category.id;

   this.formGroup = this.formBuilder.group({
      id: [category.id],
      name: [category.name]
    });
  }

}
