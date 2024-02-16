import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WindowService {
  public MOBILE_WIDTH: number = 992;

  public isMobile: Subject<boolean>;

  constructor() {
    this.isMobile = new Subject();
  }
}
