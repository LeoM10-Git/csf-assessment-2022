import { Component, OnInit } from '@angular/core';
import { Recipe } from "../../model/recipe";
import { ActivatedRoute } from "@angular/router";
import { RecipeService } from "../../services/recipe.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe!: Recipe;
  ingredients!: string[]
  title!: string
  image!: string

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['recipeId'];
    this.recipeService.getRecipe(id).then(recipe =>{
      this.recipe = recipe
      this.title = recipe.title
      this.ingredients = recipe.ingredients
      this.image = recipe.image
      console.log(recipe)
    })
  }

}
