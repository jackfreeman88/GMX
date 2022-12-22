<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class EmailTemplateFooter extends Model
{
    use HasFactory;
    use SoftDeletes;
	protected $table = 'email_template_footer';

	const CREATED_AT = 'createdAt';
	const UPDATED_AT = 'updatedAt';
	const DELETED_AT = 'deletedAt';
	
	public $timestamps = true;

	protected $fillable = [
		'title',
		'description',
		'status'
	];
	protected $dates = ['deleted_at'];
}
