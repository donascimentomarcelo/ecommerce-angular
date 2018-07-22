import { API_CONFIG } from './config/api.config';
import { UserDTO } from './models/user.dto';
import { Component } from '@angular/core';
import { StorageService } from './services/storage.service';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  opened: boolean = true;
  logged: boolean = false;
  name: string;
  imageUrl: any;
  
  constructor(
    private storageService: StorageService,
    private router: Router,
    private authService: AuthService) 
  { 
    let localUser = this.storageService.getLocalUser();

    if(localUser)
    {
      this.logged = true;
      this.name = storageService.getLocalUser().name;
      const id = storageService.getLocalUser().id;
      this.imageUrl = `${API_CONFIG.bucketBaseUrl}client${id}.jpg`;
    };

  };
  
  openMenu()
  {
    this.opened = !this.opened;
  };

  logout()
  {
    this.authService.logout()
      .subscribe(reponse => {
        this.storageService.setLocalUser(null);
        this.logged = false;
        this.opened = true;
        this.router.navigate(['login']);
      }, error => {});
  };

}
