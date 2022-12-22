<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;
    protected $table = 'user_subscription';

    public function User()
	{
		return $this->hasOne(User::class,'id','userId');
	}

    public function Plan()
    {
        return $this->hasOne(Plan::class,'id','planId');
    }
}
