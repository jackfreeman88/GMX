<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class EmailTemplate extends Model
{
    use HasFactory;
    use SoftDeletes;
	protected $table = 'email_template';

	public $timestamps = true;

	const CREATED_AT = 'createdAt';
	const UPDATED_AT = 'updatedAt';
	const DELETED_AT = 'deletedAt';

	protected $fillable = [
		'header_id',
		'footer_id',
		'title',
		'subject',
		'body',
		'status'
	];

	public function hasTemplateHeader() {
		return $this->hasOne('App\Models\EmailTemplateHeader','id','headerId');
	}

	public function hasTemplateFooter() {
		return $this->hasOne('App\Models\EmailTemplateFooter','id','footerId');
    }
}
