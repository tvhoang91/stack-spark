import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { useNavigate, useParams } from 'react-router'
import type { Product, UpdateProductPayload } from './fake-backend/product.type'
import { useProduct, useUpdateProduct } from './product-queries'

export function ProductEditSheet() {
  const { productId } = useParams<{ productId: string }>()
  const navigate = useNavigate()
  const { data: product, isLoading } = useProduct(productId!)

  const [open, setOpen] = useState(true)
  const [formData, setFormData] = useState<UpdateProductPayload>({
    name: '',
    status: 'draft',
    price: 0,
    description: '',
    image: '',
  })

  const updateProduct = useUpdateProduct()

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        status: product.status,
        price: product.price,
        description: product.description,
        image: product.image,
      })
    }
  }, [product])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!product) return

    try {
      await updateProduct.mutateAsync({ id: product.id, payload: formData })
      navigate('/products')
    } catch (error) {
      console.error('Failed to update product:', error)
    }
  }

  const handleInputChange = (field: keyof UpdateProductPayload, value: string | number | Product['status']) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleClose = () => {
    setOpen(false)
    setTimeout(() => {
      navigate('../..')
    }, 300)
  }

  const isLoaded = !isLoading && product
  const isError = !isLoading && !product

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      {isLoading && (
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Loading...</SheetTitle>
          </SheetHeader>
          <div className="grid flex-1 auto-rows-min gap-6 px-4">Loading product...</div>
        </SheetContent>
      )}

      {isError && (
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Error</SheetTitle>
          </SheetHeader>
          <div className="grid flex-1 auto-rows-min gap-6 px-4">Product not found</div>
        </SheetContent>
      )}

      {isLoaded && (
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit Product</SheetTitle>
          </SheetHeader>
          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Product name"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value as Product['status'])}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="trash">Trash</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Price</label>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Product description"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background min-h-[100px]"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Image URL</label>
                <Input
                  value={formData.image}
                  onChange={(e) => handleInputChange('image', e.target.value)}
                  placeholder="https://..."
                  required
                />
                {formData.image && (
                  <div className="mt-2">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-24 h-24 object-cover rounded border"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" disabled={updateProduct.isPending} className="flex-1">
                  {updateProduct.isPending ? 'Updating...' : 'Update Product'}
                </Button>
                <Button type="button" variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </SheetContent>
      )}
    </Sheet>
  )
}
