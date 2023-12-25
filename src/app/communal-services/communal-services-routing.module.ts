import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccordionComponent } from './accordion/accordion.component';

const routes: Routes = [{ path: '', component: AccordionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class CommunalServicesRoutingModule {}
