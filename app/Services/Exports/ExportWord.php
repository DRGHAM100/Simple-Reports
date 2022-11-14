<?php

namespace App\Services\Exports;

class ExportWord
{

    public function export(array $data)
    {
        
        $phpWord = new \PhpOffice\PhpWord\PhpWord();
        $section = $phpWord->addSection();
        $text = $section->addText('  الرقم التسلسلي:'.$data['client_id'],array('name'=>'Arial','size' => 20,'bold' => true));
        $text = $section->addText('المشكلة:'.$data['description'],array('name'=>'Arial','size' => 20,'bold' => true));
        $objWriter = \PhpOffice\PhpWord\IOFactory::createWriter($phpWord, 'Word2007');
        $objWriter->save($data['client_email'].'.docx');
        return response()->download(public_path($data['client_email'].'.docx'));
    }

}