@extends('layouts.appp')
@section('css')@endsection
@section('content')
<div id="content">
                <!-- Begin Page Content -->
                <div class="container-fluid">
                    <!-- DataTales Example -->
                    <div class="card shadow mb-2">
                        <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold text-primary">
                                <a class="btn" data-toggle="modal12" data-target="#exampleModal12" style="font-weight:bold;float:right;font-size:1.2rem">  جدول الملاحظات</a>
                            </h6>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-bordered yajra-datatable"  width="100%" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th>التسلسل</th>
                                            <th> الموظف </th>
                                            <th> الرقم التسلسلي للعميل</th>
                                            <th> حالة البلاغ</th>
                                            <th>الشرح</th>
                                            <th>مرفق الملاحظات</th>
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
    <script src="{{ asset('assets/SmartWizard/jquery.min.js')}}"></script>
    <script src="{{ asset('assets/SmartWizard/bootstrap.js')}}"></script>
    <script src="{{ asset('assets/SmartWizard/custom_js.js')}}"></script>
    <script src="{{ asset('assets/SmartWizard/validator.min.js')}}"></script>
    <script type="text/javascript" src="{{ asset('assets/admin/lib/SmartWizard/dist/js/jquery.smartWizard.js')}}"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-validator/0.5.3/js/bootstrapValidator.js"></script>
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
            ajax: "{{ route('notes.data') }}", 
            columns: [
                {data: 'id', name: 'id'},
                {data: 'user_id', name: 'user_id'},
                {data: 'report_id', name: 'report_id'},
                {data: 'type', name: 'type'},
                {data: 'description', name: 'description'},
                {data: 'file', name: 'file'},
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
                targets: 4,
                render: function (data, type, full, meta) {
                    var id = full['id'];
                    var description = full['description'];
                    return(
                        '<a data-toggle="modal" data-target="#exampleModalCenter'+id+'" class="btn btn-primary btn-sm"><i class="fa fa-eye"></i></a>'+
                        ' <div class="modal fade" id="exampleModalCenter'+id+'" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">'+
                                '<div class="modal-dialog modal-dialog-centered" role="document">'+
                                    '<div class="modal-content">'+
                                    '<div class="modal-header">'+
                                        '<h5 class="modal-title" id="exampleModalLongTitle"> الشرح</h5>'+
                                    '</div>'+
                                    '<div class="modal-body" style="direction:rtl">'+
                                        description+
                                    '</div>'+
                                    '<div class="modal-footer">'+
                                        '<button type="button" class="btn btn-secondary" data-dismiss="modal">إغلاق</button>'+
                                    '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'
                    );
                }
                },
                {
                targets: 5,
                render: function (data, type, full, meta) {
                    var file = full['file'];
                    if(file == null)
                        return 'لايوجد';
                    else    
                        return '<a target="_blank" href="/storage/report-updated-files/'+file+'"><i class="fa fa-download"></i></a>'
                }
                },
                {
                // Actions
                targets: 6,
                render: function (data, type, full, meta) {
                    var id = full['id'];
                    
                    return (
                            '<div>' +
                            '<a title="حذف" style="text-align:center" class="btn btn-danger btn-sm" href="/notes/'+ id + '" id="delete_btn" class="dropdown-item"> <i class="fa fa-trash"></i></a>'+
                            '</div>'
                        );
                }
                }
            ]
        });


        $(document).on('click', '#delete_btn', function (e) {
            e.preventDefault();

            var url = $(this).attr('href');
            bootbox.confirm('سيتم حذف الملاحظة ,هل أنت متأكد ؟', function (res) {

                if (res) {
                    $.ajaxSetup({
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        }
                    });

                    $.ajax({
                        'url': url,
                        'type': 'DELETE',
                        'dataType': 'json',
                        data: {
                            '_token': $('meta[name="csrf-token"]').attr('content')
                        },
                        success: function (response) {
                            toastr.options = {
                                "debug": false,
                                position: { X: 'Left', Y: 'Top' },
                                "fadeIn": 300,
                                "fadeOut": 1000,
                                "timeOut": 5000,
                                "extendedTimeOut": 1000
                            }
                            table.ajax.reload();
                        },
                        error: function (xhr) {
                            
                        }
                    });
                }

            });
        });


        
    });
    </script>
    @endpush

@endsection
