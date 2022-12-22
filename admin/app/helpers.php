<?php
use Illuminate\Support\Str;
use PHPMailer\PHPMailer\PHPMailer, Carbon\Carbon, Carbon\CarbonPeriod;
use App\Models\EmailTemplate as EmailTemplateModel;
use App\Models\Settings as SettingsModel;

function _get_setting( $name ) {
    if( isset($name) && $name ):
        return SettingsModel::where('name',trim($name))->value('description');
    endif;
    return false;
}

function _email_template_content($id,$user_data) {
    // Logo
    $user_data['BASE_URL']  =   url('/');
    //$user_data['LOGO']  =   url('public/uploads/settings/'._get_setting('logo'));
    $user_data['LOGO']  =  url('public/images/main-logo.png');
    // Social medial icon
    $user_data['FACEBOOK_ICON']     =   url('public/images/mail/facebook.png');
    $user_data['TWITTER_ICON']      =   url('public/images/mail/twitter.png');
    $user_data['LINKEDIN_ICON']     =   url('public/images/mail/linkedin.png');
    $user_data['INSTAGRAM_ICON']    =   url('public/images/mail/instagram.png');
    $user_data['FACEBOOK_LINK']     =   _get_setting('facebook_link');
    $user_data['TWITTER_LINK']      =   _get_setting('twitter_link');
    $user_data['LINKEDIN_LINK']     =   _get_setting('linkedin_link');
    $user_data['INSTAGRAM_LINK']    =   _get_setting('instagram_link');
    $user_data['BACK_URL']          =   url('/');
    // COPYRIGHT
    // $user_data['COPYRIGHT'] =  "&copy; ".date('Y')." GMX. All Rights Reserved.";
    $user_data['COPYRIGHTYEAR'] = date('Y');
    $content_array = array();
    $emailTemplate = EmailTemplateModel::where('id', $id)->where('status', '1')->first();
    $string="";
    $subject=$emailTemplate->subject;
    $only_string = '';
    if(isset($emailTemplate)):
        $keys = [
            '{FIRST_NAME}',
            '{LAST_NAME}',
            '{LINK}',
            '{LINK_1}',
            '{COPYRIGHTYEAR}',
            '{NAME}',
            '{EMAIL}',
            '{PASSWORD}',
            '{PHONE}',
            '{COUNTRY}',
            '{SUBJECT}',
            '{MESSAGE}',
            '{DATE}',
            '{TIME}',
            '{USERNAME}',
            '{PLAN}',
            '{ADDRESS}',
            '{PHONE}',
            '{ICON}',
            '{LOGO}',
            '{FACEBOOK_ICON}',
            '{TWITTER_ICON}',
            '{LINKEDIN_ICON}',
            '{INSTAGRAM_ICON}',
            '{FACEBOOK_LINK}',
            '{TWITTER_LINK}',
            '{LINKEDIN_LINK}',
            '{INSTAGRAM_LINK}',
            '{COPYRIGHT}',
            '{BASE_URL}',
            '{ROLE}',
            '{REMARK}',
            '{TITLE}',
            '{BACK_URL}',
        ];
        $keys2 = [
            '{ACTION_URL}',
            '{TUTOR}',
            '{TUTOR_EMAIL}',
            '{STUDENT}',
            '{STUDENT_EMAIL}',
            '{STUDENT_RATINGS}',
            '{STUDENT_DESCRIPTION}',
            '{JOB_TITLE}',
            '{JOB_EDUCATIONAL_CATEGORY}',
            '{JOB_POSITION}',
            '{JOB_EXPERIENCE}',
            '{JOB_COUNTRY}',
            '{JOB_STATE}',
            '{JOB_CITY}',
            '{BOOKING_ID}',
            '{SESSION_ID}',
            '{PAYMENT_ID}',
            '{AMOUNT}',
        ];
        $only_string = $emailTemplate->body;
        $string = $emailTemplate->hasTemplateHeader->description;
        $string .= $emailTemplate->body;
        $string .= $emailTemplate->hasTemplateFooter->description;
        foreach ($keys as $v):
            $k = str_replace("{","",$v);
            $k = str_replace("}","",$k);
            if(isset($user_data[$k])):
                $string = str_replace( $v, $user_data[$k], $string);
                $only_string = str_replace( $v, $user_data[$k], $only_string);
                $subject = str_replace( $v, $user_data[$k], $subject);
            endif;
        endforeach;
        foreach ($keys2 as $v):
            $k = str_replace("{","",$v);
            $k = str_replace("}","",$k);
            if(isset($user_data[$k])):
                $string = str_replace( $v, $user_data[$k], $string);
                $only_string = str_replace( $v, $user_data[$k], $only_string);
                $subject = str_replace( $v, $user_data[$k], $subject);
            endif;
        endforeach;
    endif;
    //echo $string; exit;
    $content_array = array($subject,$string,$only_string);
    return $content_array;
}

function _mail_send_general( $replyData = array() ,$subject="" , $message="" , $mailids = array() , $attachments = array() ) {
    $fromData = $fromdata=array(
        'host'=>env('SMTP_HOST'),
        'port'=>env('SMTP_PORT'),
        'username'=>env('SMTP_USERNAME'),
        'password'=>env('SMTP_PASSWORD'),
        'from_name'=>env('SMTP_FROM_NAME'),
        'from_email'=>env('SMTP_FROM_EMAIL'),
    );
    $replyToMail = $fromData['username'];
    $replyToName = 'GMX';
    if( isset($replyData['email']) && $replyData['email'] != '' ) $replyToMail = $replyData['email'];
    if( isset($replyData['name']) && $replyData['name'] != '' ) $replyToName = $replyData['name'];

    $mail = new PHPMailer;
    $IS_SMTP = 1;
    if($IS_SMTP):
        //$mail->SMTPDebug = 2; //Alternative to above constant
        $mail->isSMTP(); // commented to send the mail
        $mail->CharSet = "utf-8";
        $mail->Host = $fromData['host'];
        $mail->SMTPAuth = true;
        $mail->SMTPSecure = 'tls';
        $mail->Port = $fromData['port'];
    endif;
    $mail->Username = $fromData['username'];
    $mail->Password = $fromData['password'];
    $mail->setFrom( $fromData['from_email'] , $fromData['from_name'] );
    if( $replyToMail != '' ):
        $mail->AddReplyTo( $replyToMail , $replyToName );
    endif;
    //  Add Attachments >>
    if( isset( $attachments ) && count( $attachments ) ):
        foreach ( $attachments as $key => $value ):
            $mail->AddAttachment( $value );
        endforeach;
    endif;
    //  << Add Attachments
    $mail->Subject = $subject;
    $mail->MsgHTML($message);
    if(count($mailids)):
        foreach ($mailids as $key => $value):
            $mail->addAddress($key,$value);
        endforeach;
    endif;
    $mail->isHTML(true);
    $a = $mail->send();
    return $a;
}

function _nice_date($date = '')
{
    return strftime("%d %b %Y",strtotime($date)) ?? '';
}

function _price( $price = 0, $decimal = 2 ){
    if($price):
        $currency = '$';
        $price = str_replace( ',', '', $price );
        return $currency.number_format( round( $price, $decimal ), $decimal );
    endif;    
}

function _nice_amount( $price = 0, $decimal = 2 ){
    $price = str_replace( ',', '', $price );
    return number_format( round( $price, $decimal ), $decimal );
}

function _nice_digit($number)
{
    return sprintf("%02d", $number);
}

function _get_orders_statuses()
{
    return $status = [
        '1' => 'Placed',
        '2' => 'Accepted',
        '3' => 'Cancelled',
        '4' => 'Delivered',
        '5' => 'Received',
        '6' => 'Completed'
    ];
}