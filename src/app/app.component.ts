import { Component, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'dnc';

  constructor(private router: Router,) {
  }

  @HostListener('window:beforeunload', ['$event'])
  onWindowRefresh(event: any): void {
    this.router.navigate(['/dnclogin']);
    console.log("onWindowRefresh");
  }

  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    console.log("Processing beforeunload...");
    event.returnValue = true;
    this.router.navigate(['/dnclogin']);
  }



}
