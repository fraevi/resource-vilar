<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BeverageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        DB::table('beverages')->insert([
            [
                'bev_name' => 'Classic Latte',
                'bev_category' => 'Coffee',
                'bev_description' => 'A creamy espresso-based beverage with steamed milk.',
                'bev_price' => 80.00,
                'created_by' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'bev_name' => 'Chamomile Tea',
                'bev_category' => 'Tea',
                'bev_description' => 'A soothing cup of antioxidant-rich chamomile tea.',
                'bev_price' => 120.00,
                'created_by' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'bev_name' => 'Strawberry Smoothie',
                'bev_category' => 'Smoothie',
                'bev_description' => 'A refreshing blend of strawberries and yogurt.',
                'bev_price' => 140.00,
                'created_by' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'bev_name' => 'Original Ramune',
                'bev_category' => 'Soda',
                'bev_description' => 'Classic Ramune soda with a unique marble stopper and refreshing citrus flavor.',
                'bev_price' => 120.00,
                'created_by' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
