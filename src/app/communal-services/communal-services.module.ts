import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunalServicesRoutingModule } from './communal-services-routing.module';
import { AccordionComponent } from './accordion/accordion.component';
import { CommunalServiceComponent } from './communal-service/communal-service.component';
import { MaterialModule } from '../material.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [AccordionComponent, CommunalServiceComponent],
  imports: [
    CommunalServicesRoutingModule,
    CommonModule,
    SharedModule,
    MaterialModule,
  ],
})
export class CommunalServicesModule {}
