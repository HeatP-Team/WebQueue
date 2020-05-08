<?php


namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;


class AuthController extends Controller
{
    protected const WRONG_CREDITS_ERROR             = 'wrongCredits';
    protected const FAILED_VALIDATION_ERROR         = 'failedValidation';

    protected const ERROR_TYPES = [
        self::WRONG_CREDITS_ERROR,
        self::FAILED_VALIDATION_ERROR
    ];

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    /**
     * Show the application's login form.
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function showLoginForm()
    {
        return view('auth');
    }


    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        if ($this->validationFails($request))
            return $this->sendFailedLoginResponse($request, self::FAILED_VALIDATION_ERROR);

        if ($this->loginFails($request))
            return $this->sendFailedLoginResponse($request, self::WRONG_CREDITS_ERROR);

        return $this->sendLoginResponse($request);
    }

    /**
     * @param Request $request
     * @return bool
     */
    protected function validationFails(Request $request)
    {
        return Validator::make($this->credentials($request), [
            'login' => 'required|gt:100005',
            'password' => 'required'
        ])->fails();
    }

    /**
     * Attempt to log the user into the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return bool
     */
    protected function loginFails(Request $request)
    {
        return !$this->guard()->attempt(
            $this->credentials($request), $request->filled('remember')
        );
    }

    /**
     * Get the needed authorization credentials from the request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    protected function credentials(Request $request)
    {
        return [
            'login' => $request->json()->get('login'),
            'password' => $request->json()->get('password')
        ];
    }

    /**
     * Send the response after the user was authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    protected function sendLoginResponse(Request $request)
    {
        $request->session()->regenerate();

        return response()->json([
            'success' => true,
            'url' => '/queue'
        ], 200);
    }

    protected function sendFailedLoginResponse(Request $request, String $reason)
    {
        return response()->json([
            'success' => false,
            'error'  => $reason
            ], 201);
    }


    /**
     * Log the user out of the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        //TODO: Finish and refactor this method
        $this->guard()->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->json([
            'success' => 'true'
        ], 204);
    }

    /**
     * Get the guard to be used during authentication.
     *
     * @return \Illuminate\Contracts\Auth\StatefulGuard
     */
    protected function guard()
    {
        return Auth::guard();
    }
}
