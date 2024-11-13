<?php

namespace App\Http\Controllers;

use App\Models\Beverage;
use Inertia\Inertia;
use App\Http\Requests\StoreBeverageRequest;
use App\Http\Requests\UpdateBeverageRequest;
use App\Http\Resources\BeverageResource;
use Illuminate\Http\Request;

class BeverageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $model = Beverage::query()
            ->where('bev_name', 'like', '%'.request()->query('search').'%')
            ->orderBy(
                request('sort_field', 'created_at'),
                request('sort_direction', 'desc')
            )
            ->paginate(5)
            ->appends(request()->query());

        return Inertia::render('Beverages/Index', [
            'model' => BeverageResource::collection($model),
            'queryParams' => request()->query(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Beverages/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBeverageRequest $request)
    {
        Beverage::create($request->validated());

        session()->flash('message', 'Successfully created a new drink');

        return redirect(route('beverages.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Beverage $beverage)
    {
        $everage = Beverage::with('createdBy')->findOrFail($beverage->id);

        return Inertia::render('Beverages/Show', [
            'beverage' => new BeverageResource($beverage)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Beverage $beverage)
    {
        return Inertia::render('Beverages/Edit', [
            'beverage' => new BeverageResource($beverage)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $bev_id)
{
    // Find the Beverage by bev_id
    $beverage = Beverage::find($bev_id);

    // Check if the Beverage exists
    if (!$beverage) {
        return response()->json(['error' => 'Drink not found'], 404);
    }

    // Update the Beverage with new data
    $beverage->update([
        'bev_name' => $request->bev_name,
        'bev_category' => $request->bev_category,
        'bev_description' => $request->bev_description,
        'bev_price' => $request->bev_price,
    ]);

    // Flash success message to the session
    session()->flash('message', 'Successfully updated the drink');

    // Redirect or return a response
    return redirect(route('beverages.index'));
}


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Beverage $beverage)
    {
        $beverage->delete();

        session()->flash('message', 'Successfully deleted the drink');

        return redirect(route('beverages.index'));
    }
}
