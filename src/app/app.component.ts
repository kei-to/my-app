import { Component , OnInit, OnDestroy } from "@angular/core";
import { Observable } from 'rxjs';
import { Item } from "./item";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  
})
export class AppComponent implements OnInit, OnDestroy {
  now: Observable<Date>;
  intervalList: ReturnType<typeof setInterval>[] = [];
  title = "todo";

  filter: "all" | "active" | "done" = "all";

  allItems = [
    { description: "eat", done: true },
    { description: "sleep", done: false },
    { description: "play", done: false },
    { description: "laugh", done: false },
  ];

  constructor() {
    this.now = new Observable<Date>();
  }

  get items() {
    if (this.filter === "all") {
      return this.allItems;
    }
    return this.allItems.filter((item) =>
      this.filter === "done" ? item.done : !item.done
    );
  }

  addItem(description: string) {
    this.allItems.unshift({
      description,
      done: false
    });
  }

  remove(item: Item) {
    this.allItems.splice(this.allItems.indexOf(item), 1);
  }

  ngOnInit() {
    this.now = new Observable((observer) => {
      this.intervalList.push(setInterval(() => {
        observer.next(new Date());
      }, 1000));
    });
  }

  ngOnDestroy() {
    if (this.intervalList) {
      this.intervalList.forEach((interval) => {
        clearInterval(interval);
      });
    }
  }
}