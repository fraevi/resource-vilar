<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Beverage extends Model
{
    use HasFactory;

    protected $primaryKey = 'bev_id';

    protected $fillable = [
        'bev_name',
        'bev_category',
        'bev_description',
        'bev_price',
        'created_by',
    ];

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
