import { UserDTO } from './../../models/user.dto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

constructor(private http: HttpClient) { }

  update(user: UserDTO, id: string): Observable<UserDTO> {
    return this.http.put<UserDTO>(`${environment.api_url}/client/${id}`, user);
  }

  uploadImageProfile(image, imageName): Observable<any> {
    const formData = new FormData();
    formData.append('file', image, imageName);

    return this.http.post<any>(`${environment.api_url}/client/sendPhoto`, formData);
  }

  blobToDataURL(blob) {
    return new Promise((fulfill, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = (e) => fulfill(reader.result);
      reader.readAsDataURL(blob);
    });
  }

}
