@extends('layouts.appp')
@section('css')
    <style>.red{color:red;}.error{color:red;}.alert-danger {background-color: red !important;}.successMsg{display: none;color: green;font-weight:bold;}</style>
@endsection
@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-9">
            <div class="card">
                <div class="card-header text-center"><h4> نموذج تسجيل موظف جديد </h4></div>
                <div class="card-body">
                    <form action="{{ route('employees.store') }}"  method="POST" id="addNewEmployee" enctype="multipart/form-data">
                        @csrf
                        <div>
                            <div id="form-step-1" role="form" data-toggle="validator">
                                <div class="form-group mt-2col-12">
                                    <label class="form-label" for="report_date"> الاسم <span class="red">*</span></label>
                                    <input type="text" id="name" name="name"  class="form-control"  required/>
                                </div>
                                <div class="form-group mt-2col-12">
                                    <label class="form-label" for="email">البريدالالكتروني<span class="red">*</span></label>
                                    <input type="email" id="email" name="email" class="form-control" placeholder="info@admin.com" required/>
                                </div>
                                <div class="form-group mt-2col-12">
                                    <label class="form-label" for="password">كلمة المرور   <span class="red">*</span></label>
                                    <input type="password" id="password" name="password"  class="form-control"  required/>
                                </div>
                            </div>
                            <div id="form-step-2" role="form" data-toggle="validator">
                                <div class="form-material">

                                    <div class="form-group text-center">
                                        <input id="rb" type="submit" name="approve" value='إضافة'
                                               class="btn btn-primary pull-left ml-2">
                                        <div id="error_msg" class="alert alert-danger p-2 m-2" style="display: none">
                                        </div>

                                    </div>
                                   <span class="successMsg"><i class="fa fa-check"></i>
                                        تمت العملية بنجاح</span>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>


@push('script')
    <script>
        $(function () {
            $('#addNewEmployee').submit(function (e) {
                e.preventDefault();
                $('.successMsg').css('display','none');
                var url = $(this).attr('action');
                var data = new FormData(this);
                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
                });
                $.ajax({
                    'url': url,
                    'type': 'POST',
                    data: data,
                    cache:false,
                    contentType: false,
                    processData: false,
                    success: function (response) {
                        $('input[type="text"]').val('');
                        $('input[type="email"]').val('');
                        $('.successMsg').css('display','block');                            
                    }
                });
            });            
        });
    </script>
@endpush

@endsection
