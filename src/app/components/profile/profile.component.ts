import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {  MealPlanService, List} from 'src/app/model/meal-plan.service';
import { Subscription } from 'rxjs';
import { Favorite } from 'src/app/model/recipe.service';
import { Info } from 'src/app/model/meal-plan.service';
import { AuthData, AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user!: AuthData | null;
  sub! : Subscription
  items: List[] = [];
  favorites: Favorite[] = [];
  favs: Favorite[] = [];
  info: Info[] = []
  idRecipe!: number;
  userFavs: Info[] = [];


  idUser = JSON.parse(localStorage.getItem('UserData')!).id;


  constructor(private plan: MealPlanService, private authSrv: AuthService) { }

  ngOnInit(): void {
    this.authSrv.user$.subscribe((user) => {
      this.user = user;
    });

    this.getList();
    this.getFav();
    setTimeout(() => {
      this.getInfo()
    }, 1000);
    console.log(this.userFavs)

  }

  postList(addList: NgForm) {
        this.plan.postList(addList.value).subscribe()
    }

  getList() {
    this.plan.getList().subscribe(data => {
      this.items = data
      console.log(this.items)
    })
  }

  delete(id: number) {
    this.sub = this.plan.delete(id).subscribe(() => {
      this.items = this.items.filter((items) => items.id != id);
    })
  }

  getFav() {
      this.plan.getFav().subscribe(data => {
      this.favs = data.filter(item => this.idUser == item.userId)
      console.log(this.favs)
    })

  }

  getInfo() {
    this.favs.forEach(m => {
      this.plan.getInfo(m.recipeId).subscribe(data => {
      this.info = data
      this.userFavs.push(data)
      console.log(this.info);

    })})
  }

}


