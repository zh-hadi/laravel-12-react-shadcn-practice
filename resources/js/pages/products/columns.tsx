"use client"
import { router } from "@inertiajs/react"
import { Badge } from "@/components/ui/badge"
import { ColumnDef } from "@tanstack/react-table"

import { MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Product = {
  id: string
  name: string,
  brand: string,
  price: number,
  category_id: number,
  status: "active" | "inactive" 
}

const handelDelete = (id: string) => {
    router.delete(`/products/${id}`,{
        preserveScroll:true,
    })
}

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "brand",
    header: "Brand",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "category_id",
    header: "Category",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({row}) => {
        const status =  row.getValue('status')

        if(status === 'active'){
            return <Badge variant="success">Active</Badge>
        }else {
            return <Badge variant="destructive">Inactive</Badge>
        }
    }
  },
  {
    header: "Toggle",
    id: "toggle",
    cell: ({row}) => {
      const data = row.original;
      const [isActive, setIsActive] = useState(data.status == 'active' ? true : false)

      

      return (
        <div>

          <Switch checked={isActive} onClick={() => {
            router.post(route('products.status', data.id),{}, {preserveScroll: true});
            setIsActive(!isActive);
          }}/>
        </div>
      )
    },
  },
  {
    header: "Action",
    id: "actions",
    cell: ({ row }) => {
      const product = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={()=> handelDelete(product.id)}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
