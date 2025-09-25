import { Routes } from '@angular/router';

import { LoginComponent } from './features/auth/login.component';
import { EventFormComponent } from './features/events/event-form.component';
import { EventsListComponent } from './features/events/events-list.component';
import { SessionsListComponent } from './features/sessions/sessions-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'events', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'events', component: EventsListComponent },
  { path: 'events/:id', component: EventFormComponent },
  { path: 'sessions', component: SessionsListComponent },
  { path: '**', redirectTo: 'events' },
];
