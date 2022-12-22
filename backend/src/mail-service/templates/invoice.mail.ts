export const invoiceTemplate = `<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link
        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet" />
    <style type="text/css">
        @page {
            margin: 50px 25px;
        }

        body,
        p {
            font-weight: normal;
            font-family: 'Poppins', sans-serif;
            font-size: 14px;
            color: #0C0F1E;
            line-height: 20px;
        }

        th,
        b,
        strong {
            font-family: 'Poppins', sans-serif;
            font-weight: bold;
            font-style: normal;
            font-display: swap;
        }

        * {
            box-sizing: border-box;
        }

        .color-white {
            color: white;
        }

        .color-2b5da7 {
            color: #2b5da7;
        }

        .color-0791bb {
            color: #0791bb;
        }

        .color-5b9bd5 {
            color: #5b9bd5;
        }

        .color-bb0707 {
            color: #bb0707;
        }

        .color-003E33 {
            color: #003E33;
        }

        .bg-color-2b5da7 {
            background-color: #2b5da7;
        }

        .bg-color-0799c3 {
            background-color: #0799c3;
        }

        .bg-color-5b9bd5 {
            background-color: #5b9bd5;
        }

        img {
            max-width: 100%;
        }

        .text-center {
            text-align: center;
        }

        .text-right {
            text-align: right;
        }

        .text-left {
            text-align: left;
        }

        .mtb-2 {
            margin: 2px 0 !important;
        }


        /************************************ */
        .logo-wrap {
            text-align: center;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            vertical-align: top;
        }

        table tr th,
        table tr td {
            padding: 5px 10px;
            text-align: left;
        }

        .custom-table th {
            padding: 5px 10px;
            font-size: 14px;
            font-family: 'Poppins', sans-serif;
        }

        .custom-table tr {
            border-bottom: 1px solid #dee2e6;
        }

        .custom-table tr td {
            vertical-align: top;
        }

        .custom-table h3 {
            font-size: 14px;
            font-family: 'Poppins', sans-serif;
            margin-bottom: 0;
            line-height: 10px;
        }

        .table-bordered {
            border: 1px solid #dee2e6;
        }

        .table-bordered th,
        .table-bordered td {
            padding: 3px 10px;
            border: 1px solid #dee2e6;
        }

        .card {
            position: relative;
            margin-top: 25px;
            margin-bottom: 25px;
            padding: 20px;
            border-radius: 25px;
            border: 2px solid #0C0F1E;
        }

        ul,
        li {
            list-style: none;
        }

        ul.custom-list li {
            display: inline-block;
            text-align: center;
        }
    </style>
</head>

<body>
    <div style="display: inline-block; width: 100%;">
        <table style="margin-bottom: 0px;">
            <tbody>
                <tr>
                    <th>
                        <p class="text-left mtb-2">
                            <b>Date: </b>{{date}}
                        </p>
                    </th>
                </tr>
                <!-- <tr>
                    <th>
                        <p class="text-left mtb-2">
                            <b>Invoice No :</b>{{invoiceNo}}
                        </p>
                    </th>
                </tr> -->
            </tbody>
        </table>
    </div>
    <div style="display: inline-block; width: 100%;">
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
                                <b>{{siteName}}</b>
                            </p>
                        </th>
                    </tr>
                    <!-- <tr>
                        <th>
                            <p class="text-left mtb-2">address</p>
                        </th>
                    </tr> -->
                </tbody>
            </table>
        </div>
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
                                <b>{{userName}}</b>
                            </p>
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <p class="text-left mtb-2">{{toAddress}}</p>
                            <p class="text-left mtb-2">{{toState}}</p>
                        </th>
                    </tr>
                    <tr>
                        <td>
                            <p class="text-left mtb-2">{{zipCode}}</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <h3 class="color-003E33" style="font-size: 14px;">** Details Of Purchase Made **</h3>
    <table class="custom-table" style="margin-bottom: 30px;">
        <thead style="background-color: #FFF">
            <tr>
                <th class="color-003E33">Subscriptions</th>
                <th style="width:300px" class="text-center color-003E33">Price</th>
            </tr>
        </thead>
        <tbody>
            <tr style="width:350px">
                <td class="text-left">
                    <p>{{productTitle}}</p>
                </td>
                <td class="text-center">
                    <p style="font-size:10px;">{{productPrice}}</p>
                </td>
            </tr>
        </tbody>
        <tfoot style="border-top:1px solid #dee2e6" style="width:300px">
            <tr style="border-bottom:none;" style="width:300px">
                <td class="text-right">
                    <strong>Total</strong>
                </td>
                <td class="text-center" style="width:300px">
                    <p style="font-size:10px;"><strong>{{totalPrice}}</strong></p>
                </td>
            </tr>
            <!-- <tr style="border-bottom:none;">
                <td width="100%" style="border-right:none;">
                    <p class="mtb-2"><b>Payment Method :</b> </p>
                </td>
            </tr> -->
            <tr style="border-bottom:none;">
                <td width="100%" style="border-right:none;">

                </td>
                <!-- <td class="text-center" style="border-bottom:1px solid #0C0F1E">
                    <strong>Grand Total:</strong>
                </td> -->
                <!-- <td class="text-center" style="border-bottom:1px solid #0C0F1E">
                    <strong>grandTotal</strong>
                </td> -->
            </tr>
        </tfoot>
    </table>
    <div class="text-center" style="margin-top:100px; text-align : center;">
        <p style="font-size:14px;">{{siteName}} Copyright {{year}} ©</p>
    </div>
</body>

</html>
`;