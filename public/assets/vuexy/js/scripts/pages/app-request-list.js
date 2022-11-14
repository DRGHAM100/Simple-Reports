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

    var dtUserTable = $('.user-list-table'),
        newUserSidebar = $('.new-user-modal'),
        newUserForm = $('.add-new-user'),
        updateUserForm = $('.update-user'),
        oTable;
    var assetPath = '../admin';

    // Users List datatable
    if (dtUserTable.length) {
        oTable=  dtUserTable.DataTable({
            // ajax: assetPath + 'data/user-list.json', // JSON file to add data
            ajax: assetPath + '/requests/all', // JSON file to add data
            "columns": [
                {'data': 'title', 'name': 'title'},
                {'data': 'user', 'name': 'user'},
                {'data': 'receiver', 'name': 'receiver'},
                {'data': 'status', 'name': 'status'},
                {'data': 'created_at', 'name': 'created_at'},
                {'data': 'action', 'name': 'action', 'orderable': false, 'searchable': false}
            ],
            columnDefs: [
                {
                    targets: 0,
                    'createdCell':  function (td, cellData, rowData, row, col) {
                        $(td).on('click',function () {
                            console.log('cllick');
                            window.location.href=assetPath+'/requests/'+rowData.id;
                        })
                    }
                },
                {
                    targets: 1,
                    'createdCell':  function (td, cellData, rowData, row, col) {
                        $(td).on('click',function () {
                            console.log('cllick');
                            window.location.href=assetPath+'/requests/'+rowData.id;
                        })
                    }
                },
                {
                    // Actions
                    targets: -1,
                    title: 'الاجراء',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        var $id = full['id'];
                        if(full['user_id']===user_id)
                        return (
                            '<div class="btn-group">' +
                            '<a class="btn btn-sm dropdown-toggle hide-arrow" data-toggle="dropdown">' +
                            feather.icons['more-vertical'].toSvg({ class: 'font-small-4' }) +
                            '</a>' +
                            '<div class="dropdown-menu dropdown-menu-right">' +

                            '<a href="requests" class="dropdown-item delete-record" id="delete_btn" data-id="'+$id+'"> ' +
                            feather.icons['trash-2'].toSvg({ class: 'font-small-4 mr-50' }) +
                            'حذف</a></div>' +
                            '</div>' +
                            '</div>'
                        );
                        else return '';
                    }
                }
            ],
            order: [[2, 'desc']],
            dom:
            '<"d-flex justify-content-between align-items-center header-actions mx-1 row mt-75"' +
            '<"col-lg-12 col-xl-6" l>' +
            '<"col-lg-12 col-xl-6 pl-xl-75 pl-0"<"dt-action-buttons text-xl-right text-lg-left text-md-right text-left d-flex align-items-center justify-content-lg-end align-items-center flex-sm-nowrap flex-wrap mr-1"<"mr-1"f>B>>' +
            '>t' +
            '<"d-flex justify-content-between mx-2 row mb-1"' +
            '<"col-sm-12 col-md-6"i>' +
            '<"col-sm-12 col-md-6"p>' +
            '>',
            language: {
                sLengthMenu: 'Show _MENU_',
                search: 'Search',
                searchPlaceholder: 'Search..',
                paginate: {
                    // remove previous & next text from pagination
                    previous: '&nbsp;',
                    next: '&nbsp;'
                }
            },
            // Buttons with Dropdown
            buttons: [
                {
                    text: 'انشاء طلب جديد',
                    className: 'add-new btn btn-primary mt-50',
                    init: function (api, node, config) {
                        $(node).removeClass('btn-secondary');
                    }
                }
                // {
                //     extend : 'excel',
                //     text : 'تصدير اكسل',
                //     className: 'add-new btn btn-primary mt-50',
                //     exportOptions : {
                //         modifier : {
                //             // DataTables core
                //             order : 'index',  // 'current', 'applied', 'index',  'original'
                //             page : 'all',      // 'all',     'current'
                //             search : 'none'     // 'none',    'applied', 'removed'
                //         },
                //         columns: 'th:not(:last-child)'
                //     }
                // }
            ],
            // For responsive popup




        });
    }

    // Check Validity
    function checkValidity(el) {
        if (el.validate().checkForm()) {
            submitBtn.attr('disabled', false);
        } else {
            submitBtn.attr('disabled', true);
        }
    }

    // To initialize tooltip with body container
    $('body').tooltip({
        selector: '[data-toggle="tooltip"]',
        container: 'body'
    });

    $(document).on('click', '#delete_btn', function (e) {
        e.preventDefault();

        var url = $(this).attr('href');
        var id = $(this).attr('data-id');
        console.log(url);
        bootbox.confirm('تأكيد عملية الحذف !', function (res) {

            if (res) {

                $.ajax({
                    'url': url+'/'+id,
                    'type': 'DELETE',
                    'dataType': 'json',
                    data: {
                        '_token': $('meta[name="csrf-token"]').attr('content')
                    },
                    success: function (response) {
                        oTable.ajax.reload();
                               toastr.success(response.message);
                    },
                    error: function (xhr) {
                        oTable.ajax.reload();
                    }
                });
            }

        });
    });

});
