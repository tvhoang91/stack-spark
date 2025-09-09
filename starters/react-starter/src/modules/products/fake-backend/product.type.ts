export type Product = {
  id: string
  name: string
  status: 'published' | 'draft' | 'trash'
  price: number
  description: string
  image: string
}

export type CreateProductPayload = Omit<Product, 'id'>
export type UpdateProductPayload = Partial<Omit<Product, 'id'>>
