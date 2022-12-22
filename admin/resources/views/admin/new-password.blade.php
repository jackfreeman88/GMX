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
                            {!! Form::open(['url'=>url('confirm-new-password'),'id'=>'confirmnewpasswordform']) !!}
                            <input type="hidden" name="id" value="{{$id ?? '0'}}">
                                <div class="form-wrap">
                                    <div class="form-group">
                                        <label class="col-form-label fs-14">New Password</label>
                                        <input type="password" name="password" id="password" class="form-control fs-14" placeholder="Please Enter New Password" />
                                    </div>
                                    <div class="form-group">
                                        <label class="col-form-label fs-14">Confirm Password</label>
                                        <input type="password" name="confirmpassword" id="confirmpassword" class="form-control fs-14" placeholder="Please Enter Confirm Password" />
                                    </div>
                                    <div class="text-center mb-3 mt-3">
                                        <button type="submit" class="btn btn-rounded btn-primary btn-wh-180-50">Save</button>
                                    </div>
                                    <div class="text-center">
                                        <a class="btn btn-rounded btn-outline-primary" href="{{ url('admin/login') }}">Login Here!</a>
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