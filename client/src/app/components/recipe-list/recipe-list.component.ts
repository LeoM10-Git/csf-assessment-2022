import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { RecipeService } from "../../services/recipe.service";
import { Recipe } from "../../model/recipe";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [];




  constructor(private router: Router,
              private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.getAllRecipes().then(recipes => {
      this.recipes = recipes
    });
  }


  viewRecipe(id: string){
    this.router.navigate(['recipe', id]).then()
  }
}
