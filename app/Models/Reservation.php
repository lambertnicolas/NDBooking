<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'couverts',
        'date',
        'table_id',
        'client_id',
        'service',
        'time',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'date' => 'date',
        'table_id' => 'integer',
        'client_id' => 'integer',
    ];

    public function client(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Client::class, 'client_id', 'id');
    }

    public function table(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Table::class, 'table_id', 'id');
    }
}
