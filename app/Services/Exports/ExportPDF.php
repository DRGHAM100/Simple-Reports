<?php

namespace App\Services\Exports;

use PDF;

class ExportPDF
{
    
    public function export(array $data)
    {
        $pdf = PDF::loadView('pdf', $data);
        return $pdf->stream($data['client_email'].'.pdf');
    }

}