<?php


use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//TODO: Think about using Auth::routes()
Route::get('/queue', 'QueueController@queue')->middleware('auth');

Route::get('/auth', 'Auth\AuthController@showAuthForm')->name('login');

Route::post('/login', 'Auth\LoginController@login');

Route::post('/register', 'Auth\RegisterController@register');

Route::get('email/verify/{id}/{hash}', 'Auth\VerificationController@verify')->name('verification.verify');
Route::get('email/resend', 'Auth\VerificationController@resend')->name('verification.resend');
//