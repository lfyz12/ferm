import { makeAutoObservable } from "mobx";
import BasketProductService from "../service/BasketProductService";
import { BasketProduct } from "../models/BasketProduct";
import BasketService from "../service/BasketService";

export default class BasketProductStore {
    constructor() {
        this._basketProducts = []
        makeAutoObservable(this)
    }

    setBasketProducts(basketProduct) {
        this._basketProducts = basketProduct
    }

    async createBasketProduct(basketId, assortmentId, costPerOne, count, moreOrLess) {
        return await BasketProductService.createBasketProduct(basketId, assortmentId, costPerOne, count, moreOrLess);
        // console.log(this._products)
    }

    async getAllBasketProductsByBasketID(basketId) {
        const response = await BasketProductService.getAllBasketProductsByBasketID(basketId);
        this.setBasketProducts(response.data)
        return true
    }

    async getBasketProductsWithAssortmentInfoByBasketID(basketId) {
        const response = await BasketProductService.getBasketProductsWithAssortmentInfoByBasketID(basketId)
        this.setBasketProducts(response.data)
    }

    async deleteAllBasketProductsByBasketID(id) {
        const response = await BasketProductService.deleteAllBasketProductsByBasketID(id);
        // console.log(response.data)
        this.setBasketProducts(response.data)
        // console.log(this._products)
    }

    async deleteOneBasketProductByBasketIDAndAssortmentID(basketId, assortmentId) {
        return await BasketProductService.deleteOneBasketProductByBasketIDAndAssortmentID(basketId, assortmentId);
        // console.log(response)
        // this.setBasketProducts(response.data) 
        // console.log(this._products)
    }

    async changeMoreOrLessByBasketIDAndAssortmentID(basketId, assortmentId, moreOrLess) {
        const response = await BasketProductService.changeMoreOrLessByBasketIDAndAssortmentID(basketId, assortmentId, moreOrLess);
        // console.log(response.data)
        this.setBasketProducts(response.data)
        
        // console.log(this._products)
    }

    async changeMoreOrLessByBasketProductID(id, moreOrLess) {
        const response = await BasketProductService.changeMoreOrLessByBasketProductID(id, moreOrLess)
    }

    async changeCountByBasketIDAndAssortmentID(basketId, assortmentId, count) {
        const response = await BasketProductService.changeCountByBasketIDAndAssortmentID(basketId, assortmentId, count);
        //console.log(response.data[0])
        return response.data[0]
    }


    get basketProduct() {
        return this._basketProducts
    }
}