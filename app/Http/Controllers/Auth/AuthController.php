<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\View\View;

class AuthController extends Controller
{
    /**
     * Show the application's login form.
     *
     * @return View
     */
    public function showAuthForm()
    {
        return view('auth');
    }
}
