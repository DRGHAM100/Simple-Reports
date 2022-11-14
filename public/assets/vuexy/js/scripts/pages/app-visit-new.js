/**
 * Created by EngAmmar on 14/3/2021.
 */
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
        newUserForm = $('.add-new-visit'),
        updateVisitForm = $('.update-visit'),
        oTable,
        statusObj = {
            0: {title: 'مفتوحة', class: 'badge-light-warning'},
            1: {title: 'مغلقة', class: 'badge-light-success'},
        };

    var assetPath = '../admin',
        userView = 'app-user-view.html',
        userEdit = 'app-user-edit.html';
    if ($('body').attr('data-framework') === 'laravel') {
        assetPath = $('body').attr('data-asset-path');
        userView = assetPath + 'app/user/view';
        userEdit = assetPath + 'app/user/edit';
    }

    // Users List datatable
    if (dtUserTable.length) {
        oTable = dtUserTable.DataTable({
            "ajax":{
                url:assetPath + '/visitsList',
                data: function(d) {
                    d.start_date= document.getElementById('start_date').value;
                    d.end_date= document.getElementById('end_date').value;
                }
            } ,
            "columns": [
                {
                    orderable: false,
                    'searchable': false,
                    'render': function () {
                        return '';
                    }
                },
                {'data': 'id', 'name': 'id'},
                {'data': 'car_no', 'name': 'car_no'},
                {'data': 'car.driver.name', 'name': 'car_no'},
                {'data': 'visit_date', 'name': 'visit_date'},
                {'data': 'visit_time', 'name': 'visit_time'},
                {'data': 'user.name', 'name': 'user_id'},
                {'data': 'action', 'name': 'action', 'orderable': false, 'searchable': false}
            ],
            columnDefs: [
                {
                    // For Responsive
                    className: 'control',
                    orderable: false,
                    responsivePriority: 2,
                    targets: 0
                },
                {
                    // Actions
                    targets: -1,
                    title: 'Actions',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        var $id = full['id'];

                        return (
                            '<div class="btn-group">' +
                            '<a class="btn btn-sm dropdown-toggle hide-arrow" data-toggle="dropdown">' +
                            feather.icons['more-vertical'].toSvg({class: 'font-small-4'}) +
                            '</a>' +
                            '<div class="dropdown-menu dropdown-menu-right">' +
                            // '<a href="#editModal" data-toggle="modal" pull-link="visit/' +
                            // $id + '/edit' +
                            // '" class="dropdown-item" id="edit_btn">' +
                            // feather.icons['archive'].toSvg({class: 'font-small-4 mr-50'}) +
                            // 'تعديل</a>' +
                            '<a href="visit/print/' +
                            $id +
                            '" TARGET="_blank" class="dropdown-item" id="print_btn">' +
                            feather.icons['printer'].toSvg({class: 'font-small-4 mr-50'}) +
                            'طباعة</a>' +
                            '<a href="visit/' + $id + '" class="dropdown-item delete-record" id="delete_btn"> ' +
                            feather.icons['trash-2'].toSvg({class: 'font-small-4 mr-50'}) +
                            'حذف</a></div>' +
                            '</div>' +
                            '</div>'
                        );
                    }
                }
            ],
            order: [[1, 'desc']],
            dom: '<"d-flex justify-content-between align-items-center header-actions mx-1 row mt-75"' +
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
                    extend : 'excel',
                    text : feather.icons['share'].toSvg({ class: 'font-small-4 mr-50' })+'تصدير اكسل',
                    className: 'add-new btn btn-primary mt-50',
                    exportOptions : {
                        modifier : {
                            // DataTables core
                            order : 'index',  // 'current', 'applied', 'index',  'original'
                            page : 'all',      // 'all',     'current'
                            search : 'none'     // 'none',    'applied', 'removed'
                        }
                    }
                },

            ],

            // For responsive popup
            responsive: {
                details: {
                    display: $.fn.dataTable.Responsive.display.modal({
                        header: function (row) {
                            var data = row.data();
                            return 'Details of ' + data['full_name'];
                        }
                    }),
                    type: 'column',
                    renderer: $.fn.dataTable.Responsive.renderer.tableAll({
                        tableClass: 'table',
                        columnDefs: [
                            {
                                targets: 2,
                                visible: false
                            },
                            {
                                targets: 3,
                                visible: false
                            }
                        ]
                    })
                }
            },

            initComplete: function () {
                // Adding role filter once table initialized
                this.api()
                    .columns(2)
                    .every(function () {
                        var column = this;
                        var select = $(
                            '<select id="UserRole" class="form-control text-capitalize mb-md-0 mb-2"><option value=""> رقم المركبة </option></select>'
                        )
                            .appendTo('.visit_date_list')
                            .on('change', function () {
                                var val = $.fn.dataTable.util.escapeRegex($(this).val());
                                column.search(val ? '^' + val + '$' : '', true, false).draw();
                            });

                        column
                            .data()
                            .unique()
                            .sort()
                            .each(function (d, j) {
                                select.append('<option value="' + d + '" class="text-capitalize">' + d + '</option>');
                            });
                    });
                this.api()
                    .columns(3)
                    .every(function () {
                        var column = this;
                        var select = $(
                            '<select id="UserRole" class="form-control text-capitalize mb-md-0 mb-2"><option value=""> اسم المقاول </option></select>'
                        )
                            .appendTo('.visit_driver_list')
                            .on('change', function () {
                                var val = $.fn.dataTable.util.escapeRegex($(this).val());
                                column.search(val ? '^' + val + '$' : '', true, false).draw();
                            });

                        column
                            .data()
                            .unique()
                            .sort()
                            .each(function (d, j) {
                                select.append('<option value="' + d + '" class="text-capitalize">' + d + '</option>');
                            });
                    });
                this.api()
                    .columns(6)
                    .every(function () {
                        var column = this;
                        var select = $(
                            '<select id="UserRole" class="form-control text-capitalize mb-md-0 mb-2"><option value=""> التسجيل بواسطة </option></select>'
                        )
                            .appendTo('.visit_user_list')
                            .on('change', function () {
                                var val = $.fn.dataTable.util.escapeRegex($(this).val());
                                column.search(val ? '^' + val + '$' : '', true, false).draw();
                            });

                        column
                            .data()
                            .unique()
                            .sort()
                            .each(function (d, j) {
                                select.append('<option value="' + d + '" class="text-capitalize">' + d + '</option>');
                            });
                    });
            }

        });
    }

    $('#start_date').on('change', function (e) {
        oTable.ajax.reload();
    });

    $('#end_date').on('change', function (e) {
        oTable.ajax.reload();
    });


    // Check Validity
    function checkValidity(el) {
        if (el.validate().checkForm()) {
            submitBtn.attr('disabled', false);
        } else {
            submitBtn.attr('disabled', true);
        }
    }

    // Form Validation
    if (newUserForm.length) {
        newUserForm.validate({
            errorClass: 'error',
            rules: {
                'visit_date': {
                    required: true
                },
                'visit_time': {
                    required: true
                },
                'reason': {
                    required: true
                },
                'type': {
                    required: true
                }
            }
        });

        newUserForm.on('submit', function (e) {
            var isValid = newUserForm.valid();
            e.preventDefault();

            $('#visit_dateError').text('');
            $('#visit_timeError').text('');
            $('#reasonError').text('');
            $('#ypeError').text('');
            if (isValid) {
                $.ajax({

                    'url' : $(this).attr("action"),
                    'type' : 'post',
                    'datatype':'json',
                    'data':newUserForm.serializeArray(),
                }).done(function(response) {
                    // toastr.success(response.message);
                    toastr['success']('اكمال الزيارة ', 'عمل رائع!! 🎉', {
                        closeButton: true,
                        tapToDismiss: false
                    });
                    // window.location.replace('../../visitor/'+response.visitor);
                }).fail(function(response) {
                    $('#visit_dateError').text(response.responseJSON.errors.visit_date);
                    $('#visit_timeError').text(response.responseJSON.errors.visit_time);
                    $('#reasonError').text(response.responseJSON.errors.reason);
                    $('#typeError').text(response.responseJSON.errors.type);

                    // $.each(data.responseJSON.errors, function(index, val) {
                    // toastr.error(val);
                    // });
                })
            }
        });
    }
    // Update Form

    if (updateVisitForm.length) {
        updateVisitForm.validate({
            errorClass: 'error',
            rules: {
                'name': {
                    required: true
                },
                'email': {
                    required: true,
                    email: true,
                },
                'is_admin': {
                    required: true
                }
            }
        });

        updateVisitForm.on('submit', function (e) {
            var isValid = updateVisitForm.valid();
            e.preventDefault();

            $('#visit_dateErrorUp').text('');
            $('#visit_timeErrorUp').text('');
            $('#reasonErrorUp').text('');
            $('#intervalErrorUp').text('');
            if (isValid) {
                $.ajax({
                    'url':$(this).attr('action')+'/'+document.getElementById('visit_id').value,
                    'type' : 'put',
                    'datatype':'json',
                    'data':updateVisitForm.serializeArray(),
                }).done(function(response) {
                    newUserSidebar.modal('hide');
                    oTable.ajax.reload();

                }).fail(function(response) {
                    $('#visit_dateErrorUp').text(response.responseJSON.errors.visit_date);
                    $('#visit_timeErrorUp').text(response.responseJSON.errors.visit_time);
                    $('#reasonErrorUp').text(response.responseJSON.errors.reason);
                    $('#intervalErrorUp').text(response.responseJSON.errors.interval);

                    // $.each(data.responseJSON.errors, function(index, val) {
                    // toastr.error(val);
                    // });
                })
            }
        });
    }

    // To initialize tooltip with body container
    $('body').tooltip({
        selector: '[data-toggle="tooltip"]',
        container: 'body'
    });

    $(document).on('click', '#delete_btn', function (e) {
        e.preventDefault();

        var url = $(this).attr('href');
               bootbox.confirm('تأكيد عملية الحذف !', function (res) {

                   if (res) {

        $.ajax({
            'url': url,
            'type': 'DELETE',
            'dataType': 'json',
            data: {
                '_token': $('meta[name="csrf-token"]').attr('content')
            },
            success: function (response) {
                oTable.ajax.reload();
//                                toastr.success(response.message);
            },
            error: function (xhr) {

            }
        })
                   }

               });
    });

});
