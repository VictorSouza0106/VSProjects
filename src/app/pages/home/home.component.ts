import { ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ProjectDetailComponent } from 'src/app/dialog/project-detail/project-detail.component';
import { IProject } from 'src/app/interfaces/intefaces';

type CubeFacesCords = {
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
};

const ALL_CUBE_FACES_CORDS: CubeFacesCords = {
  1: 'matrix3d(0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 0, 1)',
  2: 'matrix3d(-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1)',
  3: 'matrix3d(0, 0, -1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1)',
  4: 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)',
  5: 'matrix3d(1, 0, 0, 0, 0, 0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1)',
  6: 'matrix3d(1, 0, 0, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1)',
};

const PROJECTS_INFORMATION: IProject[] = [
  {
    projectName: 'Night Cycle',
    gitLink: 'https://github.com/VictorSouza0106/night-cycle',
    liveLink: 'https://www.night-cycle.com/',
    lastUpdate: '03/06/2022',
    stacks: ['Angular', 'Django', 'AWS', 'Typescript', 'Vercel'],
    details: 'projects.night_cycle_detail',
    videoName: 'night-cycle',
  },
  {
    projectName: 'Rainha Do Sol',
    gitLink: 'https://github.com/VictorSouza0106/rainhaDoSol',
    liveLink: 'https://rainha-do-sol.vercel.app/',
    lastUpdate: '17/01/2024',
    stacks: ['Angular', 'Typescript', 'Vercel'],
    details: 'projects.rainha_sol_detail',
    videoName: 'rainha-do-sol',
  },
  {
    projectName: 'Vipery Web',
    gitLink: 'https://github.com/VictorSouza0106/Vipery-web',
    liveLink: 'https://vipery-web.vercel.app/',
    lastUpdate: '08/02/2022',
    stacks: ['Angular', 'Typescript', 'Vercel', 'ThreeJS'],
    details: 'projects.vipery_detail',
    videoName: 'vipery-web',
  },
  {
    projectName: 'The OFF',
    gitLink: 'https://github.com/VictorSouza0106/the_off',
    liveLink: 'https://the-off.vercel.app/home.html',
    lastUpdate: '18/07/2022',
    stacks: ['HTML', 'CSS', 'Javascript'],
    details: 'projects.off_detail',
    videoName: 'the-off',
  },
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private viewportScroller: ViewportScroller,
    private dialog: MatDialog
  ) {}

  public hobbieCardSelected: string = '';
  public bannerBorderRadius: number = 50;

  ngOnInit(): void {
    gsap.registerPlugin(ScrollTrigger);

    this.startScrollAnimations();
    this.randomizeCubeFace();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    let [posX, posY] = this.viewportScroller.getScrollPosition();
    this.bannerBorderRadius = posY / 4 + 50;
  }

  private startScrollAnimations() {
    this.animateHobbiesCards();
    this.animateCreativitySection();
  }

  private animateHobbiesCards() {
    gsap.to(['.card-tech', '.card-art', '.card-sport'], {
      scrollTrigger: {
        trigger: '.hobbies-section',
        start: 'top center',
        toggleActions: 'play',
      },
      stagger: 0.5,
      y: 0,
      opacity: 1,
    });
  }

  private animateCreativitySection() {
    gsap.from(['.ink-stain-container', '.cube-container'], {
      scrollTrigger: {
        trigger: '.creativity-section',
        start: '30% center',
        toggleActions: 'play',
      },
      y: '-100vh',
    });

    let masterTimeLine = gsap.timeline({
      scrollTrigger: {
        trigger: '.creativity-section',
        start: 'top top',
        pin: true,
        end: '+=1000%',
        toggleActions: 'play',
        scrub: 2,
      },
    });

    masterTimeLine.add(this.createCubeAnimation());
    masterTimeLine.to(
      '.ink-stain-mini',
      {
        transform: 'translate(0,0)',
        duration: 5,
      },
      '<'
    );

    // Centralize Both icon (Cube / Ink Stain)
    masterTimeLine.from('.cube-container', {
      left: '20vw',
      duration: 3,
    });
    masterTimeLine.from(
      '.ink-stain-container',
      {
        right: '12vw',
        duration: 3,
      },
      '<'
    );

    // Open the circle
    masterTimeLine.fromTo(
      '.circle',
      { clipPath: 'circle(20%)' },
      {
        backgroundColor: '#fcdf54',
        clipPath: 'circle(100%)',
      }
    );
    masterTimeLine.to(
      '.light-bulb',
      {
        opacity: 0,
        scale: 4,
      },
      '<'
    );
    masterTimeLine.to(
      '.projects-title-container',
      {
        opacity: 1,
        duration: 2,
      },
      '<'
    );
    masterTimeLine.to(
      ['.light-text', '.dark-text'],
      {
        opacity: 1,
      },
      '<'
    );

    // Close the circle
    masterTimeLine.fromTo(
      '.circle',
      { clipPath: 'circle(150%)' },
      {
        backgroundColor: '#fcdf54',
        clipPath: 'circle(1% at 0 0)',
        duration: 2,
      }
    );

    // Get time to Pin off te container
    masterTimeLine.to('.empty', {
      scale: 2,
      duration: 1,
    });
  }

  private createCubeAnimation(): gsap.core.Timeline {
    let cubeAnimation = gsap.timeline();

    cubeAnimation.to('.face-1-creativity', {
      transform: 'rotateY(90deg) translateZ(3vw)',
    });

    cubeAnimation.to('.face-2-creativity', {
      transform: 'rotateY(180deg) translateZ(3vw)',
    });

    cubeAnimation.to('.face-3-creativity', {
      transform: 'rotateY(270deg) translateZ(3vw)',
    });

    cubeAnimation.to('.face-4-creativity', {
      transform: 'rotateY(360deg) translateZ(3vw)',
    });

    cubeAnimation.to('.face-5-creativity', {
      transform: 'rotateX(90deg) translateZ(3vw)',
    });

    cubeAnimation.to('.face-6-creativity', {
      transform: 'rotateX(270deg) translateZ(3vw)',
    });

    return cubeAnimation;
  }

  private rollTechCube(element: HTMLElement, interval: number) {
    setInterval(() => {
      let randonNumber = Math.floor(Math.random() * 6) + 1;

      if (randonNumber >= 1 && randonNumber <= 6) {
        let selectedFaceCords =
          ALL_CUBE_FACES_CORDS[randonNumber as keyof CubeFacesCords];
        element.style.transform = selectedFaceCords;
      }
    }, interval);
  }

  public setSelectedHobbieCard(cardName: string) {
    this.hobbieCardSelected = cardName;
  }

  public randomizeCubeFace() {
    let cube1 = document.getElementById('cube-1') as HTMLElement;
    this.rollTechCube(cube1, 2500);

    let cube2 = document.getElementById('cube-2') as HTMLElement;
    this.rollTechCube(cube2, 3000);

    let cube3 = document.getElementById('cube-3') as HTMLElement;
    this.rollTechCube(cube3, 2750);

    let cube4 = document.getElementById('cube-4') as HTMLElement;
    this.rollTechCube(cube4, 3250);

    let cube5 = document.getElementById('cube-5') as HTMLElement;
    this.rollTechCube(cube5, 3750);

    let cube6 = document.getElementById('cube-6') as HTMLElement;
    this.rollTechCube(cube6, 3500);
  }

  public openProjectDialog(projectName?: string) {
    let currentProject = PROJECTS_INFORMATION.find(
      (project) => project.projectName === projectName
    );
    console.log(currentProject);

    this.dialog.open(ProjectDetailComponent, {
      width: '80vw',
      height: '80vh',
      panelClass: 'flat-panel',
      data: currentProject,
    });
  }
}
