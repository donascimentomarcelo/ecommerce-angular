import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  private subject = new Subject<any>();

  sendEvent(message: string) {
      this.subject.next({ event: message });
  }

  getEvent(): Observable<any> {
      return this.subject.asObservable();
  }
}
