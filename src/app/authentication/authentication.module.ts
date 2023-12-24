import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth/auth.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [AuthComponent],
  imports: [AuthenticationRoutingModule, CommonModule, SharedModule],
})
export class AuthenticationModule {}
