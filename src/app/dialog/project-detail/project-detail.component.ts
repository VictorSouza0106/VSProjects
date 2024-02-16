import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IProject } from 'src/app/interfaces/intefaces';
import { WindowService } from 'src/app/services/window.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
})
export class ProjectDetailComponent implements OnInit {
  public isMobile: boolean;

  constructor(
    private windowService: WindowService,
    private dialogRef: MatDialogRef<ProjectDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public currentProject: IProject
  ) {
    this.isMobile = window.innerWidth < this.windowService.MOBILE_WIDTH;
  }

  ngOnInit(): void {
    this.windowService.isMobile.subscribe((isMob) => {
      this.isMobile = isMob;
    });
  }

  public closeDialog() {
    this.dialogRef.close();
  }

  public openGitLink() {
    window.open(this.currentProject.gitLink, '_blank');
  }

  public openLiveLink() {
    window.open(this.currentProject.liveLink, '_blank');
  }
}
