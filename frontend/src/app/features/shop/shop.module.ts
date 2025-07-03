import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { HomeComponent } from '../../pages/home/home.component';
import { ProductListComponent } from '../../pages/product-list/product-list.component';
import { ProductDetailComponent } from '../../pages/product-detail/product-detail.component';
import { CartComponent } from '../../pages/cart/cart.component';
import { CheckoutComponent } from '../../pages/checkout/checkout.component';
import { OrderConfirmationComponent } from '../../pages/order-confirmation/order-confirmation.component';
import { MyOrdersComponent } from '../../pages/my-orders/my-orders.component';
import { OrderDetailComponent } from '../../pages/order-detail/order-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'order-confirmation/:id', component: OrderConfirmationComponent },
  { path: 'my-orders', component: MyOrdersComponent },
  { path: 'orders/:id', component: OrderDetailComponent }
];

@NgModule({
  declarations: [
    HomeComponent,
    ProductListComponent,
    ProductDetailComponent,
    CartComponent,
    CheckoutComponent,
    OrderConfirmationComponent,
    MyOrdersComponent,
    OrderDetailComponent
  ],
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class ShopModule {}
