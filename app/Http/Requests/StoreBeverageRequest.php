<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBeverageRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'bev_name' => 'required|string|unique:beverages,bev_name|max:255',
            'bev_category' => 'required|string',
            'bev_description' => 'required|string|max:255',
            'bev_price' => 'required|numeric|min:0.01',
            'created_by' => 'required',
        ];
    }
}
