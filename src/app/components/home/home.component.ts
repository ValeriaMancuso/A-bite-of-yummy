import { Component, OnInit } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { Favorite, RecipeService } from 'src/app/model/recipe.service';
import { Recipe } from 'src/app/model/recipe.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  sub!: Subscription
  recipes: Recipe[] = [];
  favorites: Favorite[] = [];
  like: boolean[] = [];
  userFavorites: Favorite[] = [];


  favorite: Partial<Favorite> = {
    userId: 0,
    recipeId: 0
  }
  user!: {
    id: number,
    email: string
  }

  idUser: number = JSON.parse(localStorage.getItem('UserData')!).id;

  constructor(private recSrv: RecipeService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('UserData')!)
    if (this.user) {
    this.getRecipes();

    }
    this.getFav();


  }

  getFav() {
    return this.recSrv.getFav().pipe(tap(data => {
      this.favorites = data;
    }));
  }

  getRecipes() {
    this.sub = this.recSrv.getRecipes().pipe(tap(ris => {
      this.recipes = ris;
      console.log(this.recipes);
    })).subscribe(()=> {
    this.recSrv.getFav().pipe(tap(data => {
    this.favorites = data;
    localStorage.setItem('favorite', JSON.stringify(data));

    let k=0;
    this.favorites.forEach(f=>{
      if (f.userId==this.idUser)
      {
        this.userFavorites[k]=f;
        k++;
      }
    })

    console.log('favoriti_utente',this.userFavorites);
    console.log('user id:',this.idUser);

    let j=0;
    let i=0;
    while(j<this.userFavorites.length)
    {
      if(this.recipes[i].id==this.userFavorites[j].recipeId)
      {
        this.recipes[i].like=true;
        j++;
        i=0;
      }
      if(i==this.recipes.length) {
        j++;
        i=0;
      }
      i++;
    }

  }))
  });

  }

  addFav(idRecipe: number) {
    if (this.user) {
      this.favorite = { userId: this.idUser, recipeId: idRecipe }
      this.recSrv.setFav(this.favorite)
      console.log("sono user", this.user);
    }
  }

  cancFav(idFavorite:number){
    if(this.user){
      this.recSrv.cancFav(idFavorite);
    }
}
  joinFavorite(idRecipe: number, favorites: Favorite[]): number {
    let idFavorite = -1;
    console.log(favorites);

    this.favorites.forEach(f => {
      if (f.recipeId == idRecipe && f.userId == this.idUser) {
        idFavorite = f.id;
        console.log("favorito id:", idFavorite);
      }
    });
    return idFavorite;
  }

  toggleFav(idRecipe: number) {
    let curPos = 0;
    this.recipes.forEach((m, i) => {
      if (m.id == idRecipe) {
        this.recipes[i].like = !this.recipes[i].like;
        curPos = i;
      };

    })
    if (this.recipes[curPos].like){
      this.addFav(idRecipe)
    }
    else {
      this.getFav().subscribe(() => {
        let id_fav = this.joinFavorite(idRecipe, this.favorites);
        this.cancFav(id_fav);
      }
      );
    }
  }
}
