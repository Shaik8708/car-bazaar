import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-employeed-details',
  templateUrl: './employeed-details.component.html',
  styleUrls: ['./employeed-details.component.css']
})
export class EmployeedDetailsComponent implements OnInit {
  loader=false
  
  addDealerForm: FormGroup = new FormGroup({});
  citySelected:string = "";
  image: any;
isEdit=false
isView=false
title:any
getId:any
url='/employees'
images:any=[]
  constructor(private fb: FormBuilder, private api:ApiService,private _activate: ActivatedRoute,private route: Router) {
this._activate.params.subscribe((res:any)=>{
  if(res?.id){
this.getId=res?.id
this.isEdit=true
this.getObjectData()
  }
  else{
    this.isEdit=false
  }
})
 this._activate.queryParams.subscribe((res:any)=>{
  console.log(Boolean(res?.viewmode));
  this.isView=res?.viewmode

 }) 



    this.addDealerForm = this.fb.group({
      employeeName: ['', [Validators.required]],
      designation:['', [Validators.required]],
      qualification: ['', [Validators.required]],
      panNumber: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      age: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      emergencyNumber: ['', [Validators.required]],
      address: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      country: ['', [Validators.required]],
      photos: ['', [Validators.required]],

      documentsImages: this.fb.array([this.newImage()], [Validators.required])

    });



  }
  ngOnInit(){
  
  }


editImage:any
 getObjectData(){

    this.isEdit=true

    this.loader=true
  this.api.getAllEmployeesById(this.getId).subscribe((res:any)=>{
    this.loader=false
    
    this.addDealerForm.patchValue({
        address:res?.data?.address,
        age:res?.data?.age,
        country:res?.data?.country,
        designation:res?.data?.designation,
        dob:res?.data?.dob,
        employeeName:res?.data?.employeeName,
        gender:res?.data?.gender,
        postalCode:res?.data?.postalCode,
        qualification:res?.data?.qualification,
        phoneNumber:res?.data?.phoneNumber,
        emergencyNumber:res?.data?.emergencyNumber,
        panNumber:res?.data?.panNumber
      })
    this.editImage=res?.data?.photos
    this.images=res?.data?.documentsImages
  })
    
 
 } 
  newImage(): FormGroup {
    return this.fb.group({
      img: [""],
      imgName:[""]
   
    });
  }
  get abc(): FormArray {
    return this.addDealerForm.get("documentsImages") as FormArray;
  }
  addCity(d:any){
    console.log(d.value);
    this.citySelected = d.value;
  }


  changeListeners($event:any) {
    console.log($event.target.value);
    
    this.readThiss($event.target);
  }
  readThiss(inputValue: any): void {
    var file: File = inputValue.files[0];
    if (!file) {

      return;
    }
   // Check file size (in bytes)
   const maxSizeKB = 2048; // 2MB in kilobytes
   const maxSizeBytes = maxSizeKB * 1024;
   if (file.size > maxSizeBytes) {
     alert('File size exceeds 2MB. Please choose a smaller file.');
     return;
   } else {
     alert('Uploaded successfully.');
   }
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
    
      this.image = myReader.result;
     

      let a: any = this.addDealerForm.controls['photos'];
   
      // a['controls'].patchValue({
      //   photos: this.image,
      // });
      console.log(
        "this.addDealerForm.controls['photos']",
        a["controls"].value
      );
    
    };
    myReader.readAsDataURL(file);
  }


  removeItem(index: number): void {
    this.abc.controls.splice(index, 1);
  }
  addImg() {
    this.abc.push(this.newImage());
  }
  removeItemImage() {
   
this.image=""
console.log('kfkfkfk');

  }



  changeListeners1($event: any, i: any): void {
    this.readThisss($event.target, i);
  }

  readThisss(inputValue: any, i: any) {
    var file: File = inputValue.files[0];
    if (!file) {

      return;
    }
   // Check file size (in bytes)
   const maxSizeKB = 2048; // 2MB in kilobytes
   const maxSizeBytes = maxSizeKB * 1024;
   if (file.size > maxSizeBytes) {
     alert('File size exceeds 2MB. Please choose a smaller file.');
     return;
   } else {
     alert('Uploaded successfully.');
   }
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {

      this.image = myReader.result;

console.log(this.image);

      let a: any = this.addDealerForm.controls['documentsImages'];

      a['controls'][i].patchValue({
        img: this.image,
      });
console.log(console.log(
  "this.addDealerForm.controls['documentsImages']",
  a["controls"][i].value
));


    };
    myReader.readAsDataURL(file);
  }

  onSubmit() {


if(this.isEdit){
  const data = this.addDealerForm.value;

this.loader=true
this.api.updateEmployees(this.getId,data).subscribe((res:any) => {
this.loader=false
  
           if(res?.message == "Successfully Employee Updated"){
            alert(res?.message);
          this.route.navigate([this.url])
            this.citySelected="";

           }else {
          alert(res?.message);
  
           }
  
         },
         (err:any) => {
          alert(err.error.message);
  
         })

}




    else{

      const data = this.addDealerForm.value;
      data.photos= this.image
      console.log(data);
      data.postalCode = Number(data.postalCode)
this.loader=true
       this.api.createEmployees(data).subscribe((res:any) => {
        this.loader=false


         if(res?.message == "Successfully Dealer Registered"){
          alert("Successfully Dealer Registered");
          this.addDealerForm.reset();
          this.route.navigate([this.url])
          this.citySelected="";

         }else {
        alert(res?.message);

         }

       },
       (err:any) => {
        alert(err.error.message);

       })





    }

  }

  
}

