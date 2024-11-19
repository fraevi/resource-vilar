<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProvinceRequest;
use App\Http\Requests\StoreRegionRequest;
use App\Http\Requests\StoreBeverageRequest;
use App\Models\Province;
use App\Models\Region;
use App\Models\Beverage;

class AddResourceController extends Controller
{
    public function addRegion(StoreRegionRequest $request)
    {
        Region::create($request->validated());

        session()->flash('message', 'Succcessfuly created a new region');
    }

    public function addProvince(StoreProvinceRequest $request)
    {
        Province::create($request->validated());

        session()->flash('message', 'Succcessfuly created a new province');
    }

    public function addBeverage(StoreBeverageRequest $request)
    {
        Beverage::create($request->validated());

        session()->flash('message', 'Succcessfuly created a new beverage');
    }
}
