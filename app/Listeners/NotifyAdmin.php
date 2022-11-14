<?php

namespace App\Listeners;

use App\Events\NewReport;
use Illuminate\Support\Facades\Mail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class NotifyAdmin
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
     * @param  \App\Events\NewReport  $event
     * @return void
     */
    public function handle(NewReport $event)
    {
        $data = [
            'clientId'     =>  $event->data['client_id'],
            'clientEmail'  =>  $event->data['client_email'],
            'clientMobile' =>  $event->data['client_mobile'],
            'description'  =>  $event->data['description'],
        ];

        Mail::send('emails.notify_admin',$data,function($m) use($data){
            $m->to('admin@admin.admin')->subject('New report has been added!');
        });
    }
}
