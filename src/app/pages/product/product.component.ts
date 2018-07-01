import { CategoryService } from './../../services/domain/category.service';
import { Component, OnInit } from '@angular/core';
import { ProductDTO } from '../../models/product.dto.ts';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../services/domain/product.service';
import { CategoryDTO } from '../../models/category.dto';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: ProductDTO[] = [];
  categories: CategoryDTO[] = [];
  page: number;
  total: number;
  formGroup: FormGroup;
  idSelected: number = null;
  searchValue: string = '';
  findByName: boolean =  true;
  findById: boolean =  false;
  searchPlaceholder: string;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() 
  {
    this.loadProducts(0);
    this.loadCategories();
    this.initForm();
  };

  initForm()
  {
    this.formGroup = this.formBuilder.group({
      id: [null],
      name: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(80)])],
      category_id: [null, [Validators.required,]],
      price: [null, [Validators.required,  Validators.minLength(1), Validators.maxLength(10)]],
      description: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(80)]]
    });
  };

  loadProducts(page: number)
  {
    this.productService.list(page)
      .subscribe(response => {
        this.products = response['data'];   
        this.total = response['total'];   
      }, error => {

      });
  };

  loadCategories()
  {
    this.categoryService.list()
      .subscribe(response => {
        this.categories = response;
      }, error => {

      })
  };

  save()
  {
    console.log(this.formGroup.value)
  };

}
