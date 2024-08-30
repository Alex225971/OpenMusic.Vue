import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import router from '../../../router';
import playlists from '../playlists';
import store from '../..';

export default {
    async registerUser(context, data) {
        const userData = {
            firstName: data.firstName,
            lastName: data.firstName,
            email: data.email,
            password: data.password
        };

        var response = await fetch('https://localhost:7229/api/Auth/register', {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: new Headers({ 'content-type': 'application/json' })
        });

        if (response.status > 199 && response.status < 300) {
            //If the registration was successful we want to log in the user so they don't have to log in immediately after

            response = await fetch('https://localhost:7229/api/Auth/login', {
                method: 'POST',
                body: JSON.stringify({
                    email: data.email,
                    password: data.password
                }),
                headers: new Headers({ 'content-type': 'application/json' })
            });
            const responseData = await response.json();

            localStorage.setItem('firstName', responseData.firstName);
            localStorage.setItem('token', responseData.token);
            localStorage.setItem('userId', responseData.userId);

            context.commit('setUser', {
                ...userData,
                firstName: responseData.firstName,
                userId: responseData.userId,
                token: responseData.token
            });
            return;
        } else {
            toast.error(`Error ${response.status} please try again`, {
                autoClose: 2000,
            });
        }
    },
    async loginUser(context, data) {
        const userData = {
            email: data.email,
            password: data.password
        };

        const response = await fetch('https://localhost:7229/api/Auth/login', {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: new Headers({ 'content-type': 'application/json' })
        });

        const responseData = await response.json();

        localStorage.setItem('firstName', responseData.firstName);
        localStorage.setItem('token', responseData.token);
        localStorage.setItem('userId', responseData.userId);

        context.commit('setUser', {
            ...userData,
            firstName: responseData.firstName,
            userId: responseData.userId,
            token: responseData.token
        });

        store.dispatch('playlists/getUserPlaylists');
    },
    checkAuth(context) {
        const firstName = localStorage.getItem('firstName');
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if (token && userId) {
            context.commit('setUser', {
                firstName: firstName,
                userId: userId,
                token: token
            });
        }
    },
    async logoutUser(context) {
        localStorage.removeItem('firstName');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');

        context.commit('setUser', {
            firstName: null,
            token: null,
            userId: null
        });

        context.commit('playlists/CLEAR_PLAYLISTS', null, { root: true });
        
        router.replace('/login');

        toast.success(`Logged out, see you soon`, {
            autoClose: 2000,
        });
    }
};