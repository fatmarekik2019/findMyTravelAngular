import { Component, OnInit, Input, Output } from '@angular/core';
import { PublicationService } from '../../publication.service';
import { SearchPipe } from 'src/app/search.pipe';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {

  
  jsonObject = {destination: '', minPrice: null, maxPrice: null, duration: null};
  result : any;
  filterResult : any;
  date : Date;
  Modal : any;
  addressSearch: any;
  costSearchMin:any;
  costSearchMax:any;
  durationSearch : any;
  
  constructor(private publicationService: PublicationService) { }

  ngOnInit() {
    this.publicationService.getActivatedPublication().subscribe((res : any)=>
    {
      
console.log(res)
      res.forEach(element => {

        this.date = new Date(element.createdDate.slice(0, 10));
        let day = this.date.getDate()
        let month = this.date.getMonth()+1;
        let year = this.date.getFullYear();
        let time = element.createdDate.slice(11, 16)
        element.createdDate = day+'/'+month+'/'+year+' at '+time;
        
      });
      
      this.result = res;
      this.filterResult = res;
      console.log(this.result);
    });
  }
  filterList(key, value) {
    this.jsonObject[key] = value;
    console.log(this.jsonObject)
    const p = new SearchPipe();
    this.filterResult = p.transform(this.result, this.jsonObject)
  } 
      
}
