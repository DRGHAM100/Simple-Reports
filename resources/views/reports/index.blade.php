@extends('layouts.appp')
@section('content')
<div id="content">
                <!-- Begin Page Content -->
                <div class="container-fluid">
                    <!-- DataTales Example -->
                    <div class="card shadow mb-2">
                        <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold text-primary">
                                <a class="btn" data-toggle="modal12" data-target="#exampleModal12" style="font-weight:bold;float:right;font-size:1.2rem">  جدول البلاغات</a>
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
                                            <th>الإجراء</th>
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
            ajax: "{{ route('reports.data',['type' => 'all']) }}", 
            columns: [
                {data: 'id', name: 'id'},
                {data: 'created_at', name: 'created_at'},
                {data: 'report_date', name: 'report_date'},
                {data: 'type', name: 'type'},
                {data: 'client_id', name: 'client_id'},
                {data: 'client_email', name: 'client_email'},
                {data: 'client_mobile', name: 'client_mobile'},
                {data: 'description', name: 'description'},
                {data: 'description_file', name: 'description_file'},
                {
                    data: 'action', 
                    name: 'action', 
                    orderable: true, 
                    searchable: true
                },
            ] ,
            columnDefs: [
                {
                responsivePriority: 13,
                targets: 0
                },
                {
                // Actions
                targets: 7,
                render: function (data, type, full, meta) {
                    var id = full['id'];
                    var file = full['description'];
                    return(
                        '<a target="_blank" href="/export/WORD/'+id+'" class="btn btn-primary btn-sm"><i class="fa fa-file-word-o"></i></a><br><br>'+
                        '<a target="_blank" href="/export/PDF/'+id+'" class="btn btn-danger btn-sm"><i class="fa fa-file-pdf-o"></i></a>'
                    )
                }
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
                },
                {
                // Actions
                targets: 9,
                render: function (data, type, full, meta) {
                    var id = full['id'];
                    var cid = full['client_id'];
                        return (
                            '<div>' +
                            '<a style="text-align:center" data-toggle="modal" data-target="#exampleModal'+id+'" class="btn btn-success btn-sm"> <i class="fa fa-edit"></i></a>'+
                            '</div>'+
                            '<div class="modal fade" id="exampleModal'+id+'" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">'+
                                '<div class="modal-dialog" role="document">'+
                                    '<div class="modal-content">'+
                                        '<div class="modal-header">'+
                                            '<h5 class="modal-title" id="exampleModalLabel">الرقم التسلسلي للعميل: '+cid+'</h5>'+
                                        '</div>'+
                                        '<form action="'+id+'" method="post" class="updateReport" id="updateForm'+id+'">'+
                                            '<div class="modal-body">'+
                                                '<label>الحالة</label>'+
                                                '<select class="form-control" name="type">'+
                                                    '<option value="opened">مفتوح</option>'+
                                                    '<option value="closed">مغلق</option>'+
                                                    '<option value="closed_with_confirm">مغلق مع إفادة العميل</option>'+
                                                '</select>'+
                                                '<label>الملاحظات</label>'+
                                                '<textarea name="notes" rows="7" class="form-control"></textarea>'+
                                                '<label>المرفق</label>'+
                                                '<input type="file" name="file" class="form-control"/>'+
                                            '</div>'+
                                            '<div class="modal-footer">'+
                                                '<button type="button" class="btn btn-secondary btn-close" data-dismiss="modal">إغلاق</button>'+
                                                '<button type="submit" class="btn btn-primary">تعديل</button>'+
                                            '</div>'+
                                        '</form>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'
                        );
                }
                }
            ]
        });


        $(document).on('submit', '.updateReport', function (e) {
        e.preventDefault();

        var id = $(this).attr('action');
        var url = '/reports/'+id;

        var formData = new FormData(this);
        formData.append('_method', 'PATCH');

        $.ajaxSetup({
              headers: {
                  'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
              }
        });
        $.ajax({
            'url': url,
            'type': 'POST',
            data: formData,
            contentType: false,
            cache: false,
            processData: false,
            success: function (response) {
                toastr.success('تم تعديل البلاغ بنجاح');
                $('.btn-close').click();
                table.ajax.reload();
            },
            error: function (xhr) {
                console.log(xhr);
                $('.btn-close').click();
                toastr.error('حدث خطأ ما');
            }
        });

    });    
    });
    </script>
@endpush

@endsection
