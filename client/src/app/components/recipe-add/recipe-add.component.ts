import { Component, OnInit } from '@angular/core';
import { RecipeService } from "../../services/recipe.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-recipe-add',
  templateUrl: './recipe-add.component.html',
  styleUrls: ['./recipe-add.component.css']
})
export class RecipeAddComponent implements OnInit {
  form!: FormGroup;
  index: number = 1;
  constructor(private recipeService: RecipeService,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      ingredient: ['', [Validators.required]],
      instruction: ['', [Validators.required, Validators.minLength(3)]],
      image: ['', [Validators.required, Validators.minLength(3)]],
    })
  }

  addIngredient() {
    this.index ++
  }

  deleteIngredient() {
    this.index --;
  }

  onSave() {
    console.log(this.form)
  }
}
