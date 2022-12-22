<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Admin extends Authenticatable
{
    protected $table = 'admin';

	protected $fillable = [
		'id',
		'name',
		'email',
		'password',
		'rememberToken',
		'status',
	];

	protected $hidden = [
		'password',
		'rememberToken',
	];

	public function getRememberToken()
	{
		return $this->rememberToken;
	}

	public function setRememberToken($value)
	{
		$this->rememberToken = $value;
	}

	public function getRememberTokenName()
	{
		return 'rememberToken';
	}
}
