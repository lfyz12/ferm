import { $authHost, $host } from "../http";

const AuthService =  {  
    async login(number, password){
        return new Promise((resolve) => resolve($authHost.post('api/user/login', {number, password})))
    },

    async registration(number, password){
        return new Promise((resolve) => resolve($authHost.post('api/user/registration', {number, password})))
    },

    async logout(){
        return new Promise((resolve) => resolve($authHost.post('api/user/logout')))
    },

    async changeDefaultAddressByNumber(defaultAddress, number) {
        return new Promise((resolve) => resolve($authHost.put('api/user/changeDefaultAddressByNumber', {defaultAddress, number})))
    },

    async changeDefaultAddressById(defaultAddress, id) {
        return new Promise((resolve) => resolve($authHost.put('api/user/changeDefaultAddressByID', {defaultAddress, id})))
    },

    async changeNumberById(number, id) {
        return new Promise((resolve) => resolve($authHost.put('api/user/changeNumberByID', {number, id})))
    },

    async changeNameById(name, id) {
        return new Promise((resolve) => resolve($authHost.put('api/user/changeNameByID', {name, id})))
    },

    async changeNumberAndNameById(number, name, id) {
        return new Promise((resolve) => resolve($authHost.put('api/user/changeNumberAndNameByID', {number, name, id})))
    },

    async changeAllById(defaultAddress, number, name, id) {
        return new Promise((resolve) => resolve($authHost.put('api/user/changeAllByID', {defaultAddress, number, name, id})))
    },

    async changePasswordByNumber(number, password) {
        return new Promise((resolve) => resolve($host.put('api/user/changePasswordbyNumber', {number, password})))
    },

    async cheackCode(number, code) {
        return new Promise((resolve) => resolve($host.post(`api/user/cheackCode`, {number, code})))
    }
} 

export default AuthService;