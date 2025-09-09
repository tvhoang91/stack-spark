import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Filter, Plus } from 'lucide-react'
import { Outlet, useNavigate, useSearchParams } from 'react-router'
import type { Product } from './fake-backend/product.type'
import { ProductsTable } from './ProductsTable'

export function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const status = (searchParams.get('status') as Product['status']) ?? null

  const handleStatusFilterChange = (newStatus: string) => {
    const newSearchParams = new URLSearchParams(searchParams)
    if (newStatus === 'all') {
      newSearchParams.delete('status')
    } else {
      newSearchParams.set('status', newStatus)
    }
    newSearchParams.set('page', '0') // Reset to first page
    setSearchParams(newSearchParams)
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Products</h1>
              <p className="text-muted-foreground text-sm text-balance">Showcase Complex Fetching - TanStack Query</p>
            </div>
            <Button onClick={() => navigate('create')}>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <span className="text-sm font-medium">Filter by status:</span>
          <Select value={status || 'all'} onValueChange={(value) => handleStatusFilterChange(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="trash">Trash</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <ProductsTable />

        <Outlet />
      </div>
    </QueryClientProvider>
  )
}

const queryClient = new QueryClient()
