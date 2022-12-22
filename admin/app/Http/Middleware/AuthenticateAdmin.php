<?php

namespace App\Http\Middleware;

use Closure,Auth;
use Illuminate\Http\Request;

class AuthenticateAdmin
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
        if (Auth::guard('admin')->check()) {
			return $next($request);
		}

		return redirect('login')->with([
				'warning' => 'You must have to be logged in.',
            ]);
    }
}
