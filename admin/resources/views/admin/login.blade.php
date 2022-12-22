@extends('admin.app.index-no-head-foot')
@section('content')
    <section class="login-section">
        <div class="container">
            <div class="mw-431 mx-auto">
                <div class="card border-0 card-dark bs-2">
                    <div class="card-body">
                        <div class="pt-3 pb-3 text-center">
                            <a href="{{url('/')}}"><img class="card-logo" width="160px" src="{{ env('ASSETS_URL')._get_setting('logo') }}"" alt="image" /></a>
                        </div>
                        <div class="login-form">
                            {!! Form::open(['url'=>url('/login'),'id'=>'signInForm']) !!}
                            <div class="form-wrap">
                                <div class="form-group">
                                    <label class="col-form-label fs-14">Email address</label>
                                    <input type="text" name="email" class="form-control fs-14" placeholder="Please Enter Email address" />
                                </div>
                                <div class="form-group">
                                    <label class="col-form-label fs-14">Password</label>
                                    <input type="password" name="password" class="form-control fs-14" placeholder="Please Enter Pasword" />
                                </div>
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col">
                                            <label class="lbl-checkbox cb-sm1 fs-14"><input type="checkbox" name="remember" /><span class="spn-checkbox"></span><text>   Remember me</text> </label>
                                        </div>
                                        <div class="col-md-auto">
                                            <a class="color-0799c3 text-decoration-underline fs-14" href="{{ url('forgotpassword') }}">Forgot Password?</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="text-center mb-3 mt-3">
                                    <button type="submit" class="btn btn-rounded btn-primary btn-wh-216-50">Sign in</button>
                                </div>
                            </div>
                            {!! Form::close() !!}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection