<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    function index() {
        $users = User::latest()->get();
        return $users;
    }

    function store(Request $request) {
        return User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password
        ]);
    }
}
