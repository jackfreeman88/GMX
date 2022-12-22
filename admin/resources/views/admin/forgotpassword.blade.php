@extends('admin.app.index-no-head-foot')
@section('content')
    <section class="login-section">
        <div class="container">
        <div class="mw-431 mx-auto">
            <div class="card border-0 card-dark bs-2">
                    <div class="card-body">
                        <div class="pt-3 pb-3 text-center">
                        <a href="{{url('/')}}"><img class="card-logo" src="{{ env('ASSETS_URL')._get_setting('logo') }}" width="160px" alt="image" /></a>
                        </div>
                        <div class="login-form">
                            {!! Form::open(['url'=>url('forgotpassword'),'id'=>'forgotpasswordFrom']) !!}
                                <div class="form-wrap">
                                    <div class="form-group">
                                            <label class="col-form-label fs-14">Email address</label>
                                            <input type="email" name="email" class="form-control fs-14" placeholder="Please Enter Email address" />
                                    </div>
                                    <div class="text-center mb-3 mt-3">
                                        <button type="submit" class="btn btn-rounded btn-primary btn-wh-180-50">Recover Password</button>
                                    </div>
                                    <div class="text-center">
                                        <a class="btn btn-rounded btn-outline-primary" href="{{ url('login') }}">Login Here!</a>
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