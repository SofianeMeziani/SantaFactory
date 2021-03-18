// // axios
// import axios from 'axios'


import axios from 'axios'

import store from './store/store'

//const APIUrl = 'localhost:8081/'
//const baseURL = 'localhost:8081/'

// const APIUrl_prod = 'http://192.168.1.50:8000'
const APIUrl_prod = 'http://127.0.0.1:8081/'
// const APIUrl_prod = 'http://192.168.2.32:8000/'
// const baseURL_prod = 'http://192.168.1.50:8000/'

export default axios.create({
    APIUrl_prod
    // You can add your headers here
})

const axiosBase = axios.create({
    baseURL: APIUrl_prod,

})
const getAPI = axios.create({
    baseURL: APIUrl_prod,

})

// let isRefreshing = false;
// let subscribers = [];


let isAlreadyFetchingAccessToken = false
let subscribers = []

function onAccessTokenFetched(access_token) {
    subscribers = subscribers.filter(callback => callback(access_token))
}

function addSubscriber(callback) {
    subscribers.push(callback)
}

getAPI.interceptors.response.use(
    (response) => {
        console.log(config)
        return response;
    },
    (err) => {
        const {
            config,
            response: {status, data},
        } = err;

        const originalRequest = config;


        if (status === 401) {
            // console.log(isRefreshing)
            if (isAlreadyFetchingAccessToken === false) {
                console.log(data['messages'][0].message);
                isAlreadyFetchingAccessToken = true;
                store
                    .dispatch("auth/refreshToken")
                    .then((data) => {
                        console.log(data.access)
                        if (data.status === 200 || data.status === 204) {
                            isAlreadyFetchingAccessToken = false;
                            onAccessTokenFetched(data.access)
                        }

                    })
                    .catch((error) => {
                        store
                            .dispatch("auth/logoutUser")
                        console.error(error);
                    });
                // originalRequest.headers['Authorization'] = `Bearer ${data.access}`;
                //
                // return getAPI(error.response.config);
                const retryOriginalRequest = new Promise((resolve) => {
                    addSubscriber(access_token => {
                        originalRequest.headers.Authorization = 'Bearer ' + access_token
                        resolve(getAPI(originalRequest))
                    })
                })
                return retryOriginalRequest
            }
            return Promise.reject(error)


        }
    }
);


//
//
// getAPI.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     (err) => {
//         const {
//             config,
//             response: {status, data},
//         } = err;
//
//         const originalRequest = config;
//
//
//         if (status === 401) {
//             console.log(isRefreshing)
//             if (isRefreshing === false) {
//                 console.log(data['messages'][0].message);
//                 isRefreshing = true;
//                 store
//                     .dispatch("auth/refreshToken")
//                     .then((data) => {
//                         console.log(data.access)
//                         if (data.status === 200 || data.status === 204) {
//                             isRefreshing = false;
//                         }
//                         subscribers = [];
//
//                         originalRequest.headers['Authorization'] = `Bearer ${data.access}`;
//
//                         return new Promise((resolve, reject) => {
//                             getAPI.request(originalRequest).then(response => {
//                                 console.log('helllooo')
//                                 console.log(response)
//                                 resolve(response);
//                             }).catch((error) => {
//                                 reject(error);
//                             })
//                         });
//                     })
//                     .catch((error) => {
//                         console.error(error);
//                     });
//             }
//
//
//             // resolve(getAPI(originalRequest));
//             // const requestSubscribers = new Promise((resolve) => {
//             //     subscribeTokenRefresh(() => {
//             //
//             //         resolve(getAPI(originalRequest));
//             //     });
//             // });
//
//             // onRefreshed();
//             //
//             // return requestSubscribers;
//         }
//     }
// );

function subscribeTokenRefresh(cb) {
    subscribers.push(cb);
}

function onRefreshed() {
    subscribers.map((cb) => cb());
}

subscribers = [];
// getAPI.interceptors.response.use(undefined, function (err) {
//
//     // if error response status is 401, it means the request was invalid due to expired access token
//     if (err.config && err.response && err.response.status === 401) {
//         console.log('hello------');
//         store.dispatch('auth/refreshToken') // attempt to obtain new access token by running 'refreshToken' action
//             .then(access => {
//                 console.log('hello')
//                 // if successful re-send the request to get the data from server
//                 axios.request({
//                     baseURL: APIUrl,
//                     method: 'get',
//                     headers: {Authorization: `Bearer ${access}`}, // the new access token is attached to the authorization header
//                     url: 'api/v1/auth/user/'
//                 }).then(response => {
//                     // if successfully received the data store it in store.state.APIData so that 'Downloads' component can grab the
//                     // data from it and display to the client.
//                     console.log('Success getting the Mods')
//                     store.auth.state.APIData = response.data
//                 }).catch(err => {
//                     console.log('Got the new access token but error while trying to fetch data from the API using it')
//                     return Promise.reject(err)
//                 })
//             })
//             .catch(err => {
//                 console.log('hello error');
//                 return Promise.reject(err)
//             })
//     }
// })

export {axiosBase, getAPI}
