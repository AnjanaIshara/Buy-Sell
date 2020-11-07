import { Component, OnInit,ViewChild  } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../shared.service';
import { HttpClient } from '@angular/common/http';
import { generate } from 'rxjs';

@Component({
  selector: 'app-add-preview',
  templateUrl: './add-preview.component.html',
  styleUrls: ['./add-preview.component.scss']
})
export class AddPreviewComponent implements OnInit {
  images = [62, 83, 466, 965, 982, 1043, 738].map((n) => `https://picsum.photos/id/${n}/900/500`);
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  AddID=0;
  Email="";
  ServerUrl="";
  

  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }
  constructor( private _sharedService:SharedService, private _http: HttpClient) { 
    this.AddID=_sharedService.getAddId();
    this.Email=_sharedService.getEmail();
    this.ServerUrl=_sharedService.getServer();
    
    


  }

  ngOnInit(): void {
    
  }

}
