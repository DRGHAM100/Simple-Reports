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
    updateForm = $('.update-visitor'),
      oTable,
    statusObj = {
      2: { title: 'Inactive', class: 'badge-light-warning' },
      1: { title: 'Active', class: 'badge-light-success' },
      3: { title: 'Inactive', class: 'badge-light-secondary' }
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
      oTable=  dtUserTable.DataTable({
      // ajax: assetPath + 'data/user-list.json', // JSON file to add data
      ajax: assetPath + '/car/all', // JSON file to add data
        "columns": [
            {
                orderable: false,
                'searchable': false,
                'render': function () {
                    return '';
                }
            },
            {'data': 'id', 'name': 'id'},
            {'data': 'driver.name', 'name': 'driver_id'},
            {'data': 'car_no', 'name': 'car_no'},
            {'data': 'mobile', 'name': 'mobile'},
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

        // {
        //   // User Role
        //   targets: 3,
        //   render: function (data, type, full, meta) {
        //     var $role = full['is_admin'];
        //     var $type = full['type'];
        //     var roleBadgeObj = {
        //       "موظف استقبال": feather.icons['user'].toSvg({ class: 'font-medium-3 text-primary mr-50' }),
        //       // 4: feather.icons['settings'].toSvg({ class: 'font-medium-3 text-warning mr-50' }),
        //       // 5: feather.icons['database'].toSvg({ class: 'font-medium-3 text-success mr-50' }),
        //       "موظف تسجيل": feather.icons['edit-2'].toSvg({ class: 'font-medium-3 text-info mr-50' }),
        //       "مسؤول النظام": feather.icons['slack'].toSvg({ class: 'font-medium-3 text-danger mr-50' })
        //     };
        //     return "<span class='text-truncate align-middle'>" + roleBadgeObj[$type] + $type + '</span>';
        //   }
        // },
        // {
        //   // User Status
        //   targets: 4,
        //   render: function (data, type, full, meta) {
        //     var $status = full['status_id'];
        //
        //     return (
        //       '<span class="badge badge-pill ' +
        //       statusObj[$status].class +
        //       '" text-capitalized>' +
        //       statusObj[$status].title +
        //       '</span>'
        //     );
        //   }
        // },
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
              feather.icons['more-vertical'].toSvg({ class: 'font-small-4' }) +
              '</a>' +
              '<div class="dropdown-menu dropdown-menu-right">' +
              '<a href="car/print-badge/'+$id+
              '" target="_blank" class="dropdown-item">' +
              feather.icons['printer'].toSvg({ class: 'font-small-4 mr-50' }) +
              'طباعة كود المركبة</a>' +
              '<a href="#editModal" data-toggle="modal" pull-link="car/' +
              $id +'/edit'+
              '" class="dropdown-item" id="edit_btn">' +
              feather.icons['archive'].toSvg({ class: 'font-small-4 mr-50' }) +
              'تعديل</a>' +
              '<a href="car/'+$id+'" class="dropdown-item delete-record" id="delete_btn"> ' +
              feather.icons['trash-2'].toSvg({ class: 'font-small-4 mr-50' }) +
              'حذف</a></div>' +
              '</div>' +
              '</div>'
            );
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
          text: 'مركبة جديدة',
          className: 'add-new btn btn-primary mt-50',
          attr: {
            'data-toggle': 'modal',
            'data-target': '#modals-slide-in'
          },
          init: function (api, node, config) {
            $(node).removeClass('btn-secondary');
          }
        },
          {
              extend : 'excel',
              text : 'تصدير اكسل',
              className: 'add-new btn btn-primary mt-50',
              exportOptions : {
                  modifier : {
                      // DataTables core
                      order : 'index',  // 'current', 'applied', 'index',  'original'
                      page : 'all',      // 'all',     'current'
                      search : 'none'     // 'none',    'applied', 'removed'
                  }
              }
          }
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
          .columns(3)
          .every(function () {
            var column = this;
            var select = $(
              '<select id="UserRole" class="form-control text-capitalize mb-md-0 mb-2"><option value=""> نوع الحساب </option></select>'
            )
              .appendTo('.user_role')
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
        // Adding plan filter once table initialized
        // this.api()
        //   .columns(4)
        //   .every(function () {
        //     var column = this;
        //     var select = $(
        //       '<select id="UserPlan" class="form-control text-capitalize mb-md-0 mb-2"><option value=""> حالة الحساب </option></select>'
        //     )
        //       .appendTo('.user_plan')
        //       .on('change', function () {
        //         var val = $.fn.dataTable.util.escapeRegex($(this).val());
        //         column.search(val ? '^' + val + '$' : '', true, false).draw();
        //       });
        //
        //     column
        //       .data()
        //       .unique()
        //       .sort()
        //       .each(function (d, j) {
        //         select.append('<option value="' + statusObj[d].title + '" class="text-capitalize">' + statusObj[d].title + '</option>');
        //       });
        //   });
      }

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

  // Form Validation
  if (newUserForm.length) {
    newUserForm.validate({
      errorClass: 'error',
      rules: {
        'card_en': {
          required: true
        },
        'card_no': {
          required: true
        },
        'card_ar': {
          required: true
        }
      }
    });

    newUserForm.on('submit', function (e) {
      var isValid = newUserForm.valid();
      e.preventDefault();

        $('#nameError').text('');
        $('#card_noErrorError').text('');
        $('#mobileError').text('');
        if (isValid) {
          $.ajax({
              'url' : $(this).attr("action"),
              'type' : 'post',
              'datatype':'json',
              'data':newUserForm.serializeArray(),
          }).done(function(response) {
              if(response.addvisit)
                  window.location.replace(response.red_link);
              oTable.ajax.reload();
              newUserSidebar.modal('hide');

          }).fail(function(response) {
              $('#nameError').text(response.responseJSON.errors.name);
              $('#card_enError').text(response.responseJSON.errors.card_en);
              $('#card_noError').text(response.responseJSON.errors.card_no);
              $('#card_arError').text(response.responseJSON.errors.card_ar);
              $('#mobileError').text(response.responseJSON.errors.mobile);

              // $.each(data.responseJSON.errors, function(index, val) {
                  // toastr.error(val);
              // });
          })
        }
    });
  }
  // Update Form

  if (updateForm.length) {
    updateForm.validate({
      errorClass: 'error',
      rules: {
        'card_ar': {
          required: true
        },
        'card_no': {
          required: true
        },
        'card_en': {
          required: true
        }
      }
    });

      updateForm.on('submit', function (e) {
      var isValid = updateForm.valid();
      e.preventDefault();
        $('#card_noError').text('');
        $('#card_arError').text('');
        $('#card_enError').text('');
        if (isValid) {
          $.ajax({
              'url':$(this).attr('action')+'/'+document.getElementById('id_up').value,
              'type' : 'put',
              'datatype':'json',
              'data':updateForm.serializeArray(),
          }).done(function(response) {
              oTable.ajax.reload();
              newUserSidebar.modal('hide');

          }).fail(function(response) {

              $('#card_noErrorUp').text(response.responseJSON.errors.card_no);
              $('#card_arErrorUp').text(response.responseJSON.errors.card_ar);
              $('#card_enErrorUp').text(response.responseJSON.errors.card_en);

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
        });
                   }

               });
    });

});
