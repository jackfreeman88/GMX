@extends('admin.app.index')
@section('content')
<section class="dashboard-sec p-0">
    <!-- ******************** -->
    <div class="card bs-4 mb-3 card-dark">
        <div class="card-body">
            <div class="fs-18 fw-600 color-white"> Dashboard </div>
            <hr class="mt-2 mb-3">
            <div class="row">
                <div class="col-xl-4 col-md-4 col-sm-6 mb-3">
                    <div class="p-3 br-6 bg-color-191919">
                        <h4 class="fs-18 fw-500 color-white text-capitalize">Total Customers</h4>
                        <div class="fs-32 fw-600 color-099f00">{{ _nice_digit($userCount) ?? 0 }}</div>
                    </div>
                </div>
                <div class="col-xl-4 col-md-4 col-sm-6 mb-3">
                    <div class="p-3 br-6 bg-color-191919">
                        <h4 class="fs-18 fw-500 color-white text-capitalize">Total Brands</h4>
                        <div class="fs-32 fw-600 color-099f00">{{ _nice_digit($brandCount) ?? 0 }}</div>
                    </div>
                </div>
                
                <div class="col-xl-4 col-md-4 col-sm-6 mb-3">
                    <div class="p-3 br-6 bg-color-191919">
                        <h4 class="fs-18 fw-500 color-white text-capitalize">Total Retailer</h4>
                        <div class="fs-32 fw-600 color-099f00">{{ _nice_digit($retailerCount) ?? 0 }}</div>
                    </div>
                </div>
                <div class="col-xl-4 col-md-4 col-sm-6 mb-3">
                    <div class="p-3 br-6 bg-color-191919">
                        <h4 class="fs-18 fw-500 color-white text-capitalize">Total Products</h4>
                        <div class="fs-32 fw-600 color-099f00">{{ _nice_digit($productCount) ?? 0 }}</div>
                    </div>
                </div>
                <div class="col-xl-4 col-md-4 col-sm-6 mb-3">
                    <div class="p-3 br-6 bg-color-191919">
                        <h4 class="fs-18 fw-500 color-white text-capitalize">Total Products QTY Sold</h4>
                        <div class="fs-32 fw-600 color-099f00">{{ _nice_digit($productSoldQTYCount) ?? 0 }}</div>
                    </div>
                </div>
                <div class="col-xl-4 col-md-4 col-sm-6 mb-3">
                    <div class="p-3 br-6 bg-color-191919">
                        <h4 class="fs-18 fw-500 color-white text-capitalize">Total Cost Of Order</h4>
                        <div class="fs-32 fw-600 color-099f00">{{ '$ '._nice_amount($totalOrderCost, 2) ?? 0 }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- ******************** -->
    <!-- <div class="card bs-4 mb-3 card-dark">
        <div class="card-body">
            <div class="fs-18 fw-600 color-white"> Sessions </div>
            <hr class="mt-2 mb-3">
            <div class="row">
                <div class="col-md-4 col-sm-6 mb-3">
                    <div class="p-3 br-6 bg-color-f3f2f1">
                        <h4 class="fs-18 fw-500 color-333333 text-capitalize">Online Sessions</h4>
                        <div class="fs-32 fw-500 color-0799c4">42</div>
                    </div>
                </div>
                <div class="col-md-4 col-sm-6 mb-3">
                    <div class="p-3 br-6 bg-color-f3f2f1">
                        <h4 class="fs-18 fw-500 color-333333 text-capitalize">In-Person Sessions</h4>
                        <div class="fs-32 fw-500 color-e18803">27</div>
                    </div>
                </div>
            </div>
        </div>
    </div> -->
    <!-- ******************** -->
</section>
@endsection