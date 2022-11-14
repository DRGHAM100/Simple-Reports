<?php

namespace App\Http\Controllers;

use App\Models\Report;
use Illuminate\Http\Request;
use App\Services\Exports\ExportFactory;

class ExportController extends Controller
{
    public function export($type,$report_id)
    {
        $report = Report::find($report_id);
        
        $data['client_id'] = $report->client_id;
        $data['client_email'] = $report->client_email;
        $data['description'] = $report->description;

        $exporter = ExportFactory::getInstacne($type);

        return $exporter->export($data);
    }
}
