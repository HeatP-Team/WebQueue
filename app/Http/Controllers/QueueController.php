<?php

namespace App\Http\Controllers;

use App\User;

class QueueController extends Controller
{
    public function queue() {
        return view('queue')->withUsers(User::all());
    }
}
