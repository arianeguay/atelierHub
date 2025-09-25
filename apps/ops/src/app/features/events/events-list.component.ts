import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Apollo, gql } from 'apollo-angular';

const EVENTS_QUERY = gql`
  query OpsEvents($status: EventStatus) {
    events(filter: { status: $status }) {
      id
      slug
      title_en
      title_fr
      category
      status
      createdAt
    }
  }
`;

@Component({
  selector: 'app-events-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <h2>Events</h2>
    <button class="btn primary" (click)="refresh()">Refresh</button>
    <table class="table" *ngIf="events().length; else empty">
      <thead>
        <tr>
          <th>Title</th>
          <th>Category</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let e of events()">
          <td>{{ e.title_en }}</td>
          <td>{{ e.category }}</td>
          <td>{{ e.status }}</td>
          <td>
            <a [routerLink]="['/events', e.id]">Edit</a>
          </td>
        </tr>
      </tbody>
    </table>
    <ng-template #empty>
      <p>No events found.</p>
    </ng-template>
  `,
})
export class EventsListComponent {
  private apollo = inject(Apollo);
  events = signal<any[]>([]);

  constructor() {
    this.load();
  }

  load() {
    this.apollo
      .watchQuery({ query: EVENTS_QUERY, variables: { status: 'PUBLISHED' } })
      .valueChanges.subscribe((res: any) => {
        this.events.set(res?.data?.events ?? []);
      });
  }

  refresh() {
    this.load();
  }
}
