import { Routes } from '@angular/router';
import { AdminLogin } from './admin-login/admin-login';
import { AdminNavbar } from './admin-navbar/admin-navbar';
import { AdminRooms } from './admin-rooms/admin-rooms';
import { AdminReviews } from './admin-reviews/admin-reviews';
import { AdminBookings } from './admin-bookings/admin-bookings';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';
import { AdminAccount } from './admin-account/admin-account';
import { AdminRoom } from './admin-room/admin-room';

export const routes: Routes = [
    { path: '', component: AdminLogin },
    { path: 'login', component: AdminLogin },
    { path: 'navbar', component: AdminNavbar,
        children: [
            
            { path: 'rooms', component: AdminRooms },
            { path: 'room/:id', component: AdminRoom },
            { path: 'reviews', component: AdminReviews },
            { path: 'bookings', component: AdminBookings },
            { path: 'dashboard', component: AdminDashboard }, 
            { path: 'account', component: AdminAccount }, 
         ]
    },     
];