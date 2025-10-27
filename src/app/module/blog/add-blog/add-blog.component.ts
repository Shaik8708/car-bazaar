import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {
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
  title: ['', [Validators.required]],
  metaTitle: ['', [Validators.required]],
  metaDescription: ['', [Validators.required]],
  description: ['', [Validators.required]],
  blogPictures: this.fb.array([this.newImage()], [Validators.required])

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
    console.log(res);
    
    this.addDealerForm.patchValue(res?.data)
    // this.addDealerForm.patchValue({
    //     address:res?.data?.address,
    //     age:res?.data?.age,
    //     country:res?.data?.country,
    //     designation:res?.data?.designation,
    //     dob:res?.data?.dob,
    //     employeeName:res?.data?.employeeName,
    //     gender:res?.data?.gender,
    //     postalCode:res?.data?.postalCode,
    //     qualification:res?.data?.qualification,
    //     phoneNumber:res?.data?.phoneNumber,
    //     emergencyNumber:res?.data?.emergencyNumber,
    //     panNumber:res?.data?.panNumber
    //   })
    this.editImage=res?.data?.photos
    this.images=res?.data?.blogPictures
  })
    
 
 } 
  newImage(): FormGroup {
    return this.fb.group({
      img: [""],
      imgName:[""],
      altText:[""]
   
    });
  }
  get abc(): FormArray {
    return this.addDealerForm.get("blogPictures") as FormArray;
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
          // Check if a file is selected
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

      let a: any = this.addDealerForm.controls['blogPictures'];

      a['controls'][i].patchValue({
        img: this.image,
      });
console.log(console.log(
  "this.addDealerForm.controls['blogPictures']",
  a["controls"][i].value
));


    };
    myReader.readAsDataURL(file);
  }

  onSubmit() {

    if (this.isEdit) {
  
      this.api.updateBlogs(this.getId, {title:this.addDealerForm.value.title}).subscribe((res: any) => {
      

        this.loader = false

        if (res) {
          if (res?.message == "Successfully Blog Updated") {
            this.addDealerForm.reset();
            this.route.navigate(['/blog'])
          }
        }

      })

    }


    else {
      const data = this.addDealerForm.value;
      console.log(data);

      this.api.addBlogs(data).subscribe((res: any) => {
        console.log(res);

        this.loader = false

        if (res) {
          if (res?.message == "Successfully Blog Created!") {
            this.addDealerForm.reset();
            alert(res?.message)
            this.route.navigate(['/blog'])
          }
        }

      })

    }





  }


}


