import { ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.scss'],
})
export class CurriculumComponent implements OnInit {
  constructor(private viewportScroller: ViewportScroller) {}

  public nameAnimation: any = 40;

  ngOnInit(): void {
    this.startAnimations();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    console.log(this.viewportScroller.getScrollPosition());
    let [posX, posY] = this.viewportScroller.getScrollPosition();
    this.nameAnimation = posY + 40;
  }

  private startAnimations() {
    setTimeout(() => {}, 1500);
  }
}
