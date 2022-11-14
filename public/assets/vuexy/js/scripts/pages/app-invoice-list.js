/*=========================================================================================
    File Name: app-invoice-list.js
    Description: app-invoice-list Javascripts
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
   Version: 1.0
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

$(function () {
  'use strict';

  var dtInvoiceTable = $('.user-list-table'),
    assetPath = route,
    invoicePreview = 'app-invoice-preview.html',
    invoiceAdd = assetPath + '/create',
    invoiceEdit = assetPath +'/edit';

  if ($('body').attr('data-framework') === 'laravel') {
    assetPath = $('body').attr('data-asset-path');
    invoicePreview = assetPath + 'app/'+assetPath+'/preview';
    invoiceAdd = assetPath + 'app/'+assetPath+'/add';
    invoiceEdit = assetPath + 'app/'+assetPath+'/edit';
  }

  // datatable
  if (dtInvoiceTable.length) {
    var dtInvoice = dtInvoiceTable.DataTable({
      ajax: assetPath + '/all', // JSON file to add data
      autoWidth: false,
      columns: [
        // columns according to JSON
          { data: 'code' },
        { data: 'customer' },
        { data: 'aramco_number' },
        { data: 'check_number' },
        { data: 'state' },
        { data: 'created_at' },
        { data: 'action' }
      ],
      columnDefs: [
        {
          // For Responsive
          responsivePriority: 4,
          targets: 0
        },
          {
              // For Responsive
              responsivePriority: 4,
              targets: 1,
              title:'اسم العميل'
          },
          {
              // Actions
              targets: 4,
              responsivePriority: 4,
              width: '100px',
              orderable: false,
              render: function (data, type, full, meta) {
                  var $type = full['state'];
                  var roleBadgeObj = {
                      "مقبول": feather.icons['slack'].toSvg({ class: 'font-medium-3 text-success mr-50' }),
                      "مرفوض": feather.icons['slack'].toSvg({ class: 'font-medium-3 text-danger mr-50' }),
                  };
                  return "<span class='text-truncate align-middle'>" + roleBadgeObj[$type] + $type + '</span>';
              }
          },
        {
          // Due Date
          targets: 5,
            responsivePriority: 4,
          width: '160px',
          render: function (data, type, full, meta) {
            var $dueDate = new Date(full['created_at']);
            // Creates full output for row
            var $rowOutput =
              '<span class="d-none">' +
              moment($dueDate).format('YYYYMMDD') +
              '</span>' +
              moment($dueDate).format('DD MMM YYYY');
            $dueDate;
            return $rowOutput;
          }
        },
        {
          // Actions
          targets: -1,
            responsivePriority: 4,
            width: '160px',
          orderable: false,
          render: function (data, type, full, meta) {
              var $id = full['id'];
              var $encrypted_id = full['encrypted_id'];

              return (
              '<div class="d-flex align-items-center col-actions">' +
              '<div class="dropdown">' +
              '<a class="btn btn-sm btn-icon px-0" data-toggle="dropdown">' +
              feather.icons['more-vertical'].toSvg({ class: 'font-medium-2' }) +
              '</a>' +
              '<div class="dropdown-menu dropdown-menu-right">' +
              '<a href="'+assetPath+'/pdf/'+$encrypted_id+ '"  target="_blank" class="dropdown-item">' +
              feather.icons['download'].toSvg({ class: 'font-small-4 mr-50' }) +
              'Download</a>' +
              '<a href="'+assetPath+'/qr/'+$encrypted_id+ '"  target="_blank" class="dropdown-item">' +
              feather.icons['download'].toSvg({ class: 'font-small-4 mr-50' }) +
              'Print QR</a>' +
              '<a href="'+assetPath+'/' +
              $id +
              '/edit" class="dropdown-item">' +
              feather.icons['edit'].toSvg({ class: 'font-small-4 mr-50' }) +
              'View</a>' +
            
              '</div>' +
              '</div>' +
              '</div>'
            );
          }
        }
      ],
      order: [[1, 'desc']],
      dom:
        '<"row d-flex justify-content-between align-items-center m-1"' +
        '<"col-lg-6 d-flex align-items-center"l<"dt-action-buttons text-xl-right text-lg-left text-lg-right text-left "B>>' +
        '<"col-lg-6 d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap pr-lg-1 p-0"f<"invoice_status ml-sm-2">>' +
        '>t' +
        '<"d-flex justify-content-between mx-2 row"' +
        '<"col-sm-12 col-md-6"i>' +
        '<"col-sm-12 col-md-6"p>' +
        '>',
      language: {
        sLengthMenu: 'عرض _MENU_',
        search: 'بحث',
        searchPlaceholder: 'بحث ',
        paginate: {
          // remove previous & next text from pagination
          previous: '&nbsp;',
          next: '&nbsp;'
        }
      },
      // Buttons with Dropdown
      buttons: [
        {
          text: 'اضافة جديد',
          className: 'btn btn-primary btn-add-record ml-2',
          action: function (e, dt, button, config) {
            window.location = invoiceAdd;
          }
        },{
              extend: 'excel',
              text: 'تصدير اكسل',
              className: ' btn btn-primary ml-20',
              exportOptions: {
                  modifier: {
                      // DataTables core
                      order: 'index',  // 'current', 'applied', 'index',  'original'
                      page: 'all',      // 'all',     'current'
                      search: 'none'     // 'none',    'applied', 'removed'
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
              return 'Details of ' + data['client_name'];
            }
          }),
          type: 'column',
          renderer: $.fn.dataTable.Responsive.renderer.tableAll({
            tableClass: 'table',
            columnDefs: [
              {
                targets: 5,
                visible: false
              },
              {
                targets: 6,
                visible: false
              }
            ]
          })
        }
      },
      initComplete: function () {
        $(document).find('[data-toggle="tooltip"]').tooltip();
        // Adding role filter once table initialized
        // this.api()
        //   .columns(4)
        //   .every(function () {
        //     var column = this;
        //     var select = $(
        //       '<select id="UserRole" class="form-control ml-50 text-capitalize"><option value="">اختر التاريخ</option></select>'
        //     )
        //       .appendTo('.user_jeha')
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
        //         select.append('<option value="' + d + '" class="text-capitalize">' + d + '</option>');
        //       });
        //   });
          this.api()
              .columns(4)
              .every(function () {
                  var column = this;
                  var select = $(
                      '<select id="userDept" class="form-control ml-50 text-capitalize"><option value="">اختر الحالة</option></select>'
                  )
                      .appendTo('.user_dept')
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
              .columns(1)
              .every(function () {
                  var column = this;
                  var select = $(
                      '<select id="userRole" class="form-control ml-50 text-capitalize"><option value="">اسم العميل</option></select>'
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

      },
      drawCallback: function () {
        $(document).find('[data-toggle="tooltip"]').tooltip();
      }
    });
  }

    $(document).on('click', '#pay_invoice', function (e) {
        e.preventDefault();

        var url = $(this).attr('href');
        bootbox.confirm('تأكيد عملية الدفع !', function (res) {

            if (res) {

                $.ajax({
                    'url': url,
                    'type': 'GET',
                    'dataType': 'json',
                    data: {
                        '_token': $('meta[name="csrf-token"]').attr('content')
                    },
                    success: function (response) {
                        dtInvoice.ajax.reload();
                        toastr.success(response.message);
                    },
                    error: function (xhr) {
                        toastr['error'](xhr.responseJSON.message, '!!نأسف ', {
                            closeButton: true,
                            tapToDismiss: false
                        });
                    }
                });
            }

        });
    });

});
