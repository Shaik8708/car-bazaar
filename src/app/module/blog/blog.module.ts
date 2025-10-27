import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { RouterModule, Routes } from '@angular/router';
// import { SpinnerComponent } from 'src/app/core/spinner/spinner.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [

  {
    path: 'blog',
    component: BlogListComponent,
  },
  {
    path: 'add-blog',
    component: AddBlogComponent,
  },

  {
    path: 'edit-blog/:id',
    component: AddBlogComponent,
  },
  // {
  //   path: 'view-employee/:id',
  //   component: AddBlogComponent,
  // },
];

@NgModule({
  declarations: [
    AddBlogComponent,
    BlogListComponent,
    // SpinnerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class BlogModule { }
