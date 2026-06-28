import { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus } from "lucide-react"

export const metadata: Metadata = {
  title: "Product Management",
  description: "Manage products and inventory.",
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { search?: string; page?: string }
}) {
  const search = searchParams?.search || ""
  const page = Number(searchParams?.page) || 1
  const limit = 10
  const skip = (page - 1) * limit

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where: {
        isDeleted: false,
        OR: search ? [
          { name: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ] : undefined,
      },
      include: { category: true },
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.product.count({
      where: {
        isDeleted: false,
        OR: search ? [
          { name: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ] : undefined,
      },
    }),
  ])

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Products</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>

      <div className="flex items-center justify-between py-4">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            placeholder="Search products..."
            className="h-8 w-[150px] lg:w-[250px]"
          />
          <Button variant="secondary" size="sm" className="h-8">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Inventory</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No products found.
                </TableCell>
              </TableRow>
            )}
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category?.name || "Uncategorized"}</TableCell>
                <TableCell>${product.price.toString()}</TableCell>
                <TableCell>{product.inventory}</TableCell>
                <TableCell>
                  <Badge variant={product.status === 'ACTIVE' ? 'default' : product.status === 'DRAFT' ? 'secondary' : 'destructive'}>
                    {product.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
