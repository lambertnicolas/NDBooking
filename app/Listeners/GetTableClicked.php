<?php

namespace App\Listeners;

use App\Events\TableClick;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class GetTableClicked
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\TableClick  $event
     * @return void
     */
    public function handle(TableClick $event)
    {
        //
    }
}
