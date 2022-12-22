<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BrandDetails extends Model
{
    use HasFactory;

    const CREATED_AT = 'createdAt';
	const UPDATED_AT = 'updatedAt';
	// const DELETED_AT = 'deletedAt';

    protected $table = 'brand_details';
}
