package ibf2021.assessment.csf.server.controllers;

/* Write your request handler in this file */

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import ibf2021.assessment.csf.server.models.Recipe;
import ibf2021.assessment.csf.server.services.RecipeService;
import org.apache.tomcat.util.json.JSONParser;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.logging.Logger;

@RestController
@RequestMapping(value="/api/v0",
        produces= MediaType.APPLICATION_JSON_VALUE)
public class RecipeRestController {
    private final RecipeService recipeService;
    private final Logger log = Logger.getLogger(RecipeRestController.class.getName());

    public RecipeRestController( RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping("recipe/{id}")
    public ResponseEntity<?> getRecipe(@PathVariable String id){
        if (this.recipeService.getRecipeById(id).isPresent()){
            return ResponseEntity.ok(this.recipeService.getRecipeById(id).get());
        }else{
            return ResponseEntity.badRequest().body("No Found");
        }
    }

    @PostMapping("recipe")
    public ResponseEntity<Object> addRecipe(@RequestBody String recipe) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        Recipe recipeToAdd = mapper.readValue(recipe, Recipe.class);
        this.recipeService.addRecipe(recipeToAdd);
        ObjectMapper responseMessage = new ObjectMapper();
        ObjectNode message = responseMessage.createObjectNode();
        message.put("message", "Recipe added");
        return new ResponseEntity<>(message, HttpStatus.CREATED);
    }

}