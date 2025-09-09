import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'
import { Edit, MoreHorizontal, Trash2 } from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router'
import type { Product } from './fake-backend/product.type'
import { useBulkDeleteProduct, useBulkUpdateStatus, useDeleteProduct, useProducts } from './product-queries'

export function ProductsTable() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const page = parseInt(searchParams.get('page') || '0')
  const limit = parseInt(searchParams.get('limit') || '10')
  const status = (searchParams.get('status') as Product['status']) ?? null
  const start = page * limit
  const { data, isLoading, error } = useProducts([start, limit, status])

  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const deleteProduct = useDeleteProduct()
  const bulkUpdateStatus = useBulkUpdateStatus()
  const bulkDelete = useBulkDeleteProduct()

  const handleEditProduct = (product: Product) => {
    navigate(`edit/${product.id}`)
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-20" />
        </div>
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500">Error loading products</div>
  }

  const products = data?.products || []
  const total = data?.total || 0

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? products.map((p) => p.id) : [])
  }

  const handleSelectProduct = (id: string, checked: boolean) => {
    setSelectedIds((prev) => (checked ? [...prev, id] : prev.filter((selectedId) => selectedId !== id)))
  }

  const handleBulkStatusUpdate = (newStatus: Product['status']) => {
    if (selectedIds.length > 0) {
      bulkUpdateStatus.mutate({ ids: selectedIds, status: newStatus })
      setSelectedIds([])
    }
  }

  const handleBulkDelete = () => {
    if (selectedIds.length > 0) {
      bulkDelete.mutate(selectedIds)
      setSelectedIds([])
    }
  }

  const handleDelete = (id: string) => {
    deleteProduct.mutate(id)
  }

  return (
    <div className="space-y-4">
      {selectedIds.length > 0 && (
        <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
          <span className="text-sm text-muted-foreground">{selectedIds.length} selected</span>
          <Button size="sm" variant="outline" onClick={() => handleBulkStatusUpdate('published')}>
            Publish
          </Button>
          <Button size="sm" variant="outline" onClick={() => handleBulkStatusUpdate('draft')}>
            Draft
          </Button>
          <Button size="sm" variant="outline" onClick={() => handleBulkStatusUpdate('trash')}>
            Trash
          </Button>
          <Button size="sm" variant="destructive" onClick={handleBulkDelete}>
            Delete
          </Button>
        </div>
      )}

      <div className="border rounded-lg">
        <div className="grid grid-cols-12 gap-4 p-4 border-b bg-muted/20 font-medium text-sm">
          <div className="col-span-1">
            <input
              type="checkbox"
              checked={selectedIds.length === products.length && products.length > 0}
              onChange={(e) => handleSelectAll(e.target.checked)}
              className="rounded"
            />
          </div>
          <div className="col-span-3">Name</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Price</div>
          <div className="col-span-3">Description</div>
          <div className="col-span-1">Actions</div>
        </div>

        {products.map((product) => (
          <div key={product.id} className="grid grid-cols-12 gap-4 p-4 border-b hover:bg-muted/50">
            <div className="col-span-1">
              <Checkbox
                checked={selectedIds.includes(product.id)}
                onCheckedChange={(checked) => handleSelectProduct(product.id, !!checked)}
              />
            </div>
            <div className="col-span-3">
              <div className="flex items-center gap-3">
                <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                <div>
                  <div className="font-medium">{product.name}</div>
                  <div className="text-sm text-muted-foreground">ID: {product.id.slice(0, 8)}...</div>
                </div>
              </div>
            </div>
            <div className="col-span-2">
              <Badge
                variant={
                  product.status === 'published' ? 'default' : product.status === 'draft' ? 'outline' : 'destructive'
                }
              >
                {product.status}
              </Badge>
            </div>
            <div className="col-span-2 font-medium">${product.price.toFixed(2)}</div>
            <div className="col-span-3 text-sm text-muted-foreground truncate">{product.description}</div>
            <div className="col-span-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleEditProduct(product)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleDelete(product.id)} className="text-red-600">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && <div className="text-center py-8 text-muted-foreground">No products found</div>}

      {total > limit && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div>
            Showing {start + 1} to {Math.min(start + limit, total)} of {total} products
          </div>
        </div>
      )}
    </div>
  )
}
