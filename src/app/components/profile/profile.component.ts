import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {  MealPlanService, List} from 'src/app/model/meal-plan.service';
import { Subscription } from 'rxjs';
import { Favorite } from 'src/app/model/recipe.service';
import { Info } from 'src/app/model/meal-plan.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  sub! : Subscription
  items: List[] = [];
  favs: Favorite[] = [];
  info: Info[] = []
  idRecipe: Favorite[] | undefined;

  user!: {
    id: number,
    email: string
  }

  infos: Partial<Favorite> = {
    recipeId: 0
  }

  constructor(private plan: MealPlanService) { }

  ngOnInit(): void {
    //this.connectUser();
    this.getList()
    this.getFav()
    this.user = JSON.parse(localStorage.getItem('UserData')!)
    if (this.user) {
      this.getInfo(this.infos)
    }


  }

  /*connectUser() {
    this.plan.connect().subscribe(res => {
      localStorage.setItem('data', JSON.stringify(res))
      console.log(res)
    })

  }*/

  getInfo(id: Favorite) {
      if (this.user) {
        this.plan.getInfo(this.recipeId).subscribe(data => {
          this.info = data;
        })
        console.log(this.info);
      }
    }


  postList(addList: NgForm) {
    this.plan.postList(addList.value).subscribe()

  }
  getList() {
    this.plan.getList().subscribe(data => {
      this.items = data;
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
      this.favs = data
      console.log(data)
    })
  }
}
