import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Recipe } from "../model/recipe";
import { lastValueFrom } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  BASE_URL = 'http://localhost:8080/api/v0/recipe'


  constructor(private http: HttpClient) { }

  getAllRecipes(): Promise<Recipe[]> {
    return <Promise<Recipe[]>>lastValueFrom(this.http.get(this.BASE_URL))
  }

  getRecipe(id: string): Promise<Recipe> {
    return <Promise<Recipe>>lastValueFrom(this.http.get(`${this.BASE_URL}/${id}`))
  }
}
