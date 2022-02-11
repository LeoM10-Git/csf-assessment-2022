import { Component, OnInit, SimpleChanges } from '@angular/core';
import { RecipeService } from "../../services/recipe.service";
import { Router } from "@angular/router";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Recipe } from "../../model/recipe";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: 'app-recipe-add',
  templateUrl: './recipe-add.component.html',
  styleUrls: ['./recipe-add.component.css']
})
export class RecipeAddComponent implements OnInit {
  form!: FormGroup;
  index: number = 1;
  ingredientItems!: FormArray;
  ingredientItem!: FormControl;
  noIngredient = new BehaviorSubject(true);

  constructor(private recipeService: RecipeService,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.ingredientItem = this.fb.control({
      ingredient: ['', [Validators.required, Validators.minLength(3)]]
    })
    this.ingredientItems = this.fb.array([])
    const ingredientItem = this.fb.group({
      ingredient: ['', [Validators.required, Validators.minLength(3)]]
    })
    this.ingredientItems.push(ingredientItem)
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      ingredients: this.ingredientItems,
      instruction: ['', [Validators.required, Validators.minLength(3)]],
      image: ['', [Validators.required, Validators.minLength(3)]],
    })
  }

  addIngredient() {
    const ingredientItem = this.fb.group({
      ingredient: ['', [Validators.required, Validators.minLength(3)]]
    })
    this.ingredientItems.push(ingredientItem)
    this.index ++;
    this.noIngredient.next(false);
  }

  deleteIngredient(i: number) {
    this.ingredientItems.removeAt(i)
    this.index --;
    if(this.index <=1 ) this.noIngredient.next(true);
  }

  onSave() {
    const ingredients = []
    for (const ingredientItem of this.form.controls['ingredients'].value) {
      ingredients.push(ingredientItem['ingredient'])
    }
    const recipe = {
      'title': this.form.controls['title'].value,
      'ingredients': ingredients,
      'instruction': this.form.controls['instruction'].value,
      'image': this.form.controls['image'].value
    } as Recipe
    this.recipeService.saveRecipe(recipe).then((response) =>{
      console.log(response)
      this.router.navigate(['']).then(() => {
        this.recipeService.getAllRecipes().then()
      })
    })
  }
}
