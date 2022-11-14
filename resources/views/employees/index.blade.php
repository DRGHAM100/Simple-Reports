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
                                <a class="btn" data-toggle="modal12" data-target="#exampleModal12" style="font-weight:bold;float:right;font-size:1.2rem">  جدول الموظفين</a>
                            </h6>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-bordered yajra-datatable"  width="100%" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th>التسلسل</th>
                                            <th> الاسم</th>
                                            <th> الإيميل</th>
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
            ajax: "{{ route('employees.data') }}",
            columns: [
                {data: 'id', name: 'id'},
                {data: 'name', name: 'name'},
                {data: 'email', name: 'email'},
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
                targets: 3,
                render: function (data, type, full, meta) {
                    var id = full['id'];
                        return (
                            '<div>' +
                            '<a title="حذف" style="text-align:center" class="btn btn-danger btn-sm" href="/employees/'+ id + '" id="delete_btn" class="dropdown-item"> <i class="fa fa-trash"></i></a>'+
                            '</div>'
                        );
                }
                }
            ]
        });

        $(document).on('click', '#delete_btn', function (e) {
            e.preventDefault();

            var url = $(this).attr('href');
            bootbox.confirm('سيتم حذف المستخدم ,هل أنت متأكد ؟', function (res) {

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
