import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slider } from 'src/app/shared/animations/router-animations';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.scss'],
  animations: [slider],
})
export class ClientDashboardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // if(localStorage.getItem('ac'))
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
}
