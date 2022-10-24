import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildrensComponent } from './childrens/childrens.component';

const childRoutes: Routes = [
  { path: '', redirectTo:'niños',pathMatch:'full' },
  { path: 'niños',component:ChildrensComponent}
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class ChildRoutesModule {}
