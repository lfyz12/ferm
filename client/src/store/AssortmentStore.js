import { makeAutoObservable } from "mobx";
import AssortmentService from "../service/AssortmentService";

export default class AssortmentStore {
    constructor() {
        this._assortments = []
        this._assortment = {}
        makeAutoObservable(this)
    }

    setProducts(assortments) {
        this._assortments = assortments
    }

    setAssortment(assortment) {
        this._assortment = assortment
    }


    async getById(id) {
        const response = await AssortmentService.getById(id);
        this.setAssortment(response.data)
        return true
    }






    async getAllByAvailable(available) {
        const response = await AssortmentService.getAllByAvailable(available);
        this.setProducts(response.data)
    }

    async getAll() {
        const response = await AssortmentService.getAll();
        this.setProducts(response.data)
    }

    async getByName(name) {
        const response = await AssortmentService.getAllByName(name);
        this.setProducts(response.data)
    }

    async getByType(type) {
        const response = await AssortmentService.getAllByType(type);
        this.setProducts(response.data)
    }

    async getByTypeAndName(type, name) {
        const response = await AssortmentService.getAllByTypeAndName(type, name);
        this.setProducts(response.data)
    }

    async getAssortmentByIds(ids) {
        const response = await AssortmentService.getAssortmentByIds(ids)
        this.setProducts(response.data)
    }








    async create(formData){
        await AssortmentService.create(formData)
    }

    async changeAllById(formData){
        await AssortmentService.changeAllById(formData)
    }

    async changeAllTextById(formData){
        await AssortmentService.changeAllTextById(formData)
    }


    async deleteOneById(id){
        await AssortmentService.deleteOneById(id)
    }


    get assortments() {
        return this._assortments
    }

    get assortment() {
        return this._assortment
    }
}