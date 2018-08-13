import { DomSanitizer } from '@angular/platform-browser';
import { ProfileService } from './services/domain/profile.service';
import { AppStateService } from './services/appState.service';
import { API_CONFIG } from './config/api.config';
import { UserDTO } from './models/user.dto';
import { Component, Input, OnInit } from '@angular/core';
import { StorageService } from './services/storage.service';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UserService } from './services/domain/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  opened = true;
  logged = false;
  name: string;
  imageUrl: any;
  message: any;
  subscription: Subscription;

  constructor(
    private storageService: StorageService,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private appState: AppStateService,
    private profileService: ProfileService,
    private sanitizer: DomSanitizer) {
    const localUser = this.storageService.getLocalUser();

    if (localUser) {
      this.logged = true;
      this.name = storageService.getLocalUser().name;
      const id = storageService.getLocalUser().id;
      this.checkIfImageExistAtBucket(id);
    }
    this.imageUrl = 'assets/images/avatar-blank.png';
  }

  ngOnInit() {
    this.subscription = this.appState.getEvent()
    .subscribe(message => {
      if (message) {
        this.checkIfImageExistAtBucket(message.event);
      }
    });
  }

  checkIfImageExistAtBucket(id: string) {
    this.userService.getImageBucket(id)
      .subscribe(response => {
        this.imageUrl = `${API_CONFIG.bucketBaseUrl}client${id}.jpg`;
        this.profileService.blobToDataURL(response).then(dataUrl => {
          const str: string = dataUrl as string;
          this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(str);
        });
      }, error => {
        this.imageUrl = 'assets/images/avatar-blank.png';
      });
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
