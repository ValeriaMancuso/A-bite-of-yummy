import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, observable } from 'rxjs';
import { Observable } from 'rxjs';
import { Favorite, Recipe } from './recipe.service';


export interface List {
    id: number
    title: string,
    servings: number,
    minutes: number
}

export interface Info {
    id: number
    title: string,
    image: string,
    instructions: string
}

@Injectable({
  providedIn: 'root'
})
export class MealPlanService {
  info: Favorite[] = [];
  constructor(private http: HttpClient) { }
  username = JSON.parse(localStorage.getItem('UserData')!).username;
  hash = JSON.parse(localStorage.getItem('UserData')!).hash;


  /*connect() {
    const url = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/users/connect';
    const key = 'd20d5ca301mshdc78b95fd48a6b6p14ba94jsn318693cef766';
    const options = { headers: new HttpHeaders().set('Content-Type', 'application/json')};
    const header = new HttpHeaders({'X-RapidAPI-Key': key});
    return this.http.post(url, options, {headers: header});
  }*/
  getInfo(recipeId: number): Observable<Recipe>{
    const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipeId}/information`;
    const key = 'd20d5ca301mshdc78b95fd48a6b6p14ba94jsn318693cef766';
    const header = new HttpHeaders({'X-RapidAPI-Key': key});
    return this.http.post<any>(url, {headers: header}).pipe(map(res => res));
  }

   delete(id: number) {
    const url = `https://63bff6d00cc56e5fb0e36413.mockapi.io/meals/${id}`;
      const key = 'd20d5ca301mshdc78b95fd48a6b6p14ba94jsn318693cef766';
      const header = new HttpHeaders({'X-RapidAPI-Key': key});
      return this.http.delete(url, {headers: header});
   }

   postList(post: {title: string, servings: number, minutes: number}) {
    const url = "https://63bff6d00cc56e5fb0e36413.mockapi.io/meals";
    return this.http.post<List>(url, post)

   }

   getList(): Observable<List[]> {
    const url = "https://63bff6d00cc56e5fb0e36413.mockapi.io/meals";
    return this.http.get<any>(url).pipe(map(res => res))
   }
   getFav(){
    return this.http.get<Favorite[]>('https://63bff6d00cc56e5fb0e36413.mockapi.io/favorites');
   }


}
