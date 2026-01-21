import { Routes } from '@angular/router';
import { AdminLogin } from './admin/admin-login/admin-login';
import { AdminNavbar } from './admin/admin-navbar/admin-navbar';
import { AdminRooms } from './admin/admin-rooms/admin-rooms';
import { AdminBookings } from './admin/admin-bookings/admin-bookings';
import { AdminAccount } from './admin/admin-account/admin-account';
import { AdminRoom } from './admin/admin-room/admin-room';
import { AdminCalendar } from './admin/admin-calendar/admin-calendar';
import { AdminUsers } from './admin/admin-users/admin-users';
import { GuestHomePage } from './guest/guest-home-page/guest-home-page';

export const routes: Routes = [
    { path: '', component: AdminLogin },
    { path: 'home', component: GuestHomePage },
    { path: 'login', component: AdminLogin },
    { path: 'navbar', component: AdminNavbar,
        children: [
            { path: '', redirectTo: 'calendar', pathMatch: 'full' },
            { path: 'calendar', component: AdminCalendar },
            { path: 'rooms', component: AdminRooms },
            { path: 'room/:id', component: AdminRoom },
            { path: 'bookings', component: AdminBookings },            
            { path: 'users', component: AdminUsers },
            { path: 'account', component: AdminAccount }, 
         ]
    },     
];