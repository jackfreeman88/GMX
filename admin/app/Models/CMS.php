<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CMS extends Model
{
    use HasFactory;
    use SoftDeletes;
	const CREATED_AT = 'createdAt';
	const UPDATED_AT = 'updatedAt';
	const DELETED_AT = 'deletedAt';
    protected $table = 'cms';

	protected $fillable = [
		'page_name',
		'slug',
		'content'
	];

	protected $casts = [
		'content' => 'array',
	];
	protected $dates = ['deletedAt'];
}
