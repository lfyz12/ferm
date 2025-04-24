import { makeAutoObservable } from "mobx";
import ComplitedOrderProductsService from "../service/ComplitedOrderProductsService"

export default class ComplitedOrderProductsStore {
    constructor() {
        this._complitedOrderProducts = []
        makeAutoObservable(this)
    }

    setComplitedOrderProducts(complitedOrderProducts) {
        this._complitedOrderProducts = complitedOrderProducts
    }

    async createComplitedOrderProducts(complitedOrderId, assortmentId, count) {
        return await ComplitedOrderProductsService.createComplitedOrderProduct(complitedOrderId, assortmentId, count)
    }

    async getAllComplitedOrderProductsByComplitedOrderId(complitedOrderId) {
        const response = await ComplitedOrderProductsService.getAllComplitedOrderProductsByComplitedOrderId(complitedOrderId)
        this.setComplitedOrderProducts(response.data)
    }

    async getComplitedOrderProductsWithAssortmentInfoByComplitedOrderId(complitedOrderId) {
        const response = await ComplitedOrderProductsService.getComplitedOrderProductsWithAssortmentInfoByComplitedOrderId(complitedOrderId)
        this.setComplitedOrderProducts(response.data)
    }

    get complitedOrderProducts() {
        return this._complitedOrderProducts
    }
}