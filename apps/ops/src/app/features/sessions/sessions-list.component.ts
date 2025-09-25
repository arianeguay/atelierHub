import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

import { Apollo, gql } from 'apollo-angular';

const SESSIONS_QUERY = gql`
  query OpsSessions($eventId: ID) {
    events(filter: {}) {
      id
      title_en
      sessions {
        id
        startsAt
        endsAt
        priceCents
      }
    }
  }
`;

@Component({
  selector: 'app-sessions-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Sessions</h2>
    <div *ngFor="let e of events()" style="margin-bottom: 16px;">
      <h3>{{ e.title_en }}</h3>
      <table class="table">
        <thead>
          <tr>
            <th>Starts</th>
            <th>Ends</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let s of e.sessions">
            <td>{{ s.startsAt | date: 'short' }}</td>
            <td>{{ s.endsAt | date: 'short' }}</td>
            <td>{{ s.priceCents / 100 | number: '1.2-2' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
})
export class SessionsListComponent {
  events = signal<any[]>([]);
  constructor(private apollo: Apollo) {
    this.apollo
      .watchQuery({ query: SESSIONS_QUERY })
      .valueChanges.subscribe((res: any) => this.events.set(res?.data?.events ?? []));
  }
}
