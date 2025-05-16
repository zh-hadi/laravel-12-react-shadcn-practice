<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 't@g.c',
        ]);

        User::factory()->create([
            'name' => 'Admin',
            'email' => 'a@g.c',
            'is_admin' => 1
        ]);

        Product::factory()->count(100)->create();
    }
}
