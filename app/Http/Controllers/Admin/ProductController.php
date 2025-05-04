<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        return Inertia::render('products/Index', [
            'products' => Product::all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('products/Create');
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()->back()->with('success', 'Product Deleted Successfully!');
    }

    public function store()
    {
        $attributes = request()->validate([
            'name' => ['required'],
            'brand' => ['required'],
            'price' => ['required'],
            'category_id' => ['required'],
        ]);


        Product::create($attributes);

        return redirect()->back()->with('success', 'Product Add Successfully!');
    }
}
