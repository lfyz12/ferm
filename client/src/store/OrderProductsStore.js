import { makeAutoObservable } from "mobx";
import OrderProductsService from "../service/OrderProductsService";

export default class OrderProductsStore {
    constructor() {
        this._orderProducts = []
        makeAutoObservable(this)
    }

    appendOrderProduct(orderProduct) {
        this._orderProducts = [...this._orderProducts, orderProduct]
    }

    deleteOrderProducts() {
        this._orderProducts = []
    }

    setOrderProducts(orderProducts) {
        this._orderProducts = orderProducts
    }

    async createOrderProduct(orderId, assortmentId, count, moreOrLess) {
        const responce = await OrderProductsService.createOrderProduct(orderId, assortmentId, count, moreOrLess)
        this.appendOrderProduct(responce.data)
    }

    async getAllOrderProductsByOrderId(orderId) {
        const responce = await OrderProductsService.getAllOrderProductsByOrderId(orderId)
        this.setOrderProducts(responce.data)
    }

    async getOrderProductsWithAssortmentInfoByOrderId(orderId) {
        const response = await OrderProductsService.getOrderProductsWithAssortmentInfoByOrderId(orderId)
        this.setOrderProducts(response.data)
    }

    async deleteAllOrderProductsByOrderId(orderId) {
        await OrderProductsService.deleteAllOrderProductsByOrderId(orderId)
        this.deleteOrderProducts()
    }

    get orderProducts() {
        return this._orderProducts
    }
}