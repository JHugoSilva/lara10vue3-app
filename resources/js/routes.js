import Dashboard from './components/Dashboard.vue';
import ListAppointments from './pages/appointments/ListAppointments.vue';
import LitUser from './pages/users/ListUser.vue';
import UpdateProfile from './pages/profile/UpdateProfile.vue';
import UpdateSetting from './pages/settings/UpdateSetting.vue';

export default [
    {
        path: '/admin/dashboard',
        name: 'admin.dashboard',
        component: Dashboard
    },
    {
        path: '/admin/appointments',
        name: 'admin.appointments',
        component: ListAppointments
    },
    {
        path: '/admin/user',
        name: 'admin.user',
        component: LitUser
    },
    {
        path: '/admin/settings',
        name: 'admin.settings',
        component: UpdateSetting
    },
    {
        path: '/admin/profile',
        name: 'admin.profile',
        component: UpdateProfile
    }
]
