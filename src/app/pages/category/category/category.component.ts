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
  page : number = 0;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() 
  {
    this.categoryService.list(this.page, 5)
      .subscribe(response => {
        this.categories = response.data;       
        console.log(this.categories); 
      }, error => {});
  };

}
