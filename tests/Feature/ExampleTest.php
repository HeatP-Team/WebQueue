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
        $response = $this->post("/login", [
            "login" => "232323",
            "password" => "12121212"
        ])->json();
        print_r($response);
        $this->assertTrue(true);
    }
}