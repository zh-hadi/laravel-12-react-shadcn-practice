import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, Link } from '@inertiajs/react';
import {  columns } from "./columns"
import { DataTable } from "./data-table"
import { Button } from '@/components/ui/button';
import { SquarePen } from 'lucide-react';
import { useEffect, useState } from 'react';

// import echo from '@/echo';

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

  import { Product, User } from '@/types'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Products',
        href: '/products',
    },
];

export default function Index({user, products, flash}: {user: User, products: Product[], flash: any}) {

    const [value, setValue] = useState({
        name: '',
        brand: '',
        price: '',
        category_id: ''
    });


    const handelSubmit = (e: any) => {
        e.preventDefault();
        router.post('/products', value)
    }


    useEffect(()=> {
        window.Echo?.private(`product.${user.id}`)
        .listen('ProductDeleteResponseInAdmin', (event: any) => {
            console.log(event);
        });

        // window.Echo.channel('test-channel')
        // .listen('.dummy.event', (e) => {
        //     console.log('Dummy Event Received:', e.message);
        // });
    }, []);

   



    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className='p-10'>

            {flash.success && (
                <div>{flash.success}</div>
            )}

            <div>
            
                <div>
                    <Link href="/products/create" >
                        <Button>
                            <SquarePen /> Add Product
                        </Button>
                    </Link>
                </div>
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
