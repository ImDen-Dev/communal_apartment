import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoBlockComponent } from '@shared/components/info-block/info-block.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'auth' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        ({ AuthenticationModule }) => AuthenticationModule,
      ),
  },
  {
    path: 'services',
    loadChildren: () =>
      import('./communal-services/communal-services.module').then(
        ({ CommunalServicesModule }) => CommunalServicesModule,
      ),
  },
  {
    path: 'info',
    component: InfoBlockComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
