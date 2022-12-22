<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    public function User()
    {
        return $this->hasOne(User::class,'id','cancelledBy');
    }
    public function Brand()
    {
        return $this->hasOne(User::class,'id','brandId');
    }

    public function Retailer()
    {
        return $this->hasOne(User::class,'id','retailerId');
    }

    public function Product()
    {
        return $this->hasOne(Product::class,'id','productId');
    }
    public function Category()
    {
        return $this->hasOne(Category::class,'id','categoryId');
    }

    public function getStatusTextAttribute()
    {
        if($this->status == 1):
            return "Placed.";
        elseif($this->status == 2):
            return "Accepted.";
        elseif($this->status == 3):
            return "Cancelled.";
        elseif($this->status == 4):
            return "Delivered.";
        elseif($this->status == 5):
            return "Received.";
        elseif($this->status == 6):
            return "Completed.";
        endif;  
    }
}
