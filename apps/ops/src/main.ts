import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { ApolloLink, InMemoryCache } from '@apollo/client/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { CustomTranslateLoader } from './app/i18n/custom-loader';
import { jwtInterceptor } from './app/interceptors/jwt.interceptor';

function createApollo(httpLink: HttpLink) {
  const uri =
    (window as any).__env?.API_URL || process.env['API_URL'] || 'http://localhost:4000/graphql';
  const http = httpLink.create({ uri, withCredentials: true });
  const auth = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem('token');
    if (token) {
      operation.setContext({ headers: { Authorization: `Bearer ${token}` } });
    }
    return forward(operation);
  });
  return {
    link: auth.concat(http),
    cache: new InMemoryCache(),
    connectToDevTools: true,
  };
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([jwtInterceptor])),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: { provide: TranslateLoader, useClass: CustomTranslateLoader },
        defaultLanguage: 'en',
      }),
    ),
    HttpLink,
    { provide: APOLLO_OPTIONS, useFactory: createApollo, deps: [HttpLink] },
  ],
}).catch((err) => console.error(err));
