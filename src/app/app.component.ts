import { Component, HostListener, OnInit } from '@angular/core';
import { TranslateService } from './services/translate.service';
import { WindowService } from './services/window.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private translateService: TranslateService,
    private windowService: WindowService
  ) {}

  public isMobile: boolean =
    window.innerWidth < this.windowService.MOBILE_WIDTH ? true : false;

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    if (window.innerWidth < this.windowService.MOBILE_WIDTH)
      this.windowService.isMobile.next(true);
    else this.windowService.isMobile.next(false);
  }

  ngOnInit(): void {
    this.translateService.use(navigator.language);
  }
}
