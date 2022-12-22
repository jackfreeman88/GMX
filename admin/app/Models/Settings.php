<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Settings extends Model
{
    use HasFactory;
    protected $table = 'settings';
	const CREATED_AT = 'createdAt';
	const UPDATED_AT = 'updatedAt';

	protected $fillable = [
		'name',
		'description',
	];
}
