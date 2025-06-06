<?php

use App\Http\Controllers\Admin\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Events\DummyBroadcastTestEvent;

Route::get('/broadcast-test', function () {
    broadcast(new DummyBroadcastTestEvent('Hello from Dummy Event!'));
    return 'Dummy broadcast event dispatched.';
});

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');


    Route::resource('products', ProductController::class);
    Route::post('products/{product}', [ ProductController::class, 'status'])->name('products.status');
});


// class Service {
//     public function info()
//     {
//         return "hello world";
//     }
// }

// Route::get("/service", function(Service $service){
//     return $service->info();
// });

Route::get('/abort', function(){
    abort(404);
})->name('abort.check');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
