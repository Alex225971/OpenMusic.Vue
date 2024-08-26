export default {
    async registerUser(context, data) {
        const userData = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password
        };

        const response = await fetch('https://localhost:7229/api/Auth/register', {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: new Headers({'content-type': 'application/json'})
        });
        console.log(response);

        if(response.status > 199 && response.status < 300) {
            console.log(response.status);
            window.location.href = 'login';
        }



        context.commit('registerUser', {
            ...userData,
            id: response.id
        });
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
        console.log(response);

        if(response.status > 199 && response.status < 300) {
            console.log(response.status);
            window.location.href = 'home';
        }



        context.commit('registerUser', {
            ...userData,
            id: response.id
        });
    }
};