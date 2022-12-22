<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MedRec extends Model
{
    use HasFactory;
    use SoftDeletes;
	const CREATED_AT = 'createdAt';
	const UPDATED_AT = 'updatedAt';
	const DELETED_AT = 'deletedAt';
    protected $table = 'med_rec';

	protected $fillable = [
		'isActive',
		'id',
		'title',
        'createdAt',
        'updatedAt',
        'deletedAt'
	];
}
