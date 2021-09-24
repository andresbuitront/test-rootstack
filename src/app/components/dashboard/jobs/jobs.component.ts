import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  @Input() job: any = {};
  @Input() listJobs: any[] = [];
  @Output() updateView = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  fly(job: any) {
    this.updateView.emit(job)
  }
}
