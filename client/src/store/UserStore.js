import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser";
import AuthService from "../service/AuthService";
import axios from "axios";
import { $authHost, $host } from "../http";
import PhoneInputMask from "../InputMasks/PhoneInputMask";


export default class UserStore {

    constructor() {
        this._isAuth = false
        this._user = new IUser()
        this.isLoading = false
        makeAutoObservable(this)
    }

    setIsLoading(bool) {
        if (this._isAuth) {
            this.isLoading = bool;
        } 
    }

    setIsActivated(bool) {
        this._user.isActivated = bool
    }

    setDefaultAdress(adress) {
        this._user.defaultAddress = adress
    }

    setNumber(number) {
        this._user.number = number
    }

    setName(name) {
        this._user.name = name
    }

    setPassword(password) {
        this._user.password = password
    }

    setAll(defaultAddress, number, name) {
        this._user.defaultAddress = defaultAddress
        this._user.number = number
        this._user.name = name
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }

    setUser(user) {
        this._user = user
    }

    get isAuth() {
        return this._isAuth 
    }

    get user() {
        return this._user
    }

    async changeDefaultAddressByNumber(defaultAddress, number) {
        const phoneMask = new PhoneInputMask()
        const response = await AuthService.changeDefaultAddressByNumber(defaultAddress,
            phoneMask.formatNumberToBackend(number));
        this.setDefaultAdress(defaultAddress)
    }

    async changeDefaultAddressById(defaultAddress, id) {
        const response = await AuthService.changeDefaultAddressById(defaultAddress, id)
        this.setDefaultAdress(defaultAddress)
    }

    async changeNumberById(number, id) {
        const phoneMask = new PhoneInputMask();
        const response = await AuthService.changeNumberById(phoneMask.formatNumberToBackend(number), id)
        this.setNumber(number)
    }

    async changeNameById(name, id) {
        const response = await AuthService.changeNameById(name, id)
        this.setName(name)
    }

    async changeNumberAndNameById(number, name, id) {
        const phoneMask = new PhoneInputMask()
        const response = await AuthService.changeNumberAndNameById(phoneMask.formatNumberToBackend(number), name, id)
        this.setNumber(number)
        this.setName(name)
    }

    async changeAllById(defaultAddress, number, name, id) {
        const phoneMask = new PhoneInputMask()
        const response = await AuthService.changeAllById(defaultAddress,
            phoneMask.formatNumberToBackend(number), name, id)
        this.setAll(defaultAddress, number, name)
    }

    async changePasswordByNumber(number, password) {
        const phoneMask = new PhoneInputMask()
        const response = await AuthService.changePasswordByNumber(phoneMask.formatNumberToBackend(number), password);
        this.setPassword(password)
    }
    
    async login(number, password) {
        try {
            const phoneMask = new PhoneInputMask()
            const response = await AuthService.login(phoneMask.formatNumberToBackend(number), password);
            localStorage.setItem('token', response.data.accessToken);
            this.setIsAuth(true)
            this.setUser(response.data.user)
            return true
        } catch (e) {
            return false
        }
    }

    async registration(number, password) {
        try {
            console.log(number)
            const phoneMask = new PhoneInputMask()
            const response = await AuthService.registration(phoneMask.formatNumberToBackend(number), password);
            localStorage.setItem('token', response.data.accessToken);
            this.setIsAuth(true)
            this.setUser(response.data.user)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('token');
            this.setIsAuth(false)
            this.setUser(new IUser())
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async checkAuth() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}api/user/refresh`, { withCredentials: true })
            localStorage.setItem('token', response.data.accessToken);
            this.setIsAuth(true)
            this.setUser(response.data.user)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async checkCode(number, code) {
        try {
            const phoneMask = new PhoneInputMask()
            number = phoneMask.formatNumberToBackend(number)
            const response = await $host.put(`${process.env.REACT_APP_API_URL}api/user/activate`,
                { number, code })
            localStorage.setItem('token', response.data.accessToken);
            this.setIsAuth(true)
            this.setUser(response.data.user)
            return response
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async checkCodeForRecovPassword(number, code) {
        const phoneMask = new PhoneInputMask()
        const response = await AuthService.cheackCode(phoneMask.formatNumberToBackend(number), code)
        return response;
    }

    async sendCode(number) {
        const phoneMask = new PhoneInputMask()
        number = phoneMask.formatNumberToBackend(number)
        const response = await $host.put(`${process.env.REACT_APP_API_URL}api/user/sendCode`, { number })
        return response
    }

}