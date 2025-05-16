<?php

namespace App\Http\Controllers\Admin;

use App\Events\ProductDeleteResponseInAdmin;
use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    public function index()
    {
        return Inertia::render('products/Index', [
            'products' => Product::all(),
            'user' => Auth::user(),
        ]);
    }

    public function create()
    {
        return Inertia::render('products/Create');
    }

    public function destroy(Product $product)
    {
        
        // $admin = User::where('is_admin', 1)->first();

        $admin = User::where('is_admin', 1)->first();

        // Check if $admin is found
        if (!$admin) {
            \Log::error("No admin user found.");
            return redirect()->back()->with('error', 'No admin found to handle the broadcast.');
        }
        
        try {
            \Log::info("Dispatching ProductDeleteResponseInAdmin event for product: {$product->id}");
            broadcast(new ProductDeleteResponseInAdmin($product, $admin))->toOthers();
        } catch (\Exception $e) {
            \Log::error('Broadcast error: ' . $e->getMessage());
        }


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

    public function status(Product $product)
    {
        $product->status = $product->status == 'active' ? 'inactive' : 'active';
        $product->save();
        return redirect()->back()->with("success", 'Product Status Update Successfully');
    }
}
