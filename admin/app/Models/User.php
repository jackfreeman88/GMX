<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\State;
use App\Models\MedRec;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    const CREATED_AT = 'createdAt';
	const UPDATED_AT = 'updatedAt';
	const DELETED_AT = 'deletedAt';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getFullNameAttribute()
    {
        // return ucfirst($this->firstName)." ".ucfirst($this->lastName);
        return ucfirst($this->businessName);    
    }

    public function State()
    {
        return $this->hasOne(State::class,'id','stateId');
    }

    public function BrandDetails()
    {
        return $this->hasOne(BrandDetails::class,'userId','id');
    }

    public function license()
    {
        return $this->belongsTo(MedRec::class,'medRecId','id');
    }
}
