import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { DetailsComponent } from './components/pages/details/details.component';
import { CartComponent } from './components/pages/cart/cart.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'search/:searchTerm',
        component: HomeComponent
    },
    {
        path: 'jersey/:id',
        component: DetailsComponent
    },
    {
        path: 'cart',
        component: CartComponent
    }
];
