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

  constructor(private categoryService: CategoryService) { }

  ngOnInit() 
  {
    this.list(0);
  };
  
  list(page: number)
  {
    this.categoryService.list(page)
      .subscribe(response => {
        this.categories = response.data;
        this.total = response.total; 
      }, error => {});
  };

}
