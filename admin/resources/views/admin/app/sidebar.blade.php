@php
global $path;
global $currentPath;

$path = Route::getFacadeRoot()->current()->uri();
$currentPathTemp = Request::fullUrl();
$currentPathTemp = explode(url('/').'/', $currentPathTemp);

$currentPath = '';
if( isset($currentPathTemp[1]) ) {
$currentPath = $currentPathTemp[1];
$currentPath = trim($currentPath);
}

function getActiveRoute( $arrayLinks ) {

$selected = false;

if( in_array($GLOBALS['path'], $arrayLinks) ) {
$selected = true;
}
elseif ( in_array($GLOBALS['currentPath'], $arrayLinks) ) {
$selected = true;
}

return $selected;
}
@endphp
<ul class="navbar-nav">
    @php
        $links_array = [
            'dashboard',
        ];
        $selected = getActiveRoute($links_array);
    @endphp
    <li class="nav-item @if( $selected ) active @endif">
        <a class="nav-link" href="{{ url('dashboard') }}">
            <i class="fa-fw fas fa-tachometer-alt"></i> 
            <text> Dashboard </text>
        </a>
    </li>

    @php
        $links_array = [
            'product',
            'product/add',
            'product/detail/{id}',
        ];
        $selected = getActiveRoute($links_array);
    @endphp
    <li class="nav-item @if( $selected ) active @endif">
        <a class="nav-link" href="{{ url('product') }}">            
            <i class="fa-fw fas fa-file-alt"></i>
            <text> Product </text>
        </a>
    </li>

    @php
        $links_array = [
            'categories',
            'categories/add',
            'categories/edit/{id}',
            'categories/search',
        ];
        $selected = getActiveRoute($links_array);
    @endphp
    <li class="nav-item @if( $selected ) active @endif">
        <a class="nav-link" href="{{ url('categories') }}">            
            <i class="fa-fw fas fa-boxes"></i>
            <text> Categories </text>
        </a>
    </li>


    @php
        $links_array = [
            'retailers',
            'retailers/edit/{id}',
            'retailers/search',
            'brands',
            'brands/edit/{id}',
            'brands/search',
            'unverified-brands',
            'unverified-brands/view/{id}',
        ];
        $selected = getActiveRoute($links_array);
    @endphp
    <li class="nav-item dropdown @if( $selected ) show @endif">
        <a href="javascript:void(0)" class="dropdown-toggle nav-link @if( $selected ) show @endif" data-bs-toggle="dropdown" data-bs-display="static" >            
            <i class="fa-fw fas fa-user-cog"></i>
            <text> User Management </text>
        </a>
        <ul class="dropdown-menu dropdown-menu-left @if( $selected ) show @endif">
            @php
                $links_array = [
                    'unverified-brands',
                    'unverified-brands/view/{id}',
                    'unverified-brands/search',
                ];
                $selected = getActiveRoute($links_array);
            @endphp
            <li class="nav-item @if( $selected ) active @endif">
                <a class="nav-link" href="{{url('unverified-brands')}}">
                    <i class="fa-fw fad fa-circle"></i>
                    <text>Unverified Brands</text>
                </a>
            </li>
            @php
                $links_array = [
                    'brands',
                    'brands/edit/{id}',
                    'brands/search',
                ];
                $selected = getActiveRoute($links_array);
            @endphp
            <li class="nav-item @if( $selected ) active @endif">
                <a class="nav-link" href="{{url('brands')}}">
                    <i class="fa-fw fad fa-circle"></i>
                    <text>Brands</text>
                </a>
            </li>
            @php
                $links_array = [
                    'retailers',
                    'retailers/edit/{id}',
                    'retailers/search',
                ];
                $selected = getActiveRoute($links_array);
            @endphp
            <li class="nav-item @if( $selected ) active @endif">
                <a class="nav-link" href="{{url('retailers')}}">
                    <i class="fa-fw fad fa-circle"></i>
                    <text>Retailers</text>
                </a>
            </li>
        </ul>
    </li>

    @php
        $links_array = [
            'subscription',
            'subscription/add',
            'subscription/edit/{id}',
            'subscription/search',
        ];
        $selected = getActiveRoute($links_array);
    @endphp
    <li class="nav-item @if( $selected ) active @endif">
        <a class="nav-link" href="{{ url('subscription') }}">                        
            <i class="fa-fw fas fa-file-certificate"></i>
            <text> Subscriptions </text>
        </a>
    </li>

    @php
        $links_array = [
            'review',
            'review/search',
            'review/detail/{id}',
        ];
        $selected = getActiveRoute($links_array);
    @endphp
    <li class="nav-item @if( $selected ) active @endif">
        <a class="nav-link" href="{{ url('review') }}">                        
            <i class="fa-fw fas fa-sliders-h"></i>
            <text> Reviews Management </text>
        </a>
    </li>

    @php
        $links_array = [
            'transaction',
            'transaction/detail/{id}',
        ];
        $selected = getActiveRoute($links_array);
    @endphp
    <li class="nav-item @if( $selected ) active @endif">
        <a class="nav-link" href="{{ url('transaction') }}">                        
            <i class="fa-fw far fa-credit-card"></i>
            <text> Transaction </text>
        </a>
    </li>

    @php
        $links_array = [
            'strain',
            'strain/add',
            'strain/edit/{id}',
            'strain/search',
        ];
        $selected = getActiveRoute($links_array);
    @endphp
    <li class="nav-item @if( $selected ) active @endif">
        <a class="nav-link" href="{{ url('strain') }}">                        
            <i class="fa-fw far fa-money-check-edit"></i>
            <text> Strains </text>
        </a>
    </li>

    @php
        $links_array = [
            'state',
            'state/add',
            'state/edit/{id}',
            'state/search',
        ];
        $selected = getActiveRoute($links_array);
    @endphp
    <li class="nav-item @if( $selected ) active @endif">
        <a class="nav-link" href="{{ url('state') }}">                        
            <i class="fa-fw far fa-money-check-edit"></i>
            <text> States </text>
        </a>
    </li>

    @php
        $links_array = [
            'med_rec',
            'med_rec/add',
            'med_rec/edit/{id}',
            'med_rec/search',
        ];
        $selected = getActiveRoute($links_array);
    @endphp
    <li class="nav-item @if( $selected ) active @endif">
        <a class="nav-link" href="{{ url('med_rec') }}">                        
            <i class="fa-fw fas fa-hand-holding-medical"></i>
            <text> Med / Rec </text>
        </a>
    </li>

    @php
        $links_array = [
            'orders',
            'orders/detail/{id}',
            'orders/search',
        ];
        $selected = getActiveRoute($links_array);
    @endphp
    <li class="nav-item @if( $selected ) active @endif">
        <a class="nav-link" href="{{ url('orders') }}">                        
            <i class="fa-fw far fa-money-check-edit"></i>
            <text> Manage Orders </text>
        </a>
    </li>

    @php
        $links_array = [
            'cms',
            'cms/add',
            'cms/edit/{slug}'
        ];
        $selected = getActiveRoute($links_array);
    @endphp
    <li class="nav-item @if( $selected ) active @endif">
        <a class="nav-link" href="{{url('cms')}}">
            <i class="fa-fw fal fa-sort-alt"></i> 
            <text>CMS Manage </text>
        </a>    
    </li>

    {{-- @php
        $links_array = [
            'email-headers',
            'email-headers/add',
            'email-headers/edit/{id}',
            'email-templates',
            'email-templates/add',
            'email-templates/edit/{id}',
            'email-footers',
            'email-footers/add',
            'email-footers/edit/{id}',
        ];
        $selected = getActiveRoute($links_array);
    @endphp
    <li class="nav-item dropdown @if( $selected ) show @endif">
        <a href="javascript:void(0)" class="dropdown-toggle nav-link @if( $selected ) show @endif" data-bs-toggle="dropdown" data-bs-display="static" >
            <i class="fa-fw fas fa-envelope"></i>
            <text> Email Templates </text>
        </a>
        <ul class="dropdown-menu dropdown-menu-left @if( $selected ) show @endif">
            @php
                $links_array = [
                    'email-headers',
                    'email-headers/add',
                    'email-headers/edit/{id}',
                ];
                $selected = getActiveRoute($links_array);
            @endphp
            <li class="nav-item @if( $selected ) active @endif">
                <a class="nav-link" href="{{url('email-headers')}}">
                    <i class="fa-fw fad fa-circle"></i>
                    <text>Email Headers</text>
                </a>
            </li>
            @php
                $links_array = [
                    'email-templates',
                    'email-templates/add',
                    'email-templates/edit/{id}'
                ];
                $selected = getActiveRoute($links_array);
            @endphp
            <li class="nav-item @if( $selected ) active @endif">
                <a class="nav-link" href="{{url('email-templates')}}">
                    <i class="fa-fw fad fa-circle"></i>
                    <text>Email Templates</text>
                </a>
            </li>
            @php
                $links_array = [
                    'email-footers',
                    'email-footers/add',
                    'email-footers/edit/{id}'
                ];
                $selected = getActiveRoute($links_array);
            @endphp
            <li class="nav-item @if( $selected ) active @endif">
                <a class="nav-link" href="{{url('email-footers')}}">
                    <i class="fa-fw fad fa-circle"></i>
                    <text>Email Footers</text>
                </a>
            </li>
        </ul>
    </li> --}}
    @php
        $links_array = [
            'settings',
        ];
        $selected = getActiveRoute($links_array);
    @endphp
    <li class="nav-item @if( $selected ) active @endif">
        <a class="nav-link" href="{{ url('settings') }}">
            <i class="fa-fw fas fas fa-cog"></i>
            <text> Settings </text>
        </a>
    </li>
</ul>