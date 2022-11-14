@extends('layouts.appp')
@section('css')
    <style>.red{color:red;}.error{color:red;}.alert-danger {background-color: red !important;}.successMsg{display: none;color: green;font-weight:bold;}</style>
@endsection
@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-9">
            <div class="card">
                <div class="card-header text-center"><h4>  إضافة تصنيف جديد </h4></div>
                <div class="card-body">
                     @if(Session::has('msg'))
                    <p style="background: #2cc52c;color: #fff;padding: 0 1rem;" class="alert alert-succrdd">{{ Session::get('msg') }}</p>
                    @endif
                    <form action="{{ route('categories.store') }}"  method="POST" id="addNewCategory" enctype="multipart/form-data">
                        @csrf
                        <div>
                            <div id="form-step-1" role="form" data-toggle="validator">
                                <div class="form-group mt-2col-12">
                                    <label class="form-label" for="fname"> التصنيف الرئيسي <span class="red">*</span></label>
                                    <input type="text" id="main_category" name="main_category" class="form-control"  required/>
                                </div>
                                <div class="form-group mt-2col-12">
                                    <label class="form-label" for="email">التصنيفات الفرعية<span class="red">*</span></label>
                                    <button id="new_sub_category" class="btn btn-primary btn-sm" style="float:left"><i class="fa fa-plus"></i></button>
                                    <div class="mt-2" id="newRow">
                                        <input type="text" name="sub_category[]" class="form-control" required/>
                                    </div>
                                </div>
                            </div>
                            <div id="form-step-2" role="form" data-toggle="validator">
                                <div class="form-material">

                                    <div class="form-group text-center">
                                        <input id="rb" type="submit" name="approve" value='حفظ'
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
        
            $('#addNewCategory').submit(function (e) {
                e.preventDefault();
                $('.successMsg').css('display','none');
                var url = $(this).attr('action');
                var data = $(this).serialize();
                $.ajaxSetup({
                  headers: {
                      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                  }
                });
                $.ajax({
                    'url': url,
                    'type': 'POST',
                    'dataType': 'json',
                     data: data,
                    success: function (response) {
                        $('input[type="text"]').val('');
                        $('input[name="sub_category[]"]').remove();
                        $('.successMsg').css('display','block');                            
                    }
                });
                
            });   
            
            $("#new_sub_category").click(function (e) {
                e.preventDefault();
                var html = '';
                html+= '<br>';
                html+= '<input type="text" name="sub_category[]" class="form-control" required/>';            
                $('#newRow').append(html);
            });
        
    });
    </script>
@endpush

@endsection
