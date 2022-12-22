<header class="admin-header">
    <div class="container-fluid">
        <div class="row align-items-center">
            <div class="col">
                <div class="navbar-brand-wrap d-flex align-items-center">
                    <a class="navbar-brand" href="{{url('/')}}">
                        <img class="max" src="{{ env('ASSETS_URL')._get_setting('logo') }}" alt="Logo">
                        <img class="min" src="{{ env('ASSETS_URL')._get_setting('minlogo') }}" alt="Logo">
                    </a>
                    <a href="javascript:void(0)" class="admin-menutoggle my-2"><i class="fal fa-bars"></i></a>
                </div>
            </div>
            <div class="col-auto">
                <div class="user-area">Welcome, {{ auth()->guard('admin')->user()->name ?? "" }}
                    <a href="{{ url('logout') }}" class="link-logout"><i class="fas fa-sign-out-alt"></i></a>
                </div>
            </div>
        </div>
    </div>
</header>