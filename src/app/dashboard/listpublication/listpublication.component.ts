import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { UploadService } from 'src/app/upload.service';
import { PublicationService } from 'src/app/publication.service';
import { ImageService } from 'src/app/image.service';
import { ProfileService } from 'src/app/profile.service';

import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-listpublication',
  templateUrl: './listpublication.component.html',
  styleUrls: ['./listpublication.component.css']
})

export class ListpublicationComponent implements OnInit {
  decoded: any;
  userName = '';
  idUser:any;
  ListPublication:any;

  //all data add
  allDataAdd: any;


  //autocomplete
  searchAddressCtrl = new FormControl("",Validators.required);
  dataPublication = new FormGroup({
    cost: new FormControl("", Validators.required),
    duration: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required)
  });
  filterAddress: any;
  isLoading = false;
  errorMsg: string;

  //add new pub
  textButton = "+ Add";
  show: any;
  links= [];

  uploadForm: FormGroup;

  public uploader: FileUploader = new FileUploader({
    isHTML5: true
  });
  title: string = 'Angular File Upload';
  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private uploadService: UploadService,
    private publicationService: PublicationService,
    private imageService: ImageService,
    private profileService: ProfileService,
    private loginService: LoginService) { }



  ngOnInit() {
    
    this.profileService.get(this.loginService.userName).subscribe((res: any) => {
      this.idUser=res.id;
      this.getAllMyPublication().subscribe(res=> {
        this.ListPublication=res;
        console.log(res);
      });
    });

    this.allDataAdd = {
      address: "",
      description: "",
      cost: 0.0,
      duration: 0,
      latitude: 0.0,
      longitude: 0.0
    }
    this.show = false;
    this.uploadForm = this.fb.group({
      document: [null, null],
      type: [null, Validators.compose([Validators.required])]
    });

    
  }
  autocomplete(e) {
    //autocomplete
    console.log(e.target.value)
    this.searchAddressCtrl.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.errorMsg = "";
          this.filterAddress = [];
          this.isLoading = true;
        }),
        switchMap(value => this.http.get("https://api.opencagedata.com/geocode/v1/json?q=" + e.target.value + "&key=8d3a8ac16e1e46209c21b711e5558e04")
          .pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )
      )
      .subscribe((data: any) => {
        this.filterAddress = data.results;
        console.log(data.results)
      });
  }

  showFiles() {
    console.log(this.uploader)
  }
  showNhide() {
    if (this.show == false) {
      this.show = true;
      this.textButton = "- Hide";
    } else {
      this.show = false;
      this.textButton = "+ Add";
    }

  }
  getFiles(): FileLikeObject[] {
    return this.uploader.queue.map((fileItem) => {
      return fileItem.file;
    });
  }
  addpublication(data: Observable<Object>) {
    this.publicationService.addPublication(this.idUser, data).subscribe((res: any) => {
      console.log("this is added publication");
      console.log(res);
      //after add pub add images
      if (this.links.length > 0) {
        this.links.forEach(element => {
          let dataImage = {
            link: element
          }
          this.imageService.addImage(res.id, dataImage).subscribe(img => console.log(img));
        });
      }
    })
  }
  share() {
    //upload images
    let formData = new FormData();
    let files = this.getFiles();
    console.log(files);
    files.forEach((file) => {

      formData.append('files', file.rawFile, file.name);

    });
    this.uploadService.uploadMultiple(formData).subscribe((res: any) => {
      res.forEach(element => {
        this.links.push("http://localhost:9091/downloadFile/" + element.fileName);
      });
    });

    

    this.allDataAdd.cost = this.dataPublication.value.cost;
    this.allDataAdd.duration = this.dataPublication.value.duration;
    this.allDataAdd.description = this.dataPublication.value.description;


    this.addpublication(this.allDataAdd);
  }
  lonLat(){
    //get Long lat from address
    this.http.get("https://api.opencagedata.com/geocode/v1/json?q=" + this.searchAddressCtrl.value + "&key=8d3a8ac16e1e46209c21b711e5558e04").subscribe((res: any) => {
      this.allDataAdd.address=res.results[0].formatted;
      this.allDataAdd.latitude = res.results[0].geometry.lat;
      this.allDataAdd.longitude = res.results[0].geometry.lng;
      console.log(res.results[0].formatted);

    });
  }
  getAllMyPublication(){
    return this.publicationService.getAllMyPublication(this.idUser);
  }

}
