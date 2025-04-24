import { makeAutoObservable } from "mobx";
import CourierService from "../service/CourierService";


export default class CourierStore {
    constructor() {
        this._couriers = []
        makeAutoObservable(this)
    }

    setCouriers(couriers) {
        this._couriers = couriers
    }

    appendCouriers(couriers) {
        this._couriers = [...this._couriers, couriers]
    }

    async getAll() {
        const response = await CourierService.getAllCourier()
        this.setCouriers(response.data)
    }

    async createCourier( name, number) {
        const response = await CourierService.createCourier( name, number)
        this.appendCouriers(response.data)
    }

    async destroyCourier(number) {
        const response = await CourierService.destroyCourier(number)

    }


    get couriers() {
        return this._couriers
    }
}