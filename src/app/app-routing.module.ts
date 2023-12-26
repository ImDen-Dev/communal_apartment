import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoBlockComponent } from '@shared/components/info-block/info-block.component';
import { AuthGuard } from '@shared/guards';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'services' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        ({ AuthenticationModule }) => AuthenticationModule,
      ),
  },
  {
    path: 'services',
    canActivate: [() => inject(AuthGuard).canActivate()],
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
