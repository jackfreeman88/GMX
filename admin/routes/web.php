<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\Login;
use App\Http\Controllers\Admin\Dashboard;
use App\Http\Controllers\Admin\Settings;
use App\Http\Controllers\Admin\CMS;
use App\Http\Controllers\Admin\Product;
use App\Http\Controllers\Admin\Category;
use App\Http\Controllers\Admin\EmailTemplate;
use App\Http\Controllers\Admin\EmailTemplateFooter;
use App\Http\Controllers\Admin\EmailTemplateHeader;
use App\Http\Controllers\Admin\Retailers;
use App\Http\Controllers\Admin\Brands;
use App\Http\Controllers\Admin\Strain;
use App\Http\Controllers\Admin\MedRec;
use App\Http\Controllers\Admin\Subscription;
use App\Http\Controllers\Admin\Review;
use App\Http\Controllers\Admin\Transaction;
use App\Http\Controllers\Admin\LicenseTypes;
use App\Http\Controllers\Admin\State;
use App\Http\Controllers\Admin\Order;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
## Authentication Routes
Route::group([ 'prefix' => '/' ], function () {
    Route::get('/', [Login::class, 'getLogin']);
    Route::get('/login', [Login::class, 'getLogin']);
    Route::post('/login', [Login::class, 'postLogin']);
    Route::get('/logout', [Login::class, 'getLogout']);
    Route::get('/forgotpassword', [Login::class, 'getForgotPassword']);
    Route::post('/forgotpassword', [Login::class, 'postForgotPassword']);
    Route::get('/new-password/{id}', [Login::class, 'newPassword']);
    Route::post('/confirm-new-password', [Login::class, 'postConfirmNewPassword']);
});

## Dashboard
Route::group([ 'prefix' => '/dashboard', 'middleware' => ['admin'] ], function () {
    Route::get('/', [Dashboard::class, 'index']);
});

## Settings
Route::group([ 'prefix' => '/settings', 'middleware' => ['admin'] ], function () {
	Route::match(['get','post'],'/', [Settings::class, 'settings']);
	Route::post('/update/admin-detail', [Settings::class, 'UpdateAdminDetails']);
});

## CMS
Route::group(['prefix'=>'/cms', 'middleware' => ['admin'] ], function () {
    Route::get('/', [CMS::class, 'index']);
    Route::get('/edit/{slug}', [CMS::class, 'Edit']);
    Route::post('/updatehome/{slug}', [CMS::class, 'updatehome']);
    Route::post('/updatetermsandconditions/{slug}', [CMS::class, 'updatetermsandconditions']);
    Route::post('/updateaboutus/{slug}', [CMS::class, 'updateaboutus']);
    Route::post('/update-contactus/{slug}', [CMS::class, 'updateContactUs']);
    Route::post('/privacy-policy/{slug}', [CMS::class, 'updatePrivacyPolicy']);
});

## Category
Route::group(['prefix'=>'/categories', 'middleware'=>['admin'] ], function(){
    Route::get('',[Category::class,'index']);
    Route::get('/add',[Category::class,'Add']);
    Route::get('/edit/{id}',[Category::class,'Edit']);
    Route::match(array('get','post'),'/action/{action}/{_id}',[Category::class,'Action']);
});

## Email Templates

## Email Headers
Route::group( ['prefix'=>'/email-headers', 'middleware'=>['admin']], function(){
    Route::get('/',[EmailTemplateHeader::class,'index']);   
    Route::get('/add',[EmailTemplateHeader::class,'Add']); 
    Route::get('/edit/{id}',[EmailTemplateHeader::class,'Edit']); 
    Route::match(array('get','post'),'/action/{action}/{_id}',[EmailTemplateHeader::class,'Action']); 
});

## Email Footers
// Route::group(['prefix'=>'email-footers','middleware'=>['admin']],function(){
//     Route::get('/',[EmailTemplateFooter::class,'index']);
//     Route::get('/add',[EmailTemplateFooter::class,'Add']);
//     Route::get('edit/{id}',[EmailTemplateFooter::class,'Edit']);
//     Route::match(array('get','post'),'/action/{action}/{_id}',[EmailTemplateFooter::class,'Action']);
// });

## Email Templetes
Route::group(['prefix'=>'email-templates','middleware'=>['admin']],function(){
    Route::get('/',[EmailTemplate::class,'index']);
    Route::get('/add',[EmailTemplate::class,'Add']);
    Route::get('edit/{id}',[EmailTemplate::class,'Edit']);
    Route::match(array('get','post'),'/action/{action}/{_id}',[EmailTemplate::class,'Action']);
});

## Product
Route::group(['prefix'=>'/product', 'middleware'=>['admin'] ], function(){
    Route::get('',[Product::class,'index']);
    // Route::get('/detail/{id}',[Product::class,'Details']);
    Route::match(array('get','post'),'/action/{action}/{_id}',[Product::class,'Action']);
});

## User Management
Route::group(['prefix'=>'/retailers', 'middleware'=>['admin'] ], function(){
    Route::get('',[Retailers::class,'index']);
    Route::get('/edit/{id}',[Retailers::class,'Edit']);
    Route::match(array('get','post'),'/action/{action}/{_id}',[Retailers::class,'Action']);
});

## User Management
Route::group(['prefix'=>'/unverified-brands', 'middleware'=>['admin'] ], function(){
    Route::get('',[Brands::class,'unverifiedBrands']);
    Route::get('/view/{id}',[Brands::class,'View']);
    Route::match(array('get','post'),'/action/{action}/{_id}',[Brands::class,'Action']);
});

Route::group(['prefix'=>'/brands', 'middleware'=>['admin'] ], function(){
    Route::get('',[Brands::class,'index']);
    Route::get('/edit/{id}',[Brands::class,'Edit']);
    Route::match(array('get','post'),'/action/{action}/{_id}',[Brands::class,'Action']);
});

## Strain
Route::group(['prefix'=>'/strain', 'middleware'=>['admin'] ], function(){
    Route::get('',[Strain::class,'index']);
    Route::get('/add',[Strain::class,'Add']);
    Route::get('/edit/{id}',[Strain::class,'Edit']);
    Route::match(array('get','post'),'/action/{action}/{_id}',[Strain::class,'Action']);
});

## States
Route::group(['prefix'=>'/state', 'middleware'=>['admin'] ], function(){
    Route::get('',[State::class,'index']);
    Route::get('/add',[State::class,'Add']);
    Route::get('/edit/{id}',[State::class,'Edit']);
    Route::match(array('get','post'),'/action/{action}/{_id}',[State::class,'Action']);
});

## med_rec
Route::group(['prefix'=>'/med_rec', 'middleware'=>['admin'] ], function(){
    Route::get('',[MedRec::class,'index']);
    Route::get('/add',[MedRec::class,'Add']);
    Route::get('/edit/{id}',[MedRec::class,'Edit']);
    Route::match(array('get','post'),'/action/{action}/{_id}',[MedRec::class,'Action']);
});

## Subscription Management
Route::group(['prefix'=>'/subscription', 'middleware'=>['admin'] ], function(){
    Route::get('',[Subscription::class,'index']);
    Route::get('/add',[Subscription::class,'Add']);
    Route::get('/edit/{id}',[Subscription::class,'Edit']);
    Route::match(array('get','post'),'/action/{action}/{_id}',[Subscription::class,'Action']);
});

## Review Management
Route::group(['prefix'=>'/review', 'middleware'=>['admin'] ], function(){
    Route::get('',[Review::class,'index']);
    Route::match(array('get','post'),'/action/{action}/{_id}',[Review::class,'Action']);
    Route::get('/detail/{id}',[Review::class,'Details']);
});

## Product
Route::group(['prefix'=>'/transaction', 'middleware'=>['admin'] ], function(){
    Route::get('',[Transaction::class,'index']);
    Route::get('/detail/{id}',[Transaction::class,'Details']);
    Route::get('/invoice/{id}',[Transaction::class,'invoicePDF']);
});

## LicenseTypes
Route::group(['prefix'=>'/license-types', 'middleware'=>['admin'] ], function(){
    Route::get('',[LicenseTypes::class,'index']);
    Route::get('/add',[LicenseTypes::class,'Add']);
    Route::get('/edit/{id}',[LicenseTypes::class,'Edit']);
    Route::match(array('get','post'),'/action/{action}/{_id}',[LicenseTypes::class,'Action']);
});

## Orders
Route::group(['prefix'=>'/orders', 'middleware'=>['admin'] ], function(){
    Route::get('',[Order::class,'index']);
    Route::match(array('get','post'),'/action/{action}/{_id}',[Order::class,'Action']);
    Route::get('/detail/{id}',[Order::class,'Details']);
});