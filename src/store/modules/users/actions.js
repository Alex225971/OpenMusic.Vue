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
            toast.success("Registration was successful", {
              autoClose: 2000,
            });

            context.commit('setUser', {
                ...userData,
                userId: response.userId,
                token: response.token
            });
            return;
        } else {
            console.log(response)
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
        console.log(responseData);

        if(response.status > 199 && response.status < 300) {
            toast.success(`Successfully logged in`, {
              autoClose: 2000,
            });
        }

        console.log(responseData.token);
        context.commit('setUser', {
            ...userData,
            userId: responseData.userId,
            token: responseData.token
        });
    }
};