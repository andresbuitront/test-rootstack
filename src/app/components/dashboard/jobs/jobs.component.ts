import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  @Input() job: any = {};
  @Input() listJobs: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
