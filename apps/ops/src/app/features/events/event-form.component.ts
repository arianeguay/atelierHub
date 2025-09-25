import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Apollo, gql } from 'apollo-angular';

const EVENT_QUERY = gql`
  query OpsEvent($id: ID!) {
    event(slug: $id) {
      id
      slug
      title_en
      title_fr
      description_en
      description_fr
      category
      status
    }
  }
`;

const UPDATE_EVENT = gql`
  mutation OpsUpdateEvent($id: ID!, $input: EventInput!) {
    updateEvent(id: $id, input: $input) {
      id
      slug
      title_en
      status
    }
  }
`;

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Edit Event</h2>
    <form class="form" (ngSubmit)="save()" *ngIf="event()">
      <label>Slug<input class="input" [(ngModel)]="event().slug" name="slug" /></label>
      <label
        >Title (EN)<input class="input" [(ngModel)]="event().title_en" name="title_en"
      /></label>
      <label
        >Title (FR)<input class="input" [(ngModel)]="event().title_fr" name="title_fr"
      /></label>
      <label
        >Description (EN)<textarea
          class="input"
          [(ngModel)]="event().description_en"
          name="description_en"
        ></textarea>
      </label>
      <label
        >Description (FR)<textarea
          class="input"
          [(ngModel)]="event().description_fr"
          name="description_fr"
        ></textarea>
      </label>
      <label>Category<input class="input" [(ngModel)]="event().category" name="category" /></label>
      <label
        >Status
        <select class="input" [(ngModel)]="event().status" name="status">
          <option value="DRAFT">DRAFT</option>
          <option value="PUBLISHED">PUBLISHED</option>
        </select>
      </label>
      <div style="display:flex; gap:8px;">
        <button type="submit" class="btn primary">Save</button>
        <button type="button" class="btn" (click)="back()">Cancel</button>
      </div>
    </form>
  `,
})
export class EventFormComponent {
  private route = inject(ActivatedRoute);
  private apollo = inject(Apollo);
  private router = inject(Router);
  event = signal<any | null>(null);

  constructor() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.apollo
      .watchQuery({ query: EVENT_QUERY, variables: { id } })
      .valueChanges.subscribe((res: any) => this.event.set(res?.data?.event ?? null));
  }

  save() {
    const model = this.event();
    if (!model) return;
    this.apollo
      .mutate({
        mutation: UPDATE_EVENT,
        variables: { id: model.id ?? model.slug, input: { ...model } },
      })
      .subscribe(() => this.router.navigateByUrl('/events'));
  }

  back() {
    this.router.navigateByUrl('/events');
  }
}
