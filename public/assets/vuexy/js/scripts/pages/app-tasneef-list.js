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
      oTable,
    statusObj = {
      2: { title: 'Inactive', class: 'badge-light-warning' },
      1: { title: 'Active', class: 'badge-light-success' },
    };

    var assetPath = '../admin',
        userView = 'app-user-view.html',
        userEdit = 'app-user-edit.html';
 // Users List datatable
  if (dtUserTable.length) {
      oTable=  dtUserTable.DataTable({
      // ajax: assetPath + 'data/user-list.json', // JSON file to add data
      ajax: assetPath + '/types/All', // JSON file to add data
        "columns": [
            {
                orderable: false,
                'searchable': false,
                'render': function () {
                    return '';
                }
            },
            {'data': 'name', 'name': 'name'},
            {'data': 'status', 'name': 'status'},
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
          // User full name and username
          targets: 1,
          responsivePriority: 4,
          render: function (data, type, full, meta) {
            var $name = full['name'],
              $uname = full['name'],
              $image = full['avatar'];

            // if ($image) {
            //   // For Avatar image
              var $output ='';
            //     // '<img src="' + assetPath + 'images/avatars/' + $image + '" alt="Avatar" height="32" width="32">';
            // } else {
            //   // For Avatar badge
            //   var stateNum = Math.floor(Math.random() * 6) + 1;
            //   var states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary'];
            //   var $state = states[stateNum],
            //     $name = full['name'],
            //     $initials = $name.match(/\b\w/g) || [];
            //   $initials = (($initials.shift() || '') + ($initials.pop() || '')).toUpperCase();
            //   $output = '<span class="avatar-content">' + $initials + '</span>';
            // }
            // var colorClass = $image === '' ? ' bg-light-' + $state + ' ' : '';
            // Creates full output for row
            var $row_output =
              '<div class="d-flex justify-content-left align-items-center">' +
              // '<div class="avatar-wrapper">' +
              // '<div class="avatar ' +
              // colorClass +
              // ' mr-1">' +
              // $output +
              // '</div>' +
              // '</div>' +
              '<div class="d-flex flex-column">' +
              '<span href="' +
              userView +
              '" class="user_name text-truncate"><span class="font-weight-bold">' +
              $name +
              '</span></span>' +
              // '<small class="emp_post text-muted">@' +
              // $uname +
              // '</small>' +
              '</div>' +
              '</div>';
            return $row_output;
          }
        },
          {
              // For Responsive
              className: 'control',
              orderable: false,
              responsivePriority: 2,
              targets: 2,
              visible:false,
          },
        {
          // Actions
          targets: -1,
          title: 'الاجراء',
          orderable: false,
          render: function (data, type, full, meta) {
              var $id = full['id'];

              return (
              '<div class="btn-group">' +
              '<a class="btn btn-sm dropdown-toggle hide-arrow" data-toggle="dropdown">' +
              feather.icons['more-vertical'].toSvg({ class: 'font-small-4' }) +
              '</a>' +
              '<div class="dropdown-menu dropdown-menu-right">' +

              '<a href="#editModal" data-toggle="modal" pull-link="types/' +
              $id +'/edit'+
              '" class="dropdown-item" id="edit_btn">' +
              feather.icons['archive'].toSvg({ class: 'font-small-4 mr-50' }) +
              'تعديل</a>' +
              '<a href="types/'+$id+'" class="dropdown-item delete-record" id="delete_btn"> ' +
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
          text: 'انشاء جديد',
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
                  },
                  columns: 'th:not(:last-child)'
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
              .columns(2)
              .every(function () {
                  var column = this;
                  var select = $(
                      '<select id="UserDept" class="form-control text-capitalize mb-md-0 mb-2"><option value=""> الاسم </option></select>'
                  )
                      .appendTo('.user_jeha')
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
          'name': {
              required: true
          },
          'status': {
              required: true
          }
      }
    });

    newUserForm.on('submit', function (e) {
      var isValid = newUserForm.valid();
      e.preventDefault();

        $('#nameError').text('');
        $('#statusError').text('');
        if (isValid) {
          $.ajax({

              'url' : $(this).attr("action"),
              'type' : 'post',
              'datatype':'json',
              'data':newUserForm.serializeArray(),
          }).done(function(response) {
              oTable.ajax.reload();
              newUserSidebar.modal('hide');

          }).fail(function(response) {
              $('#nameError').text(response.responseJSON.errors.name);
              $('#statusError').text(response.responseJSON.errors.status);
              // $.each(data.responseJSON.errors, function(index, val) {
                  // toastr.error(val);
              // });
          })
        }
    });
  }
  // Update Form

  if (updateUserForm.length) {
    updateUserForm.validate({
      errorClass: 'error',
      rules: {
        'name': {
          required: true
        },
        'status': {
          required: true
        }
      }
    });

      updateUserForm.on('submit', function (e) {
      var isValid = updateUserForm.valid();
      e.preventDefault();

        $('#nameErrorUp').text('');
        $('#statusErrorUp').text('');
        if (isValid) {
          $.ajax({
              'url':$(this).attr('action')+'/'+document.getElementById('id_up').value,
              'type' : 'put',
              'datatype':'json',
              'data':updateUserForm.serializeArray(),
          }).done(function(response) {
              oTable.ajax.reload();
              newUserSidebar.modal('hide');

          }).fail(function(response) {
              $('#nameErrorUp').text(response.responseJSON.errors.name);
              $('#statusErrorUp').text(response.responseJSON.errors.status);

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
                console.log(xhr.responseJSON)
                bootbox.confirm(xhr.responseJSON.message, function (res) {

                })
                }
        });
                 }

           });
    });

});
