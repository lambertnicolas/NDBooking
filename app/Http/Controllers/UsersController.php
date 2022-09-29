<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\URL;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class UsersController extends Controller
{
    public function index()
    {
        return Inertia::render('Users', [
            'users' => User::all()->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                ];
            }),
        ]);
    }

    public function edit()
    {
        $user = DB::table('users')
            ->select('users.*')
            ->where('users.id', auth()->user()->id)
            ->get();

        return inertia::render('Account', ['user' => $user]);
    }

    public function update(Request $request)
    {
        if(!isset ($request->password)){
            $user = User::find(Auth::id());
            $user->update(
                [
                    'name' => $request->name,
                    'email' => $request->email,
                    'restaurant' => $request->restaurant,
                    'address' => $request->address,
                    'password' => \auth()->user()->getAuthPassword(),
                ]
            );
        }
        else {
            $user = User::find(Auth::id());
            $user->update(
                [
                    'name' => $request->name,
                    'email' => $request->email,
                    'restaurant' => $request->restaurant,
                    'address' => $request->address,
                    'password' => bcrypt($request->password),
                ]
            );
        }
        return redirect()->action(
            [UsersController::class, 'edit']
        );
    }
}
