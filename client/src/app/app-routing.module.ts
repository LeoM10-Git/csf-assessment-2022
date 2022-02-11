import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeListComponent } from "./components/recipe-list/recipe-list.component";
import { RecipeAddComponent } from "./components/recipe-add/recipe-add.component";
import { RecipeDetailComponent } from "./components/recipe-detail/recipe-detail.component";

const routes: Routes = [
  { path: '', component: RecipeListComponent},
  { path: 'recipe/:recipeId', component: RecipeDetailComponent},
  { path: 'add', component: RecipeAddComponent},
  { path: '**', redirectTo:'', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
