<?php

use App\Http\Controllers\AddResourceController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProvinceController;
use App\Http\Controllers\RegionController;
use App\Http\Controllers\BeverageController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::patch('/beverages/{beverage}', [BeverageController::class, 'update'])->name('beverages.update');
    Route::delete('/beverages/{beverage}', [BeverageController::class, 'destroy'])->name('beverages.destroy');

    Route::post('/region', [AddResourceController::class, 'addRegion'])->name('add.region');
    Route::post('/province', [AddResourceController::class, 'addProvince'])->name('add.province');

    // Resource routes for Regions, Provinces, and Beverages
    Route::resource('regions', RegionController::class);
    Route::resource('provinces', ProvinceController::class);

    // Beverage Routes
    Route::resource('beverages', BeverageController::class);
});

require __DIR__.'/auth.php';
