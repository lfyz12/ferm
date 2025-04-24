import { makeAutoObservable } from "mobx";
import AdminService from "../service/AdminService";


export default class AdminStore {
    constructor() {
        this._users = []
        makeAutoObservable(this)
    }

    setUsers(users) {
        this._users = users
    }

    async getAll() {
        const response = await AdminService.fetchUsers()
        this.setUsers(response.data)
    }


    get users() {
        return this._users
    }
}