<?php
ini_set("pcre.backtrack_limit", "1000000000");
?>
<html lang="en">
<head>
    <style>
        *{
            margin:0;
            padding:0;
        }
        body {
            font-family: Arial, sans-serif;
        }
        @page {
        	header: page-header;
        	footer: page-footer;
        }        
    </style>
</head>
<body dir="rtl">
    <main style="border:5px solid rgb(2, 0, 57);padding:0 .4rem">   
        <table>
            <tr>
                <td>
                    الرقم التسلسلي: {{ $client_id }}
                </td>
            </tr>
        </table>
        <table>
            <tr>
                <td style="padding-left:7rem">
                    البريد الالكتروني: {{ $client_email }}
                </td>
            </tr>
        </table>
        <table>
            <tr>
                <td style="padding-left:7rem">
                {{ $description }}
                </td>
            </tr>
        </table>
    </main>
</body>
</html>