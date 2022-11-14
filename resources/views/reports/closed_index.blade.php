@extends('layouts.appp')
@section('css')
    <style>.red{color:red;}.error{color:red;}.alert-danger {background-color: red !important;}</style>
@endsection
@section('content')
<div id="content">
                <!-- Begin Page Content -->
                <div class="container-fluid">
                    <!-- DataTales Example -->
                    <div class="card shadow mb-2">
                        <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold text-primary">
                                <a class="btn" data-toggle="modal12" data-target="#exampleModal12" style="font-weight:bold;float:right;font-size:1.2rem">  جدول البلاغات المغلقة</a>
                            </h6>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-bordered yajra-datatable"  width="100%" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th>التسلسل</th>
                                            <th> التاريخ لفتح البلاغ </th>
                                            <th> التاريخ لشكوى العميل</th>
                                            <th> حالة البلاغ</th>
                                            <th>الرقم المتسلسل للعميل</th>
                                            <th>البريد الالكتروني</th>
                                            <th>الجوال</th>
                                            <th>المشكلة</th>
                                            <th>مرفق المشكلة</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

            </div>
            <!-- /.container-fluid -->
</div>
            
@push('script')
   <script type="text/javascript">
    $(function () {

        $.ajaxSetup({
                  headers: {
                      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                  }
        });
        
        var table = $('.yajra-datatable').DataTable({
            processing: true,
            serverSide: true,
            ajax: "{{ route('reports.data',['type' => 'closed']) }}", 
            columns: [
                {data: 'id', name: 'id'},
                {data: 'created_at', name: 'created_at'},
                {data: 'report_date', name: 'report_date'},
                {data: 'type', name: 'type'},
                {data: 'client_id', name: 'client_id'},
                {data: 'client_email', name: 'client_email'},
                {data: 'client_mobile', name: 'client_mobile'},
                {data: 'description', name: 'description'},
                {data: 'description_file', name: 'description_file'}
            ] ,
            columnDefs: [
                {
                responsivePriority: 13,
                targets: 0
                },
                {
                // Actions
                targets: 8,
                render: function (data, type, full, meta) {
                    var file = full['description_file'];
                    if(file == null)
                        return 'لايوجد';
                    else    
                        return '<a target="_blank" href="/storage/report-description-files/'+file+'"><i class="fa fa-download"></i></a>'
                }
                }
            ]
        });

        
    });
    </script>
@endpush

@endsection
