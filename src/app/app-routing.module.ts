import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { OrderListComponent } from './components/order-list/order-list.component';

const routes: Routes = [
  { path:  '', pathMatch:  'full', redirectTo:  'sign-in'},
  { path:"sign-in", component: SignInComponent},
  { path:"sign-up", component: SignUpComponent},
  { path:"order-list", component: OrderListComponent},
  { path:"**", component: SignInComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
