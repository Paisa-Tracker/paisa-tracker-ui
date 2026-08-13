import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { ExpenseTab } from './components/expense-tab/expense-tab';
import { DashboardContent } from './components/dashboard-content/dashboard-content';
import { AddExpense } from './components/add-expense/add-expense';
import { Loans } from './components/loans/loans';
import { AddLoan } from './components/loans/add-loan/add-loan';
import { TabFeatures } from './components/tab-features/tab-features';
import { TabSecurity } from './components/tab-security/tab-security';
import { TabPricing } from './components/tab-pricing/tab-pricing';
import { TabSupport } from './components/tab-support/tab-support';
import { Splits } from './components/splits/splits';
import { CreateSplit } from './components/create-split/create-split';
import { Profile } from './components/profile/profile';

export const routes: Routes = [
    { path: '', component: TabFeatures },
    { path: 'security', component: TabSecurity},
    { path: 'pricing', component: TabPricing},
    { path: 'support', component: TabSupport},
    { path: 'register', loadComponent: () => import('./components/session/register-user/register-user').then(m => m.RegisterUser) },
    { path: 'login', loadComponent: () => import('./components/session/login-user/login-user').then(m => m.LoginUser) },
    { path: 'dashboard', component: Dashboard, children: [
        { path: 'content', component: DashboardContent},
        { path: 'expenses', component: ExpenseTab},
        { path: 'add-expense', component: AddExpense},
        { path: 'splits', component: Splits},
        { path: 'create-split', component: CreateSplit},
        { path: 'loans', component: Loans},
        { path: 'add-emi', component: AddLoan},
        { path: 'profile', component: Profile}
    ]}
    
];
