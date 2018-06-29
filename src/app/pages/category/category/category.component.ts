import { TypeDTO } from './../../../models/type.dto';
import { TypeService } from './../../../services/domain/type.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { CategoryDTO } from './../../../models/category.dto';
import { Component, OnInit, Type } from '@angular/core';
import { CategoryService } from '../../../services/domain/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: CategoryDTO[] = [];
  types: TypeDTO[];
  page: number;
  total: number;
  formGroup: FormGroup;
  idSelected: number = null;
  searchValue: string = '';
  findByName: boolean =  true;
  findById: boolean =  false;
  searchPlaceholder: string;

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private typeService: TypeService) { }

  ngOnInit() 
  {
    this.list(0);
    this.formGroup = this.formBuilder.group({
      id: [null,],
      name: [null,[Validators.required]],
      types: new FormArray([])
    });
    this.searchPlaceholder = 'nome';
    this.listType();
  };

  onCheckChange(id, isChecked, key) 
  {
    const chkArray = < FormArray > this.formGroup.get(key);
    
    if(isChecked) 
    {
      chkArray.push(new FormControl(id));

      /**
       * Faço a varredura de todos os tipos
       * Pego o id do tipo na posição i e vejo se é igual ao id passado
       * Se for igual eu atribuo true ao atributo checked na posição i
       */
      for(let i=0; i<this.types.length; i++)
      {
        if(this.types[i].id === id)
        {
          this.types[i].checked = true;
        };
      };
    } 
    else 
    {
      let idx = chkArray.controls.findIndex(x => x.value == id);
      chkArray.removeAt(idx);

      for(let i=0; i<this.types.length; i++)
      {
        if(this.types[i].id === id)
        {
          this.types[i].checked = false;
        };
      };
    };
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
    console.log(this.formGroup.value)
/*
    if(this.formGroup.value.id)
    {
      this.update(this.formGroup.value, this.formGroup.value.id);
    }
    else
    {
      this.create(this.formGroup.value);
    }*/
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
      name: [category.name,[Validators.required]],
      types: this.formBuilder.array([ category.types.id ])
    });
  };

  clear()
  {
    this.formGroup.reset({
      'id': '',
      'name': '',
    });
    this.idSelected = null;
    const arr = <FormArray> this.formGroup.get('types');
    arr.removeAt(0);
    this.types.forEach((item) => {
      item.checked = false;
    });
  };

  search(event: any) 
  {
    if(event.target.value == '' || event.target.value == undefined)
    {
      this.searchValue = '';
      this.list(0);
      return;
    };

    switch(this.findByName)
    {
      case true:
      this.findByCategoryName(event.target.value);
      break;

      case false:
      this.findByCategoryId(event.target.value);
      break;
    };
  };

  selectFindById()
  {
    this.findByName =  false;
    this.findById = true;
    this.searchPlaceholder = 'id';
  };
  
  selectFindByName()
  {
    this.findById = false;
    this.findByName =  true;
    this.searchPlaceholder = 'nome';
  };

  findByCategoryName(name:string)
  {
    this.categoryService.search(name)
      .subscribe(response => {
        this.categories = response;
      }, error => {});
  };

  findByCategoryId(id: number)
  {
    id = Number(id);
    if(typeof id !== 'number')
    {
      console.log('nao e numero')
      return;
    };

    this.categoryService.findOne(id)
      .subscribe(response => {
        let value: any = [];
        value.push(response);
        this.categories = value;
      }, error => {});
  };

  listType()
  {
    this.typeService.list()
      .subscribe(response => {
        this.types = response['data'];
      }, error => {});
  };

}
