import { LocalUser } from '../models/local_user';
import { Injectable } from '@angular/core';
import { STORAGE_KEY } from '../config/storage_key.config';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getLocalUser(): LocalUser {

    let user = localStorage.getItem(STORAGE_KEY.localUser);

    if(user == null)
    {
      return null;
    }
    else
    {
      return JSON.parse(user);
    };
  };

  setLocalUser(object: LocalUser)
  {
    if(object == null)
    {
      localStorage.removeItem(STORAGE_KEY.localUser);
    }
    else
    {
      localStorage.setItem(STORAGE_KEY.localUser, JSON.stringify(object));
    };
  };
}
