<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name,
            'brand' => fake()->company,
            'price' => fake()->numberBetween(10, 1000),
            'category_id' => fake()->numberBetween(0, 10),
            'status' => fake()->randomElement(['active', 'inactive']),
        ];
    }
}
