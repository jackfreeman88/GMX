<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Plan extends Model
{
    use HasFactory;
    use SoftDeletes;
	const CREATED_AT = 'createdAt';
	const UPDATED_AT = 'updatedAt';
	const DELETED_AT = 'deletedAt';

	protected $fillable = [
		'isActive',
		'id',
		'title',
		'slug',
		'price',
		'description',
	];
}
