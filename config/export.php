<?php

return [
    'exporters' => [
        'WORD' => App\Services\Exports\ExportWord::class,
        'PDF'  => App\Services\Exports\ExportPDF::class
    ]
];