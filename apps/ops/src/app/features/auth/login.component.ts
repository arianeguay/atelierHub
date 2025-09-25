import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Staff Login</h2>
    <form class="form" (ngSubmit)="submit()">
      <label>Email<input class="input" name="email" [(ngModel)]="email()" /></label>
      <label
        >Password<input class="input" type="password" name="password" [(ngModel)]="password()"
      /></label>
      <button class="btn primary" type="submit">Sign in</button>
    </form>
    <p style="max-width:560px;">
      Demo: this form stores a JWT token in localStorage. In a real app, you'd call a login
      mutation.
    </p>
  `,
})
export class LoginComponent {
  email = signal('admin@atelierhub.dev');
  password = signal('password');
  constructor(private router: Router) {}
  submit() {
    // Demo JWT for ADMIN role; the API verify uses JWT_SECRET and decodes fields only.
    const payload = {
      sub: 'demo-admin',
      role: 'ADMIN',
      email: this.email(),
      iat: Math.floor(Date.now() / 1000),
    };
    // Store a fake token; for local dev you can paste a real one too.
    localStorage.setItem('token', btoa(JSON.stringify(payload)));
    this.router.navigateByUrl('/events');
  }
}
