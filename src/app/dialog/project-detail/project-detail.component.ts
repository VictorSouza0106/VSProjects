import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IProject } from 'src/app/interfaces/intefaces';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
})
export class ProjectDetailComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<ProjectDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public currentProject: IProject
  ) {}

  ngOnInit(): void {
    console.log(this.currentProject);
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
