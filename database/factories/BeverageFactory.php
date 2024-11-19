<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Beverage>
 */
class BeverageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'bev_name' => fake()->name(),
            'bev_description' => fake()->text(),
            'region_id' => 1,
            'created_by' => 1,
        ];
    }
}
