<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Mockery\CountValidator\Exception;
use Tests\TestCase;
use App\User;

class ExampleTest extends TestCase
{

    /**
     * A basic test example.
     *
     * @return void
     * @throws \Illuminate\Contracts\Container\BindingResolutionException
     */
    public function testBasicTest()
    {
        $this->post("/register", [
            "login" => "100005",
            "password" => "12121212",
            "password_confirmation" => "12121212"
        ]);

        $this->assertTrue(true);


    }
}