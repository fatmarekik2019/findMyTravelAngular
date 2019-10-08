import { Component, OnInit, DoCheck } from '@angular/core';
import { PublicationService } from '../../publication.service';
import { SearchPipe } from 'src/app/search.pipe';
import { ProfileService } from 'src/app/profile.service';
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {


  jsonObject = { destination: '', minPrice: null, maxPrice: null, duration: null };
  result: any;
  filterResult: any;
  publication: any;
  addressSearch: any;
  costSearchMin: any;
  costSearchMax: any;
  durationSearch: any;
  clientId: any;
  listeVote: any = [];


  constructor(private publicationService: PublicationService, private profileService: ProfileService) { }

  ngOnInit() {
    let decodedToken = localStorage.getItem('token');
    let userName = jwt_decode(decodedToken)['sub'];
    this.profileService.get(userName).subscribe((res: any) => {
      this.clientId = res.id;
      console.log(this.clientId);
      this.publicationService.getListVote(this.clientId).subscribe((res2: any) => {
        this.listeVote = res2;
      });
    });

    this.publicationService.getActivatedPublication().subscribe((res: any) => {

      console.log(res)
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
  onClickVote(item) {

    let data = {

    };

    this.publicationService.votePublication(data, this.clientId, item.id).subscribe((res: any) => {
      console.log( res)
      this.publicationService.getListVote(this.clientId).subscribe((res2: any) => {
        this.listeVote = res2;
        this.isVote(item);
      });

    })
   


  }
  
  isVote(item) {
    if(this.listeVote.includes(item.id)) {
      return true;
    } else {
      return false;
    }

    
  }

}
