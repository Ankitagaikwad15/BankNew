import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddUpdateStudentComponent } from "./dialogs/add-update-student/add-update-student.component";
import { UserClientComponent } from "./userclient.component";

const routes: Routes = [
  { path: "", component: UserClientComponent },
  { path: "add-update-student", component: AddUpdateStudentComponent },
  
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserClientRoutingModule {}
