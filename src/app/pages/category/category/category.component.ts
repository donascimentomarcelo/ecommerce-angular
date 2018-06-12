import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/domain/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private categoryService: CategoryService) { }

  ngOnInit() 
  {
    this.categoryService.list()
      .subscribe(response => {
        console.log(response);
        
      }, error => {});
  };

}
