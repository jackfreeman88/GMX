<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Review extends Model
{
    use HasFactory;
    use SoftDeletes;
	const CREATED_AT = 'createdAt';
	const UPDATED_AT = 'updatedAt';
	const DELETED_AT = 'deletedAt';

	protected $fillable = [
		'isActive',
		'id',
		'productId',
		'brandId',
		'retailerId',
		'type',
		'ratings',
		'description',
	];

	public function Product()
	{
		return $this->hasOne(Product::class,'id','productId');
	}

	public function Retailer()
	{
		return $this->hasOne(User::class,'id','retailerId');
	}

	public function Brand()
	{
		return $this->hasOne(User::class,'id','brandId');
	}

	public function getTypeAttribute($value)
    {
		if($value == 1):
			return 'Product';
		elseif($value == 2):
			return 'delivery';
		else:
			return 'general';
		endif;    
    }
}
