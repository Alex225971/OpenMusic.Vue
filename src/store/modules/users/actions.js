import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    async registerUser(context, data) {
        const userData = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password
        };

        var response = await fetch('https://localhost:7229/api/Auth/register', {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: new Headers({'content-type': 'application/json'})
        });

        if(response.status > 199 && response.status < 300) {
            //If the registration was successful we want to log in the user so they don't have to log in immediately after

            response = await fetch('https://localhost:7229/api/Auth/login', {
                method: 'POST',
                body: JSON.stringify({
                    email: data.email,
                    password: data.password
                }),
                headers: new Headers({'content-type': 'application/json'})
            }); 
            const responseData = await response.json();

            localStorage.setItem('token', responseData.token);
            localStorage.setItem('userId', responseData.userId);

            context.commit('setUser', {
                ...userData,
                firstName: data.firstName,
                lastName: data.lastName,
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
            headers: new Headers({'content-type': 'application/json'})
        });

        const responseData = await response.json();

        localStorage.setItem('firstName', data.firstName);
        localStorage.setItem('lastName', data.lastName);
        localStorage.setItem('token', responseData.token);
        localStorage.setItem('userId', responseData.userId);

        context.commit('setUser', {
            ...userData,
            userId: responseData.userId,
            token: responseData.token
        });
    },
    checkAuth(context) {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if(token && userId) {
            context.commit('setUser', {
                userId: userId,
                token: token
            });
        }
    },
    async logoutUser(context) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');

        context.commit('setUser', {
            token: null,
            userId: null
        });
        toast.success(`Logged out, see you soon`, {
            autoClose: 2000,
        });
    }
};