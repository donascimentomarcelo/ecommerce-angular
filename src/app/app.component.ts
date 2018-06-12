import { Component } from '@angular/core';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  opened: boolean = true;
  logged: boolean = false;
  
  constructor(private storageService: StorageService) 
  { 
    let localUser = this.storageService.getLocalUser();

    if(localUser)
    {
      this.logged = true;
    }
  }
  
  openMenu()
  {
    this.opened = !this.opened;
  }
}
