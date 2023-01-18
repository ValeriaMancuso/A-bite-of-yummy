import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, observable } from 'rxjs';
import { Observable } from 'rxjs';
import { Favorite, Recipe } from './recipe.service';


export interface List {
    id: number,
    userId: number,
    title: string,
    servings: number,
    minutes: number
}

export interface Info {
    id: number
    title: string,
    image: string,
    instructions: string,
    like: boolean
}

@Injectable({
  providedIn: 'root'
})
export class MealPlanService {
  info: Info[] = [];

  constructor(private http: HttpClient) { }

  getInfo(recipeId: number){
    const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipeId}/information`;
    const key = 'd20d5ca301mshdc78b95fd48a6b6p14ba94jsn318693cef766';
    const header = new HttpHeaders({'X-RapidAPI-Key': key});
    return this.http.get<any>(url, {headers: header}).pipe(map(res => res));
  }

   delete(id: number) {
    const url = `https://63bff6d00cc56e5fb0e36413.mockapi.io/meals/${id}`;
      const key = 'd20d5ca301mshdc78b95fd48a6b6p14ba94jsn318693cef766';
      const header = new HttpHeaders({'X-RapidAPI-Key': key});
      return this.http.delete(url, {headers: header});
   }

   postList(post: {userId: number, title: string, servings: number, minutes: number}) {
    const url = "https://63bff6d00cc56e5fb0e36413.mockapi.io/meals";
    return this.http.post<List>(url, post)

   }

   getList() {
    const url = "https://63bff6d00cc56e5fb0e36413.mockapi.io/meals/";
    return this.http.get<any>(`${url}`).pipe(map(res => res))
   }
   getFav(){
    return this.http.get<Favorite[]>(`https://63bff6d00cc56e5fb0e36413.mockapi.io/favorites`).pipe(map(res => res));
   }

   cancFav(recipeId: number){
    return this.http.delete(`https://63bff6d00cc56e5fb0e36413.mockapi.io/favorites/` + recipeId).subscribe();
  }
}
