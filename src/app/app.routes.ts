import { Routes } from '@angular/router';
import { AdminLogin } from './admin/admin-login/admin-login';
import { AdminNavbar } from './admin/admin-navbar/admin-navbar';
import { AdminRooms } from './admin/admin-rooms/admin-rooms';
import { AdminBookings } from './admin/admin-bookings/admin-bookings';
import { AdminAccount } from './admin/admin-account/admin-account';
import { AdminRoom } from './admin/admin-room/admin-room';
import { AdminCalendar } from './admin/admin-calendar/admin-calendar';

export const routes: Routes = [
    { path: '', component: AdminLogin },
    { path: 'login', component: AdminLogin },
    { path: 'navbar', component: AdminNavbar,
        children: [
            
            { path: 'rooms', component: AdminRooms },
            { path: 'room/:id', component: AdminRoom },
            { path: 'bookings', component: AdminBookings },
            { path: 'calendar', component: AdminCalendar },
            { path: 'account', component: AdminAccount }, 
         ]
    },     
];