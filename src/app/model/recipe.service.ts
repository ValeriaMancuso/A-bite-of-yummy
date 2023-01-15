import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, take } from 'rxjs';
import { AuthData, AuthService } from '../auth/auth.service';


export interface Recipe {
  like: boolean;
  id: number,
  title: string,
  image: string,
  instructions: string
}

export interface Favorite {
  id: number,
  recipeId: number,
  userId: number
}

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  user! : {id: number, email: string };

  getRecipes(): Observable <any>  {
    const url = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=25';
    const key = 'd20d5ca301mshdc78b95fd48a6b6p14ba94jsn318693cef766';
    const header = new HttpHeaders({'X-RapidAPI-Key': key});
    return this.http.get<any>(url, {headers: header}).pipe(map(res => res.recipes));

  }

  getRecipe(id: number): Observable <Recipe>  {
    const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`;
    const key = 'd20d5ca301mshdc78b95fd48a6b6p14ba94jsn318693cef766';
    const header = new HttpHeaders({'X-RapidAPI-Key': key});
    return this.http.get<Recipe>(url, {headers: header}).pipe(map(res => res));

  }

  setFav(favorite:Partial<Favorite>) {
    console.log("favorite",favorite);
    return this.http.post(`https://63bff6d00cc56e5fb0e36413.mockapi.io/favorites/`, favorite).subscribe()
 }
 getFav(){
  return this.http.get<Favorite[]>('https://63bff6d00cc56e5fb0e36413.mockapi.io/favorites');
 }

 cancFav(recipeId: number){
  return this.http.delete(`https://63bff6d00cc56e5fb0e36413.mockapi.io/favorites/` + recipeId).subscribe();
}
}
