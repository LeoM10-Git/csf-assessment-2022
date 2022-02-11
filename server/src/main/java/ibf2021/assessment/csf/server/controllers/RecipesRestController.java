package ibf2021.assessment.csf.server.controllers;

/* Write your request handler in this file */

import ibf2021.assessment.csf.server.models.Recipe;
import ibf2021.assessment.csf.server.services.RecipeService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping(value="/api/v0", produces= MediaType.APPLICATION_JSON_VALUE)
public class RecipesRestController {
    private final RecipeService recipeService;

    public RecipesRestController( RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping("recipe")
    public ResponseEntity<List<Recipe>> getAllRecipes(){
        return ResponseEntity.ok(this.recipeService.getAllRecipes());
    }
}