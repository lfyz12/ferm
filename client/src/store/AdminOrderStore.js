import {getAtom, makeAutoObservable} from "mobx";
import OrderService from "../service/OrderService";
import ComplitedOrdersService from "../service/ComplitedOrdersService";

export default class AdminOrderStore {
    constructor() {
        this._orders = []
        makeAutoObservable(this)
    }

    setOrders(orders) {
        this._orders = orders
    }

    async deleteOrder(id) {
        await OrderService.delOrder(id)
    }

    async createComplitedOrderByOrderId(orderId) {
        await ComplitedOrdersService.createComplitedOrderByOrderId(orderId)
    }

    async getAll() {
        const responce = await OrderService.getAll()
        this.setOrders(responce.data)
    }
}