<?php

namespace App\Helper;
use Str;


trait UploadFile {


    public function getRandomFileName($destination,$ext)
    {
       $random_file_name = strtolower(Str::random(25));

       $file_name = $destination .'/'.$random_file_name.'.'.$ext;

       return $random_file_name .'.'.$ext;
    }

    public function uploadFile($file,$destination)
    {
      $extension = $file->getClientOriginalExtension();
      $file_name = $this->getRandomFileName($destination,$extension);
      $file->move($destination,$file_name);
      return $file_name;
    }

}