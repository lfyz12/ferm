import { makeAutoObservable } from "mobx";
import AssortmentService from "../service/AssortmentService";

export default class ProductStore {
    constructor() {
        this._products = []
        makeAutoObservable(this)
    }

    setProducts(products) {
        this._products = products
    }

    async getAllByAvailable(available) {
        const response = await AssortmentService.getAllByAvailable(available);
        // console.log(response.data)
        this.setProducts(response.data)
        // console.log(this._products)
    }

    async getAllByTypeAndAvailable(type, available) {
        const response = await AssortmentService.getAllByTypeAndAvailable(type, available);
        // console.log(response.data)
        this.setProducts(response.data)
        // console.log(this._products)
    }

    get products() {
        return this._products
    }
}