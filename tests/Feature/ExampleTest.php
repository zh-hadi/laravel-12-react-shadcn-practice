<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('returns a successful response', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
});


it('abort page test response example', function(){
    $response = $this->get('/abort');

    $response->assertStatus(404);
});

it('prodcut store method test', function(){
    $user = User::factory()->create(); // Create a user
    $this->actingAs($user); // Log the user in
    

    $data = [
        'name' => 'abc',
        'brand' => 'abcsss',
        'price' => 2003,
        'category_id' => 500,
    ];



    $response = $this->post('products' , $data);

    $response->assertSessionHasErrors(['brand']);
    $response->assertRedirect(route('products.index'));
});
