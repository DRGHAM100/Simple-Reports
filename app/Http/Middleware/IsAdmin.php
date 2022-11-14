<?php

namespace App\Http\Middleware;

use Auth;
use Closure;
use Illuminate\Http\Request;


class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if(Auth::user()->type == 1)
            return $next($request);
        else 
            return redirect('/home');
    }
}
