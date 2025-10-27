import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Gallery, GalleryRef } from 'ng-gallery';
import { catchError, finalize } from 'rxjs';
import { BaseApiService } from 'src/app/services/base-api/base-api.service';
import urlConfig from '../../../config/url.config.json';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-share-lead-dealer',
  templateUrl: './share-lead-dealer.component.html',
  styleUrls: ['./share-lead-dealer.component.css']
})
export class ShareLeadDealerComponent {
  addDealerForm: FormGroup = new FormGroup({});
  

  galleryRef: GalleryRef;
  galleryRefRc: GalleryRef;
  galleryRefUser: GalleryRef;
  galleryRefChasis: GalleryRef;
  galleryRefScrapLetter: GalleryRef;
  galleryRefTowing: GalleryRef;
  galleryRefScrapped: GalleryRef;
  galleryRefEngine: GalleryRef;
  imagesRc:any;
  imagesUser:any;
  imagesChasis:any;
  imagesScrapLetter:any;
  imagesTowing:any;
  imagesScrapped:any;
  imagesEngine:any;

  leadData:any;
  constructor(private fb: FormBuilder, private api:ApiService, private _activated: ActivatedRoute, private gallery: Gallery
    ,private baseApi: BaseApiService, private spinner: NgxSpinnerService) {
    this.galleryRef = this.gallery.ref('myGallery');
    this.galleryRefRc = this.gallery.ref('myGalleryRc');
    this.galleryRefUser = this.gallery.ref('myGalleryUser');
    this.galleryRefChasis = this.gallery.ref('myGalleryChasis');
    this.galleryRefScrapLetter = this.gallery.ref('myGalleryScrapLetter');
    this.galleryRefTowing = this.gallery.ref('myGalleryTowing');
    this.galleryRefScrapped = this.gallery.ref('myGalleryScrapped');
    this.galleryRefEngine = this.gallery.ref('myGalleryEngine');

    this.addDealerForm = this.fb.group({
        username: [''],
        phoneNumber: [''],
        fullName: ['',],
        createdAt: ['',],
        brandName: [''],
        modelName: [],
        manufactureYear: [],
        price: [''],
        userFinalAmount: [''],
    });



  }

  ngOnInit(): void {
this.getLeadId();
// this.getDealerList();

  }





  getLeadId(){
    this._activated.params.subscribe((res: any) => {
      this.spinner.show();

      let payload = {
        collectionName: urlConfig.products,
        id: res?.id
      }
      this.baseApi.post(urlConfig.getOnePath, payload)
        .pipe(
          finalize(() => {
            this.spinner.hide();
  
          }),
          catchError(error => {
            throw error;
          })
        ).subscribe((res: any) => {

      console.log(res);
      if (res?.status == "success") {
  this.leadData= res?.data;
  // this.imagesRc=res?.data?.rcPictures;
  // this.imagesUser=res?.data?.userDocumentsPictures;
  // this.imagesChasis=res?.data?.chasisPictures;
  // this.imagesTowing=res?.data?.towingPictures;
  // this.imagesScrapLetter=res?.data?.scrapLetterPictures;
  // this.imagesScrapped=res?.data?.scrapPictures;
  // this.imagesEngine=res?.data?.enginePictures;

  let images=res?.data?.vehiclePictures;

  images.forEach((ele: any) => {
    console.log(ele);
    this.galleryRef.addImage({
      src: ele?.img,
      thumb: ele?.img,
    });
  });
  // console.log(images)


  // this.imagesRc.forEach((ele: any) => {
  //   console.log(ele);
  //   this.galleryRefRc.addImage({
  //     src: ele?.img,
  //     thumb: ele?.img,
  //   });
  // });

  // this.imagesUser.forEach((ele: any) => {
  //   console.log(ele);
  //   this.galleryRefUser.addImage({
  //     src: ele?.img,
  //     thumb: ele?.img,
  //   });
  // });
  // this.imagesChasis.forEach((ele: any) => {
  //   console.log(ele);
  //   this.galleryRefChasis.addImage({
  //     src: ele?.img,
  //     thumb: ele?.img,
  //   });
  // });
  // this.imagesScrapLetter.forEach((ele: any) => {
  //   console.log(ele);
  //   this.galleryRefScrapLetter.addImage({
  //     src: ele?.img,
  //     thumb: ele?.img,
  //   });
  // });
  // this.imagesTowing.forEach((ele: any) => {
  //   console.log(ele);
  //   this.galleryRefTowing.addImage({
  //     src: ele?.img,
  //     thumb: ele?.img,
  //   });
  // });
  // this.imagesScrapped.forEach((ele: any) => {
  //   console.log(ele);
  //   this.galleryRefScrapped.addImage({
  //     src: ele?.img,
  //     thumb: ele?.img,
  //   });
  // });
  // this.imagesEngine.forEach((ele: any) => {
  //   console.log(ele);
  //   this.galleryRefEngine.addImage({
  //     src: ele?.img,
  //     thumb: ele?.img,
  //   });
  // });
  // console.log(this.imagesRc)
// this.addDealerForm.patchValue(res?.data)
// this.addDealerForm.patchValue({
//   phoneNumber:res?.data?.createdBy?.phoneNumber
// })
}

      
            });

          });
  }

}
