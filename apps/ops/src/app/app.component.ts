import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <header style="display:flex; gap:12px; padding:12px; border-bottom: 1px solid #ddd;">
      <a routerLink="/">AtelierHub Ops</a>
      <nav style="display:flex; gap:12px;">
        <a routerLink="/events">Events</a>
        <a routerLink="/sessions">Sessions</a>
      </nav>
    </header>
    <main style="padding:16px;">
      <router-outlet></router-outlet>
    </main>
  `,
})
export class AppComponent {}
