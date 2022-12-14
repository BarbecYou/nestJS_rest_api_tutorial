import { Injectable, NotFoundException } from "@nestjs/common"
import { Product } from './product.model'

@Injectable()
export class ProductsService{
    products: Product[] = []

    insertProduct(title: string, desc: string, price: number){
        const prodId = Math.random().toString()
        const newProduct = new Product(prodId, title, desc, price)
        this.products.push(newProduct)
        
        return prodId
    }

    getProducts(){
        return [...this.products]
    }

    getSpecificProduct(prodId: string){
       return {...this.findProduct(prodId)[0]}
    }

    updateProduct(prodId: string, title: string, desc: string, price: number) {
        const [product, index] = this.findProduct(prodId)
        const updatedProduct = {...product}
        if (title) {
            updatedProduct.title = title
        }
        if (desc) {
            updatedProduct.description = desc
        }
        if (price){
            updatedProduct.price = price
        }

        this.products[index] = updatedProduct
    }

    deleteProduct(prodId: string){
        const [_, index] = this.findProduct(prodId)
        this.products.splice(index, 1)
    }

    private findProduct(id: string): [Product, number]{
        const productIndex = this.products.findIndex(x => x.id === id)
        const product = this.products[productIndex]
        if (!product) {
            throw new NotFoundException('Could not find product')
        }
        
        return [product, productIndex]
    }
}