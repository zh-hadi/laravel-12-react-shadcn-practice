import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Product, columns } from "./columns"
import { DataTable } from "./data-table"
import { Button } from '@/components/ui/button';
import { SquarePen } from 'lucide-react';
import { useState } from 'react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products',
    },
];

export default function Index({products}: {products: Product[]}) {

    const [value, setValue] = useState({
        name: '',
        brand: '',
        price: '',
        category_id: ''
    });


    const handelSubmit = (e) => {
        e.preventDefault();
        router.post('/products', value)
    }



    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className='p-10'>

            <div>
            
            <Dialog>
                <DialogTrigger asChild>
                <Button>
                    <SquarePen /> Add Product
                </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handelSubmit}>

                        <div className="grid gap-4 py-4">

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                            Name
                            </Label>
                            <Input id="name" value={value.name} onChange={(e) => setValue({...value, name: e.target.value})} className="col-span-3" />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                            Brand
                            </Label>
                            <Input id="brand" value={value.brand} onChange={(e) => setValue({...value, brand: e.target.value})} className="col-span-3" />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                            Price
                            </Label>
                            <Input id="price" value={value.price} onChange={(e) => setValue({...value, price: e.target.value})} className="col-span-3" />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                            Category ID
                            </Label>
                            <Input id="category_id" value={value.category_id} onChange={(e) => setValue({...value, category_id: e.target.value})} className="col-span-3" />
                        </div>
                        </div>
                        <DialogFooter>
                        <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
                </Dialog>
            </div>

            <div>
                <DataTable columns={columns} data={products} />
            </div>
            </div>
        </AppLayout>
    );
}
