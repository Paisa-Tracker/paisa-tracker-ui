import { Routes } from '@angular/router';
import { LandingScreen } from './components/landing-screen/landing-screen';
import { SessionComponent } from './components/session/session.component';
import { Dashboard } from './components/dashboard/dashboard';

export const routes: Routes = [
    { path: '', component: LandingScreen },
    { path: 'register' , component: SessionComponent, data: {showRegister: true} },
    { path: 'signin' , component: SessionComponent, data: {showRegister: false} },
    { path: 'dashboard', component: Dashboard}
    
];
