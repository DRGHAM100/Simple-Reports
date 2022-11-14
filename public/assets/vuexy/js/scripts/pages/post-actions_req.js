/*=========================================================================================
    File Name: app-user-list.js
    Description: User List page
    --------------------------------------------------------------------------------------
    Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent

==========================================================================================*/
$(function () {
  'use strict';

  var related_tb = $('.related_tb'),oTable;

  var assetPath = '../../admin/';
  var path = '../../task/public/storage/';
    $('#add_action').submit(function(e){
        e.preventDefault();

        var url=$(this).attr('action');
        bootbox.confirm(' تأكيد الحفظ !!',function (res) {
            document.getElementById('save_action').disabled=true;
            $('#save_action').html('يتم الحفظ');

            if(res){
                var form = document.getElementById('add_action'); // You need to use standard javascript object here
                var formData = new FormData(form);
                $.ajax({
                    'url':url,
                    type: 'post',
                    datatype: 'json',
                    processData: false,
                    contentType: false,
                    'data': formData
                })
                    .done(function(response) {
                        toastr.success(response.message);
                        $('#action_modal').modal('hide');
                        $('#text').val('');
                        $('#status').val('');
                        document.getElementById('save_action').disabled=false;
                        $('#save_action').html('حفظ');
                        $('#post-actions').html('');
                    })
                    .fail(function(response) {
                            $('#textError').text(response.responseJSON.errors.text);
                            $('#statusError').text(response.responseJSON.errors.note);
                        document.getElementById('save_action').disabled=false;
                        $('#save_action').html('حفظ');
                    })
            }
        });
    });
    $('#add_forward').submit(function(e){
        e.preventDefault();

        var url=$(this).attr('action');
        bootbox.confirm(' تأكيد الحفظ !!',function (res) {
            document.getElementById('save_forward').disabled=true;
            $('#save_forward').html('يتم الحفظ');

            if(res){
                var form = document.getElementById('add_forward'); // You need to use standard javascript object here
                var formData = new FormData(form);
                $.ajax({
                    'url':url,
                    type: 'post',
                    datatype: 'json',
                    processData: false,
                    contentType: false,
                    'data': formData
                })
                    .done(function(response) {
                        toastr.success(response.message);
                        $('#action_forward').modal('hide');
                        $('#staffs').val('');
                        $('#note2').val('');
                        $('#text2').val('');
                        document.getElementById('save_forward').disabled=false;
                        $('#save_forward').html('حفظ');
                        $('#post-actions').html('');
                    })
                    .fail(function(response) {
                            $('#tex2tError').text(response.responseJSON.errors.text);
                            $('#note2Error').text(response.responseJSON.errors.note);
                            $('#files2Error').text(response.responseJSON.errors.attachs);
                        document.getElementById('save_forward').disabled=false;
                        $('#save_forward').html('حفظ');
                    })
            }
        });
    });
    $('#add_back').submit(function(e){
        e.preventDefault();

        var url=$(this).attr('action');
        bootbox.confirm(' تأكيد الحفظ !!',function (res) {
            document.getElementById('save_back').disabled=true;
            $('#save_back').html('يتم الحفظ');

            if(res){
                var form = document.getElementById('add_back'); // You need to use standard javascript object here
                var formData = new FormData(form);
                $.ajax({
                    'url':url,
                    type: 'post',
                    datatype: 'json',
                    processData: false,
                    contentType: false,
                    'data': formData
                })
                    .done(function(response) {
                        toastr.success(response.message);
                        $('#action_reply').modal('hide');
                        $('#staffs').val('');
                        $('#note3').val('');
                        $('#text3').val('');
                        document.getElementById('save_back').disabled=false;
                        $('#save_back').html('حفظ');
                        $('#post-actions').html('');
                    })
                    .fail(function(response) {
                            $('#tex3tError').text(response.responseJSON.errors.text);
                            $('#note3Error').text(response.responseJSON.errors.note);
                        document.getElementById('save_back').disabled=false;
                        $('#save_forward').html('حفظ');
                    })
            }
        });
    });

    $(document).on('click', '#action_list_btn', function (e) {
        e.preventDefault();

        var url = assetPath+'actions/' + document.getElementById('post_id_main').value;
        console.log(url)
        if ($.fn.DataTable.isDataTable("#action_tb")) {
            $('#action_tb').DataTable().clear().destroy();
        }
        oTable = $("#action_tb").DataTable({
            responsive: true,
            "processing": true,
            "serverSide": true,
            "lengthMenu": [8],
            searching: false,
            info: false,
            "ajax": url,

            // "language": {
            //     "sProcessing": "<img src='{{url('assets/global/plugins/jquery-file-upload/img/loading.gif')}}'>"
            // },
            "columns": [
                {'data': 'text', 'name': 'text'},    // first:dataname , second name in database
                {'data': 'note', 'name': 'note'},
                {'data': 'created_at', 'name': 'created_at'},
                {'data': 'user', 'name': 'user'},
                {'data': 'attachment', 'name': 'attachment'},
            ],
            columnDefs: [
                {
                    // User full name and username
                    targets: 4,
                    // responsivePriority: 4,
                    render: function (data, type, full, meta) {
                        var $files = full['attachment'];
                        var $row_output='';
                        for(var i=0;i<$files.length;i++) {
                            console.log($files[i]);
                            var name =$files[i].attachment.substring($files[i].attachment.lastIndexOf('/')+1);
                             $row_output =$row_output+'<br>'+
                                '<div class="d-flex justify-content-left align-items-center">' +
                                '<div class="d-flex flex-column">' +
                                '<a target="_blank" href="' + path +
                                 $files[i].attachment.replace('public/','') +
                                '" class="user_name text-truncate"><span class="font-weight-bold">' +
                                name +
                                '</span></a>' +
                                '</div>' +
                                '</div>';
                        }
                        return $row_output;
                    }
                },
                ],
            "oPaginate": {
                "sFirst":    "الأول",
                "sPrevious": "السابق",
                "sNext":     "التالي",
                "sLast":     "الأخير"
            },
//                    "scrollY":        "200px"
//                    "scrollCollapse": true
        });
    });

});
