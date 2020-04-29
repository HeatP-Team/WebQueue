<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\User;

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testBasicTest()
    {
        $user = factory(User::class)->make()->toArray();
        $user["password"] = 42;
        User::create($user);
        $response =  $this->post("/login",[
            "login" => $user["login"],
            "password" => 42
        ]);
        $tmp = $response->json();
        var_dump($tmp);
        $this->assertEquals($tmp["success"], true);
    }
}