import { makeAutoObservable } from "mobx";
import OrderService from "../service/OrderService";
import Order from "../pages/Order/Order";

export default class OrderStore {
    constructor() {
        this._order = {}
        makeAutoObservable(this)
    }

    setOrder(order) {
        this._order = order
    }

    async delOrder(id){
        await OrderService.delOrder(id)
        this.setOrder({})
    }

    async createOrder(userId, address, aproxSum, onConfirm, comment, number) {
        const response = await OrderService.createOrder(userId, address, aproxSum, onConfirm, comment, number)
        this.setOrder(response.data)
    }

    async createOrderByBasketId(userId, address, aproxSum, onConfirm, basketId, comment, number) {
        const response = await OrderService.createOrderByBasketId(userId, address, aproxSum, onConfirm, basketId, comment, number)
        this.setOrder(response.data)
    }

    async getNotCanceledOrderByUserId(userId) {
        const response = await OrderService.getNotCanceledOrderByUserId(userId)
        this.setOrder(response.data)
    }

    async getOnConfirmOrderByUserId(userId) {
        const response = await OrderService.getOnConfirmOrderByUserId(userId)
        this.setOrder(response.data)
    }

    async getOrderByOrderId(id) {
        const response = await OrderService.getOrderByOrderId(id)
        this.setOrder(response.data)
    }

    async getOrderByUserId(userId) {
        const response = await OrderService.getOrderByUserId(userId)
        this.setOrder(response.data)
    }

    async getOneOrderByUserId(userId) {
        const response = await OrderService.getOneOrderByUserId(userId)
        this.setOrder(response.data)
    }

    async changeAddressByOrderId(id, address) {
        await OrderService.changeAddressByOrderId(id, address)
        this.getOrderByOrderId(id)
    }

    async changeOnConfirmByOrderId(id, onConfirm) {
        await OrderService.changeOnConfirmByOrderId(id, onConfirm)
        this.getOrderByOrderId(id)
    }

    async changeOnCreateByOrderId(id, onCreate) {
        await OrderService.changeOnCreateByOrderId(id, onCreate)
        this.getOrderByOrderId(id)
    }

    async changeOnDeliverByOrderId(id, onDeliver) {
        await OrderService.changeOnDeliverByOrderId(id, onDeliver)
        this.getOrderByOrderId(id)
    }

    async changeDeliveredByOrderId(id, delivered) {
        await OrderService.changeDeliveredByOrderId(id, delivered)
        this.getOrderByOrderId(id)
    }

    async changeOrderProductsCountByOrderId(id, orderProductsCount) {
        await OrderService.changeOrderProductsCountByOrderId(id, orderProductsCount)
        this.getOrderByOrderId(id)
    }

    async changeCourierNumber(id, orderProductsCount) {
        await OrderService.changeCourierNumber(id, orderProductsCount)
        this.getOrderByOrderId(id)
    }

    async changeCommentByOrderId(id, comment) {
        await OrderService.changeCommentByOrderId(id, comment)
        this.getOrderByOrderId(id)
    }

    async changeNumberByOrderId(id, number) {
        await OrderService.changeNumberByOrderId(id, number)
        this.getOrderByOrderId(id)
    }

    async changeCommentAndNumberByOrderId(id, comment, number) {
        await OrderService.changeCommentAndNumberByOrderId(id, comment, number)
        this.getOrderByOrderId(id)
    }

    async cancelOrderByIdFromUser(id) {
        await OrderService.cancelOrderByIdFromUser(id)
        this.getOrderByOrderId(id)
    }

    get order() {
        return this._order
    }
} 