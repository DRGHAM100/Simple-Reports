@extends('layouts.appp')
@section('css')
    <style>.red{color:red;}.error{color:red;}.alert-danger {background-color: red !important;}.successMsg{display: none;color: green;font-weight:bold;}</style>
@endsection
@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-9">
            <div class="card">
                <div class="card-header text-center"><h4> نموذج تسجيل بلاغ جديد</h4></div>
                <div class="card-body">
                    <form action="{{ route('reports.store') }}"  method="POST" id="addNewReport" enctype="multipart/form-data">
                        @csrf
                        <div>
                            <div id="form-step-1" role="form" data-toggle="validator">
                                <div class="form-group mt-2col-12">
                                    <label class="form-label" for="report_date">تاريخ شكوى العميل <span class="red">*</span></label>
                                    <input type="date" id="report_date" name="report_date" value="" class="form-control"  required/>
                                </div>
                                <div class="form-group mt-2col-12">
                                    <label class="form-label" for="client_id">الرقم التسلسلي <span class="red">*</span></label>
                                    <input type="text" id="client_id" name="client_id" value="" class="form-control"  required/>
                                </div>
                                <div class="form-group mt-2col-12">
                                    <label class="form-label" for="email">البريدالالكتروني<span class="red">*</span></label>
                                    <input type="email" id="client_email" name="client_email" class="form-control" placeholder="info@admin.com" required/>
                                </div>
                                <div class="form-group mt-2col-12">
                                    <label class="form-label" for="fname">رقم الجوال  <span class="red">*</span></label>
                                    <input type="text" id="client_mobile" name="client_mobile" value="" class="form-control"  required/>
                                </div>
                                <div class="form-group mt-2col-12">
                                    <label class="form-label" for="fname">تصنيف المشكلة <span class="red">*</span></label>
                                    <select id="mainCategory" class="form-control">
                                        <option value="0">اختر تصنيفاً</option>
                                        @foreach($categories as $category)
                                            <option value="{{ $category->id }}">{{ $category->name }}</option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="form-group mt-2col-12">
                                    <label class="form-label" for="fname"> التصنيف الفرعي<span class="red">*</span></label>
                                    <select name="sub_category_id" id="subCategorySelect" class="form-control">
                                        @foreach($categories as $category)
                                                @foreach($category->sub_categories as $sub_category)
                                                    <option data="{{{$category->id}}}}" value="{{ $sub_category->id }}">{{ $sub_category->name }}</option>
                                                @endforeach
                                        @endforeach
                                    </select>
                                </div>
                                <div class="form-group mt-2col-12">
                                    <label class="form-label" for="description"> شرح المشكلة<span class="red">*</span></label>
                                    <textarea class="form-control" name="description" id="description" cols="30" rows="10"></textarea>
                                </div>
                                <div class="form-group mt-2col-12">
                                    <label class="form-label" for="description_file">  إضافة مرفق<span class="red">*</span></label>
                                    <input type="file" id="description_file" name="description_file" class="form-control" />
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


        $('select#mainCategory').change(function(){
            var mID = $(this).val();
            var subOptions = document.getElementById("subCategorySelect");
            if(mID == 0){
                for (var i = 0; i < subOptions.length; i++) {
                    $(subOptions.options[i]).removeAttr('disabled').show();
                }
            }else{
                for (var i = 0; i < subOptions.length; i++) {
                    var txt = $(subOptions.options[i]).attr('data');
                    if (!txt.match(mID) ) {
                        $(subOptions.options[i]).attr('disabled', 'disabled').hide();
                    } else {
                        $(subOptions.options[i]).removeAttr('disabled').show();
                        subOptions.value = $(subOptions.options[i]).val();
                    }     
                }
            }      
        })

        
        $('#addNewReport').submit(function (e) {
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
                    $('input[type="file"]').val('');
                    $('input[type="email"]').val('');
                    $('textarea').val('');
                    $('.successMsg').css('display','block');                            
                },
                error: function(xhr){
                    console.log(xhr);                
                }
            });
            
        });        
        
    });
    </script>
@endpush

@endsection
