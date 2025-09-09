import { rand, randImg, randNumber, randProductDescription, randProductName, randUuid } from '@ngneat/falso'
import type { CreateProductPayload, Product, UpdateProductPayload } from './product.type'

const generateProduct = (): Product => ({
  id: randUuid(),
  name: randProductName(),
  status: rand(['published', 'draft', 'trash']) as Product['status'],
  price: randNumber({ min: 10, max: 999, fraction: 2 }),
  description: randProductDescription(),
  image: randImg(),
})

const fakeDelay = (min = 200, max = 400) => {
  const delay = randNumber({ min, max })
  return new Promise((resolve) => setTimeout(resolve, delay))
}

class ProductDatabase {
  private products: Product[] = []

  constructor() {
    this.products = Array.from({ length: randNumber({ min: 41, max: 59 }) }, generateProduct)
  }

  async getProducts(
    start = 0,
    limit = 10,
    status?: Product['status'],
  ): Promise<{ products: Product[]; total: number }> {
    await fakeDelay()
    const products = this.products.filter((product) => (status ? product.status === status : true))
    return { products: products.slice(start, start + limit), total: products.length }
  }

  async getProduct(id: string): Promise<Product | null> {
    await fakeDelay()
    return this.products.find((product) => product.id === id) || null
  }

  async createProduct(payload: CreateProductPayload): Promise<Product> {
    await fakeDelay()
    const newProduct: Product = {
      id: randUuid(),
      ...payload,
    }
    this.products.push(newProduct)
    return newProduct
  }

  async updateProduct(id: string, payload: UpdateProductPayload): Promise<Product | null> {
    await fakeDelay()
    const index = this.products.findIndex((product) => product.id === id)
    if (index === -1) {
      return null
    }

    this.products[index] = {
      ...this.products[index],
      ...payload,
    }
    return this.products[index]
  }

  async deleteProduct(id: string): Promise<boolean> {
    await fakeDelay()
    const index = this.products.findIndex((product) => product.id === id)
    if (index === -1) {
      return false
    }

    this.products.splice(index, 1)
    return true
  }

  async bulkUpdateStatus(ids: string[], status: Product['status']): Promise<Product[]> {
    await fakeDelay()
    const updatedProducts: Product[] = []

    for (const id of ids) {
      const index = this.products.findIndex((product) => product.id === id)
      if (index !== -1) {
        this.products[index] = {
          ...this.products[index],
          status,
        }
        updatedProducts.push(this.products[index])
      }
    }

    return updatedProducts
  }

  async bulkDelete(ids: string[]): Promise<{ deletedCount: number; deletedIds: string[] }> {
    await fakeDelay()
    const deletedIds: string[] = []

    for (const id of ids) {
      const index = this.products.findIndex((product) => product.id === id)
      if (index !== -1) {
        this.products.splice(index, 1)
        deletedIds.push(id)
      }
    }

    return {
      deletedCount: deletedIds.length,
      deletedIds,
    }
  }
}

export const productDb = new ProductDatabase()
