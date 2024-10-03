import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import playlists from '../playlists';
import store from '../../index.js';

export default {
    async executePreSearch(context, data) {

        var defaultParams = {
            pageNumber: 1,
            pageSize: 6,
            queryString: data
        }

        if(defaultParams.queryString ===  '') {
            context.commit('SET_SEARCH_RESULTS', null);
            return;
        }
        
        let token = store.getters['user/token'];
        let query = '?pageNumber=' + defaultParams.pageNumber + '&pageSize=' + defaultParams.pageSize + '&queryString=' + defaultParams.queryString;

        const response = await fetch(process.env.VUE_APP_BASE_API_URL +'search' + query, {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        var responseData = await response.json();

        context.commit('SET_SEARCH_RESULTS', responseData);
    },

    async setCurrentSearch(context, data) {
        context.commit('SET_CURRENT_SEARCH', data);
    }
};