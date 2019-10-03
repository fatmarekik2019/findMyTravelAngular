import { Component, OnInit } from '@angular/core';
import { PublicationService} from '../../publication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private publicationService: PublicationService) { }
  result : any;
  
  ngOnInit() {
    this.publicationService.getRecentPublication().subscribe((res : any) =>
    {
      this.result = res.body;
    })
  }

}
