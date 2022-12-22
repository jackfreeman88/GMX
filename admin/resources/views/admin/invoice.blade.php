<!DOCTYPE html>
<html>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<head>
<style type="text/css">
    @page{margin:50px 25px;}
    /*---------------*/
    @font-face {
        font-family: 'Iskry Bold';
        src: url({{storage_path('fonts/IskryBoldBold.ttf') }}) format('truetype');
        font-weight: bold;
        font-style: normal;
        font-display: swap;
    }
    @font-face {
        font-family: 'Sharp Grotesk';
        src: url({{storage_path('fonts/SharpGroteskLight20.ttf') }}) format('truetype');        
        font-weight: 300;
        font-style: normal;
        font-display: swap;
    }

    @font-face {
        font-family: 'Sharp Grotesk Book';
        src: url({{storage_path('fonts/SharpGroteskBook20.ttf')}}) format('truetype');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
    }

    body,p {font-weight:normal;font-family: 'Sharp Grotesk';font-size:16px;color:#0C0F1E;line-height:20px;}

    th,b,strong{font-family:'Sharp Grotesk Book';font-weight: bold; font-style: normal; font-display: swap;}
    *{box-sizing:border-box;}
    .color-white{ color:white;}
    .color-2b5da7{ color: #2b5da7; }
    .color-0791bb{ color: #0791bb; }
    .color-5b9bd5{ color: #5b9bd5; }
    .color-bb0707 { color: #bb0707; }
    .color-003E33 { color: #003E33; }
    .bg-color-2b5da7 { background-color: #2b5da7; }
    .bg-color-0799c3 { background-color: #0799c3; }
    .bg-color-5b9bd5 { background-color: #5b9bd5; }
    img { max-width: 100%; }
    .text-center{text-align:center;}
    .text-right{text-align:right;}
    .text-left{text-align:left;}
    .mtb-2 {margin: 2px 0 !important;}

    
    /************************************ */
    .logo-wrap{text-align:center;}
    table{width:100%;border-collapse:collapse; vertical-align: top;}
    table tr th,
    table tr td {padding:5px 10px;text-align:left;}

    .custom-table th {padding: 5px 10px; font-size: 16px; font-family:'Sharp Grotesk Book';}
    .custom-table tr {border-bottom: 1px solid #dee2e6;}
    .custom-table tr td {vertical-align: top;}
    .custom-table h3 {font-size: 16px; font-family:'Sharp Grotesk Book'; margin-bottom: 0; line-height: 10px;}

    .table-bordered{border:1px solid #dee2e6;}
    .table-bordered th,
    .table-bordered td{padding:3px 10px; border:1px solid #dee2e6;}
    .card{ position:relative;margin-top:25px;margin-bottom:25px;padding:20px;border-radius:25px;border:2px solid #0C0F1E;}

    ul,li {list-style: none;}
    ul.custom-list li {display: inline-block; text-align:center; }
      
</style>
</head>
<body>    
    <div style="display: inline-block; width: 48%;">
        <table style="margin-bottom: 30px;">
            <tbody>
                <tr>
                    <th>
                        <p class="text-left mtb-2">
                            <b>Date :</b> {{ _nice_date($transaction->createdAt) }}
                        </p>
                    </th>
                </tr>
            </tbody>
        </table>
    </div>
    <div style="display: inline-block; width: 48%;">
        <div style="display: inline-block; width: 48%; vertical-align: top;">
            <table style="width:100%;">
                <tbody>
                    <tr>
                        <th class="text-left">
                            <p class="text-left mtb-2">
                                Bill From:
                            </p>
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <p class="text-left mtb-2">
                                <b>{{ _get_setting('site_name') ?? "GMX" }}</b>
                            </p>
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <p class="text-left mtb-2">{!! _get_setting('info_email') !!}</p>
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>       
        @php 
            $userData = $transaction->User;
        @endphp     
        <div style="display: inline-block; width: 48%; vertical-align: top;">
            <table style="width:100%;">
                <tbody>
                    <tr>
                        <th class="text-left">
                            <p class="text-left mtb-2">
                                Bill To:
                            </p>
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <p class="text-left mtb-2">
                                <b>{{ $userData->FullName ?? '' }}</b>
                            </p>
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <p class="text-left mtb-2">{{ $userData->State->name }}, {{ $userData->zipCode }}</p>
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <h3 class="color-003E33" style="font-size: 16px;">** Details Of Subscriptions Made **</h3>        
    <table class="custom-table" style="margin-bottom: 30px;">
        <thead style="background-color: #FFF">
            <tr>
                <th class="color-003E33">Subscriptions</th>
                <th></th>
                <th width="100px" class="text-center color-003E33">Price</th>
            </tr>
        </thead>
        <tbody>
        @php 
            $planData = $transaction->Plan ?? "";
        @endphp
        @if(isset($planData) && !empty($planData))
            <tr>
                <td width="100%">
                    <h3 class="">{{ $planData->title }}</h3>
                </td>
                <td></td>
                <td class="text-center">
                    <p class="mtb-2">{{ _price($transaction->amount) ?? 0 }}</p>
                </td>
            </tr>
        @endif
        </tbody>
        <tfoot style="border-top:1px solid #dee2e6">
            <tr style="border-bottom:none;">
                <td></td>
                <td class="text-center">
                    <strong>Total</strong>
                </td>
                <td class="text-center">
                    <strong>{{ _price($transaction->amount) ?? 0 }}</strong>
                </td>
            </tr>
        </tfoot>
    </table>
    <div class="text-center" style="margin-top:100px; text-align : center;">
        <p style="font-size:14px;">GMX Copyright <?php echo date('Y'); ?> ©</p>
    </div>        
</body>
</html>
