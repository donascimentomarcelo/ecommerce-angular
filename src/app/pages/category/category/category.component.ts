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
    this.initForm();
    this.searchPlaceholder = 'nome';
    this.listType();
  };

  initForm()
  {
    this.formGroup = this.formBuilder.group({
      id: [null,],
      name: [null,[Validators.required]],
      types: new FormArray([])
    });
  }

  onCheckChange(id, isChecked, key) 
  {
    const chkArray = <FormArray> this.formGroup.get(key);

    for(let i=0; i<this.types.length;i++)
    {
      if(this.types[i].checked == true && !chkArray.value.includes(this.types[i].id))
      {
        chkArray.push(new FormControl(this.types[i].id));
      }
    }

    if(isChecked) 
    {
      chkArray.push(new FormControl(id));

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
    if(this.formGroup.value.id)
    {
      this.update(this.formGroup.value, this.formGroup.value.id);
    }
    else
    {
      this.create(this.formGroup.value);
    };
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

        this.categories[index] = response as CategoryDTO;

        this.clear();
      }, error => {});
  };

  findIndexToUpdate(item)
  {
    return item.id === this;
  };

  edit(category)
  {
   this.clear();
   this.idSelected = category.id;

   this.formGroup = this.formBuilder.group({
      id: [category.id],
      name: [category.name,[Validators.required]],
      types: new FormArray([])
    });
    for(let i=0; i<category.types.length; i++)
    {
      let x = this.types.find(function(item){
        if(item.id == category.types[i].id)
        {
          item.checked = true;
          return item as any;
        };
      });
      const chkArray = <FormArray> this.formGroup.get('types');
      chkArray.push(new FormControl(x.id));
    };
  };

  clear()
  {
    this.formGroup.reset({
      'id': '',
      'name': '',
      types: new FormArray([])
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
