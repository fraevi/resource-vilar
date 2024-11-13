<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class BeverageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'bev_id' => $this->bev_id,
            'bev_name' => $this->bev_name,
            'bev_category' => $this->bev_category,
            'bev_description' => $this->bev_description,
            'bev_price' => $this->bev_price,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'created_by' => $this->createdBy,
        ];
    }
}
