<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
// use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\User;

class Product extends Model
{
    use HasFactory;
    // use SoftDeletes;
	const CREATED_AT = 'createdAt';
	const UPDATED_AT = 'updatedAt';
	// const DELETED_AT = 'deletedAt';
    protected $table = 'products';

	protected $fillable = [
		'isActive',
		'id',
		'userId',
		'title',
		'slug',
		'categoryId',
		'medRecId',
		'price',
		'strainId',
		'dominant',
		'iOId',
		'harvested',
		'thc',
		'description',
        'createdAt',
        'updatedAt',
        // 'deletedAt'
	];

    public function user()
    {
        return $this->hasOne(User::class,'id','userId');
    }

    public function category()
    {
        return $this->hasOne(Category::class,'id','categoryId');
    }

    public function medRec()
    {
        return $this->hasOne(MedRec::class,'id','categoryId');
    }
    public function strain()
    {
        return $this->hasOne(Strain::class,'id','strainId');
    }
    public function ioro()
    {
        return $this->hasOne(IoRo::class,'id','iOId');
    }
}
