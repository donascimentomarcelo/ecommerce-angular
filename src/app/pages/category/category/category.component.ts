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
  searchValue: string = '';

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
      let cat: CategoryDTO = {id: response['id'], name: response['name']};
      this.categories.push(cat);
      this.clear();
    }, error => {});
  };

  update(category, id)
  {
    this.categoryService.update(category, id)
      .subscribe(response => {
        let updatedItem = this.categories.find(this.findIndexToUpdate, category.id);

        let index = this.categories.indexOf(updatedItem);

        this.categories[index] = category;

        this.clear();
      }, error => {});
  };

  findIndexToUpdate(item)
  {
    return item.id === this;
  };

  edit(category)
  {
   this.idSelected = category.id;

   this.formGroup = this.formBuilder.group({
      id: [category.id],
      name: [category.name,[Validators.required]]
    });
  };

  clear()
  {
    this.formGroup.reset({
      'id': '',
      'name': ''
    });
    this.idSelected = null;
  };

  search(event: any) 
  {
    if(event.target.value == '')
    {
      this.list(0);
      return;
    };
    
    this.categoryService.search(event.target.value)
      .subscribe(response => {
        this.categories = response;
      }, error => {});
  };
}
