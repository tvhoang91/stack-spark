import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCreateProduct } from './product-queries'
import type { CreateProductPayload, Product } from './fake-backend/product.type'

export function ProductCreateSheet() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<CreateProductPayload>({
    name: '',
    status: 'draft',
    price: 0,
    description: '',
    image: ''
  })

  const createProduct = useCreateProduct()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await createProduct.mutateAsync(formData)
      navigate('/products')
      setFormData({
        name: '',
        status: 'draft',
        price: 0,
        description: '',
        image: ''
      })
    } catch (error) {
      console.error('Failed to create product:', error)
    }
  }

  const handleInputChange = (field: keyof CreateProductPayload, value: string | number | Product['status']) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleClose = () => {
    navigate('/products')
  }

  return (
    <Sheet open={true} onOpenChange={handleClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create New Product</SheetTitle>
        </SheetHeader>
        
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
            <Button type="submit" disabled={createProduct.isPending} className="flex-1">
              {createProduct.isPending ? 'Creating...' : 'Create Product'}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClose}
            >
              Cancel
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}
