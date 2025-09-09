import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { productDb } from './fake-backend/product.db'
import type { Product, UpdateProductPayload } from './fake-backend/product.type'

export function useProducts(payload: Parameters<typeof productDb.getProducts>) {
  return useQuery({
    queryKey: ['products', 'query', payload],
    queryFn: () => productDb.getProducts(...payload),
    placeholderData: keepPreviousData,
  })
}

export function useProduct(id: string) {
  return useQuery({ queryKey: ['products', 'by-id', id], queryFn: () => productDb.getProduct(id) })
}

export function useCreateProduct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: productDb.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products', 'query'] })
    },
  })
}

export function useUpdateProduct() {
  const queryClient = useQueryClient()
  return useMutation<Product | null, unknown, { id: string; payload: UpdateProductPayload }>({
    mutationFn: ({ id, payload }) => productDb.updateProduct(id, payload),
    onSuccess: (product) => {
      queryClient.invalidateQueries({ queryKey: ['products', 'query'] })
      if (product) {
        queryClient.setQueryData(['products', 'by-id', product.id], product)
      }
    },
  })
}

export function useDeleteProduct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: productDb.deleteProduct,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['products', 'query'] })
      queryClient.removeQueries({ queryKey: ['products', 'by-id', id] })
    },
  })
}

export function useBulkUpdateStatus() {
  const queryClient = useQueryClient()
  return useMutation<Product[], unknown, { ids: string[]; status: Product['status'] }>({
    mutationFn: ({ ids, status }) => productDb.bulkUpdateStatus(ids, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

export function useBulkDeleteProduct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: productDb.bulkDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}
