import { API_CONFIG } from './config/api.config';
import { UserDTO } from './models/user.dto';
import { Component, Input, OnChanges } from '@angular/core';
import { StorageService } from './services/storage.service';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UserService } from './services/domain/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnChanges {

  opened = true;
  logged = false;
  name: string;
  imageUrl: any;
  @Input() skipToCtrl: boolean;

  constructor(
    private storageService: StorageService,
    private router: Router,
    private authService: AuthService,
    private userService: UserService) {
    const localUser = this.storageService.getLocalUser();

    if (localUser) {
      this.logged = true;
      this.name = storageService.getLocalUser().name;
      const id = storageService.getLocalUser().id;
      this.checkIfImageExistAtBucket(id);
    }
  }

  ngOnChanges() {

  }

  checkIfImageExistAtBucket(id: string) {
    this.userService.getImageBucket(id)
      .subscribe(response => {
        this.imageUrl = `${API_CONFIG.bucketBaseUrl}client${id}.jpg`;
      }, resp => { });
  }

  openMenu() {
    this.opened = !this.opened;
  }

  logout() {
    this.authService.logout()
      .subscribe(reponse => {
        this.doLogout();
      }, error => {
        this.doLogout();
      });
  }

  doLogout() {
    this.storageService.setLocalUser(null);
    this.logged = false;
    this.opened = true;
    this.router.navigate(['login']);
  }

}
