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
  Modal : any;
  
  ngOnInit() {
    this.publicationService.getRecentPublication().subscribe((res : any) =>
    {
      
      this.result = res;
      this.Modal=res;
      console.log(this.result);
    })
  }
  onClickReadMore(i){
    this.Modal = this.result[i];
    console.log(this.Modal);
    
  }

}
