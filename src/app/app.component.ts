import { Component, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter, take, tap } from 'rxjs/operators';
import { MenuComponent } from './components/menu/menu.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  @ViewChild(MenuComponent, {static: false}) theMenu;
  searchString = '';
  savedSearchString = '';

  openSidebar() {
    this.theMenu.openSidebar();
  }

  constructor(private router: Router) {}

  onSearchChanged(searchString: string) {
    this.searchString = searchString;
  }

  saveSearchString() {
    // this method needs to wait the route to change before setting the searchString to null

    this.router.events
      .pipe(
        filter((event: RouterEvent) => event instanceof NavigationEnd), // waits for NavigationEnd event
        take(1), // takes the first NavigationEnd event
        tap((event: RouterEvent) => {
          this.savedSearchString = this.searchString;
          this.searchString = null;
        })
      )
      .subscribe();
  }

  restoreSearchString() {
    this.searchString = this.savedSearchString;
  }
}
