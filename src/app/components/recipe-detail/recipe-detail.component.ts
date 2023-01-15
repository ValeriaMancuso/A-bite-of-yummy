import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe, RecipeService } from 'src/app/model/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  sub!: Subscription
  recipe: Recipe | undefined
  constructor(private recSrv: RecipeService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this.router.params.subscribe(async (params) => {
      const id = +params['id'];
      console.log(id);
      this.recipe = await this.recSrv.getRecipe(id).toPromise();
    });
  }

}
