@extends('layouts.appp')
@push('css')
   <style>h4{color: white;}h2{color: white;}</style>
@endpush
@section('content')
    <div class="row ">
       <div class="col-sm-12 col-lg-3">
          <div class="card shadow-base bg-primary card-img-holder text-white">
             <div class="card-body">
                <h4 class=" mb-2 text-center">
                   العدد الكلي للبلاغات
                </h4>
                <h2 class="mb-0 text-center">
                     {{ $totalReportsCount }}
                </h2>
             </div>
          </div>
       </div>
       <div class="col-sm-12 col-lg-3">
          <div class="card shadow-base bg-warning card-img-holder text-white">
             <div class="card-body">
                <h4 class=" mb-2 text-center">
                   عدد البلاغات المفتوحة
                </h4>
                <h2 class="mb-0 text-center">
                     {{ $openedReportsCount }}
                </h2>
             </div>
          </div>
       </div>
       <div class="col-sm-12 col-lg-3">
          <div class="card shadow-base bg-info card-img-holder text-white">
             <div class="card-body">
                <h4 class="mb-2 text-center">
                   عدد البلاغات المغلقة
                </h4>
                <h2 class="mb-0 text-center">
                     {{ $closedReportsCount }}
                </h2>
             </div>
          </div>
       </div>
       <div class="col-sm-12 col-lg-3">
          <div class="card shadow-base bg-success card-img-holder text-white">
             <div class="card-body">
                <h4 class=" mb-2 text-center">
                     المغلقة مع الإفادة
                </h4>
                <h2 class="mb-0 text-center">
                     {{ $closedConfirmedReportsCount }}
                </h2>
             </div>
          </div>
       </div>
    </div>
@endsection

