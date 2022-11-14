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
  var forwardForm=$('#add_forward');
  var addForm=$('#add_action');
  var backForm=$('#add_back');
  var assetPath = '../../admin/';
  var path = '../../task/public/storage/';

    addForm.validate({
        errorClass: 'error',
        rules: {
            'text': {
                required: true
            },
        }
    });
    $('#add_action').submit(function(e){
        var isValid = addForm.valid();
        e.preventDefault();
        if(isValid){
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
                            $('#reason').val('');
                            $('#reason4').val('');
                            $('#note').val('');
                            $('#note4').val('');
                            $('#files').val('');
                            document.getElementById('save_action').disabled=false;
                            $('#save_action').html('حفظ');
                        })
                        .fail(function(response) {
                            $('#textError').text(response.responseJSON.errors.text);
                            $('#text4Error').text(response.responseJSON.errors.text2);
                            $('#note4Error').text(response.responseJSON.errors.note2);
                            $('#filesError').text(response.responseJSON.errors.attachs);
                            document.getElementById('save_action').disabled=false;
                            $('#save_action').html('حفظ');
                        })
                }
            });
        }

    });

    // pdfMake.fonts = {
    //     Roboto: {
    //         normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
    //         bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
    //         italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
    //         bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
    //     },
    // };
    forwardForm.validate({
        errorClass: 'error',
        rules: {
            'staffs': {
                required: true
            },
            'text': {
                required: true
            },
            'text2': {
                required: true
            }
        }
    });
    $('#add_forward').submit(function(e){
        var isValid = forwardForm.valid();
        e.preventDefault();
        if(isValid){
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
                            $('#tex2tError').text(response.responseJSON.text);
                            $('#note2Error').text(response.responseJSON.note);
                            $('#text4Error').text(response.responseJSON.text2);
                            $('#note4Error').text(response.responseJSON.note2);
                            $('#files2Error').text(response.responseJSON.attachs);
                            document.getElementById('save_forward').disabled=false;
                            $('#save_forward').html('حفظ');
                        })
                }
            });
        }

    });
    backForm.validate({
        errorClass: 'error',
        rules: {
            'text': {
                required: true
            },
        }
    });
    $('#add_back').submit(function(e){
        var isValid = backForm.valid();
        e.preventDefault();
        if(isValid){
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
                            $('#text3Error').text(response.responseJSON.text);
                            $('#note3Error').text(response.responseJSON.note);
                            document.getElementById('save_back').disabled=false;
                            $('#save_forward').html('حفظ');
                        })
                }
            });
        }

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
                {'data': 'id', 'name': 'id','width':"7%"},    // first:dataname , second name in database
                {'data': 'text', 'name': 'text','width':"12%"},
                {'data': 'action_details', 'name': 'action_details','width':"27%"},    // first:dataname , second name in database
                {'data': 'type', 'name': 'type','width':"7%"},
                {'data': 'created_at', 'name': 'created_at','width':"10%"},
                {'data': 'user', 'name': 'user','width':"15%"},
                {'data': 'attachment', 'name': 'attachment','width':"27%"},
            ],
            columnDefs: [
                {
                    // User full name and username
                    targets: 6,
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
                {
                    targets: 3,
                    render: function (data, type, full, meta) {
                        var $type = full['type_id'];
                        var $typeNmame = full['type'];
                        var roleBadgeObj = {
                            1: feather.icons['check-circle'].toSvg({ class: 'font-medium-3 text-primary mr-50' }),
                            2: feather.icons['plus-circle'].toSvg({ class: 'font-medium-3 text-warning mr-50' }),
                            3: feather.icons['corner-up-right'].toSvg({ class: 'font-medium-3 text-success mr-50' }),
                            4: feather.icons['corner-up-left'].toSvg({ class: 'font-medium-3 text-danger mr-50' }),
                            5: feather.icons['plus-circle'].toSvg({ class: 'font-medium-3 text-danger mr-50' }),
                            6: feather.icons['check-circle'].toSvg({ class: 'font-medium-3 text-primary mr-50' }),
                        };
                        return "<span class='text-truncate align-middle'>" + roleBadgeObj[$type] + $typeNmame + '</span>';
                    }
                }
                ],
            order: [[0, 'asc']],
            "oPaginate": false,
            "bPaginate": false,
            dom: '<"d-flex justify-content-between align-items-center header-actions mx-1 row mt-75"' +
            '<"col-lg-12 col-xl-6" l>' +
            '<"col-lg-12 col-xl-6 pl-xl-75 pl-0"<"dt-action-buttons text-xl-right text-lg-left text-md-right text-left d-flex align-items-center justify-content-lg-end align-items-center flex-sm-nowrap flex-wrap mr-1"<"mr-1"f>B>>' +
            '>t' +
            '<"d-flex justify-content-between mx-2 row mb-1"' +
            '<"col-sm-12 col-md-6"i>' +
            '<"col-sm-12 col-md-6"p>' +
            '>',
            buttons: [
                {
                    extend: 'excel',
                    text: 'تصدير اكسل',
                    className: 'add-new btn btn-primary mt-50',
                    exportOptions: {
                        columns: 'th:not(:last-child)'
                    }
                },
                {
                    // extend: 'pdf',
                    text: 'تصدير pdf',
                    className: 'add-new btn btn-primary mt-50',
                    action: function ( e, dt, node, config ) {
                        window.open(urlPDF, '_blank').focus();
                    }
                    // sCharSet:  "utf8",
                    // exportOptions: {
                    //     columns: 'th:not(:last-child)'
                    // },
                    // customize: function (doc) {
                    //     doc.defaultStyle =
                    //         {
                    //             lang: 'roboto',
                    //         };
                    // }
                }
            ],
//                    "scrollY":        "200px"
//                    "scrollCollapse": true
        });
    });

});
