import { makeAutoObservable } from "mobx";
import ComplitedOrdersService from "../service/ComplitedOrdersService";


export default class ComplitedOrdersStore {
    constructor() {
        this._complitedOrders = []
        this._totalCount = 0
        makeAutoObservable(this)
    }

    setComplitedOrders(complitedOrders) {
        this._complitedOrders = complitedOrders.rows
        this._totalCount = complitedOrders.count
    }

    async getAllComplitedOrdersByUserId(userId, limit, page) {
        const response = await ComplitedOrdersService.getAllComplitedOrdersByUserId(userId, limit, page)
        this.setComplitedOrders(response.data)
    }

    async getComplitedOrderByComplitedOrderId(complitedOrderId) {
        const responce = await ComplitedOrdersService.getComplitedOrderByComplitedOrderId(complitedOrderId)
        this.setComplitedOrders(responce.data)
    }

    async createComplitedOrder(userId, address, complitedSum, orderTime, complitedTime) {
        const responce = await ComplitedOrdersService.createComplitedOrder(userId, address, complitedSum, orderTime, complitedTime)
        this._complitedOrders = [...this._complitedOrders, responce.data]
        return responce.data
    }

    async repeatOrder(complitedOrderId, basketId) {
        await ComplitedOrdersService.repeatOrder(complitedOrderId, basketId)
    }

    get complitedOrders() {
        return this._complitedOrders
    }
}