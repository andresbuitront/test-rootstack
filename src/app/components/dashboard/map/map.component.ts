import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import * as Mapboxgl from 'mapbox-gl';
import { RequestBase } from 'src/app/services/request-base.services';
import { SessionBase } from 'src/app/services/session.services';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  mapbox: Mapboxgl.Map | undefined;
  profile: any = {};
  listJobs: any[] = [];
  cursession: any = null;

  constructor(private requestBase: RequestBase, private sessionBase: SessionBase, private router: Router) { }

  ngOnInit(): void {
    this.cursession = this.sessionBase.getLocalStorage("cursession");
    console.log("hola", this.cursession);
    if (this.cursession === JSON.parse('{}')) {
      console.log("Entro");
      this.router.navigate(['login']);
    }

    (Mapboxgl as any).accessToken = environment.mapboxKey;

    this.mapbox = new Mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [-78.495284, -0.1464162], //lng lat, // starting position
      zoom: 15 // starting zoom
    });

    this.getProfile(this.cursession.access_token);
    this.getJobs(this.cursession.access_token);
    this.buildMarkers();
  }


  buildMarkers() {
    const popup = new Mapboxgl.Popup({ offset: 25 }).setText(
      'Construction on the Washington Monument began in 1848.'
    );

    const el = document.createElement('div');
    el.id = 'marker';

    // create the marker
    new Mapboxgl.Marker({ draggable: false })
      .setLngLat([-78.495284, -0.1464162])
      .setPopup(popup) // sets a popup on this marker
      .addTo(<any>this.mapbox);
  }

  buildMarkers2(listJobs: any[]) {
    listJobs.forEach(element => {
      element.popup = new Mapboxgl.Popup({ offset: 25 }).setText(
        element.description
      );
      element.marker =
        new Mapboxgl.Marker({ draggable: false })
          .setLngLat([element.longitude, element.latitude])
          .setPopup(element.popup) // sets a popup on this marker
          .addTo(<any>this.mapbox);
    });
  }

  getProfile(token: string) {
    this.requestBase.getData(null, true, "auth/me", token).subscribe(
      data => {
        console.log(data);
        this.profile = JSON.parse(data);
      },
      error => {
        console.log(error);
      }
    );
  }
  getJobs(token: string) {
    this.requestBase.getData(null, true, "jobs", token).subscribe(
      data => {
        console.log(data);
        const response = JSON.parse(data)
        this.listJobs = response.data;
        this.buildMarkers2(this.listJobs);
      },
      error => {
        console.log(error);
      }
    );
  }
  updateView(job: any) {

    this.mapbox?.flyTo({
      center: [
        job.longitude, job.latitude
      ],
      essential: true // this animation is considered essential with respect to prefers-reduced-motion
    });
  }
  logOut() {
    this.sessionBase.dropSession();
    this.router.navigate(['login']);
  }
}


