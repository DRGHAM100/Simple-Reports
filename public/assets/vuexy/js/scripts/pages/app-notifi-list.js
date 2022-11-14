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
      oTable;
  var assetPath = '../admin';
console.log(dtUserTable);
 // Users List datatable
  if (dtUserTable.length) {
      oTable=  dtUserTable.DataTable({
      // ajax: assetPath + 'data/user-list.json', // JSON file to add data
      ajax: assetPath + '/notifications/all', // JSON file to add data
        "columns": [
            {'data': 'note', 'name': 'note'},
            {'data': 'created_at', 'name': 'created_at'}
        ],
      columnDefs: [
        {
          // User full name and username
          targets: 0,
          responsivePriority: 4,
          render: function (data, type, full, meta) {
            var $name = full['note'],
              $uname = full['note'],
              $image = full['avatar'];
              var $output =
                '<img src="../../task/assets/vuexy/images/avatars/user-avatar.png" alt="Avatar" height="32" width="32">';

            var colorClass = $image === '' ? ' bg-light-' + $state + ' ' : '';
            // Creates full output for row
            var $row_output =
              '<div class="d-flex justify-content-left align-items-center">' +
              '<div class="avatar-wrapper">' +
              '<div class="avatar ' +
              colorClass +
              ' mr-1">' +
              $output +
              '</div>' +
              '</div>' +
              '<div class="d-flex flex-column">' +
              '<span href="' +
              '" class="user_name text-truncate"><span class="font-weight-bold">' +
              $name +
              '</span></span>' +
              '</div>' +
              '</div>';
            return $row_output;
          },
            'createdCell':  function (td, cellData, rowData, row, col) {
                $(td).on('click',function () {
                    console.log('cllick');
                    if(rowData.type==1)
                    window.location.href=assetPath+'/tasks/'+rowData.task_id;
                    else
                        window.location.href=assetPath+'/requests/'+rowData.task_id;
                })
            }
        },

      ],
          order: [[1, 'desc']],
      language: {
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

    });
  }

  // // Check Validity
  // function checkValidity(el) {
  //   if (el.validate().checkForm()) {
  //     submitBtn.attr('disabled', false);
  //   } else {
  //     submitBtn.attr('disabled', true);
  //   }
  // }

  // // Form Validation
  // if (newUserForm.length) {
  //   newUserForm.validate({
  //     errorClass: 'error',
  //     rules: {
  //       'name': {
  //         required: true
  //       },
  //       'email': {
  //         required: true
  //       },
  //       'password': {
  //         required: true
  //       },
  //       'password_confirmation': {
  //         required: true
  //       },
  //       'is_admin': {
  //         required: true
  //       }
  //     }
  //   });
  //
  //   newUserForm.on('submit', function (e) {
  //     var isValid = newUserForm.valid();
  //     e.preventDefault();
  //
  //       $('#nameError').text('');
  //       $('#emailError').text('');
  //       $('#passwordError').text('');
  //       $('#is_adminError').text('');
  //       if (isValid) {
  //         $.ajax({
  //
  //             'url' : $(this).attr("action"),
  //             'type' : 'post',
  //             'datatype':'json',
  //             'data':newUserForm.serializeArray(),
  //         }).done(function(response) {
  //             oTable.ajax.reload();
  //             newUserSidebar.modal('hide');
  //
  //         }).fail(function(response) {
  //             $('#nameError').text(response.responseJSON.errors.name);
  //             $('#emailError').text(response.responseJSON.errors.email);
  //             $('#passwordError').text(response.responseJSON.errors.password);
  //             $('#is_adminError').text(response.responseJSON.errors.is_admin);
  //
  //             // $.each(data.responseJSON.errors, function(index, val) {
  //                 // toastr.error(val);
  //             // });
  //         })
  //       }
  //   });
  // }
  // // Update Form

//   if (updateUserForm.length) {
//     updateUserForm.validate({
//       errorClass: 'error',
//       rules: {
//         'name': {
//           required: true
//         },
//         'email': {
//           required: true,
//           email: true,
//         },
//         'is_admin': {
//           required: true
//         }
//       }
//     });
//
//       updateUserForm.on('submit', function (e) {
//       var isValid = updateUserForm.valid();
//       e.preventDefault();
//
//         $('#nameErrorUp').text('');
//         $('#emailErrorUp').text('');
//         $('#passwordErrorUp').text('');
//         $('#is_adminErrorUp').text('');
//         if (isValid) {
//           $.ajax({
//               'url':$(this).attr('action')+'/'+document.getElementById('id_up').value,
//               'type' : 'put',
//               'datatype':'json',
//               'data':updateUserForm.serializeArray(),
//           }).done(function(response) {
//               oTable.ajax.reload();
//               newUserSidebar.modal('hide');
//
//           }).fail(function(response) {
//               $('#nameErrorUp').text(response.responseJSON.errors.name);
//               $('#emailErrorUp').text(response.responseJSON.errors.email);
//               $('#passwordErrorUp').text(response.responseJSON.errors.password);
//               $('#is_adminErrorUP').text(response.responseJSON.errors.is_admin);
//
//               // $.each(data.responseJSON.errors, function(index, val) {
//                   // toastr.error(val);
//               // });
//           })
//         }
//     });
//   }
//
//   // To initialize tooltip with body container
//   $('body').tooltip({
//     selector: '[data-toggle="tooltip"]',
//     container: 'body'
//   });
//
//     $(document).on('click', '#delete_btn', function (e) {
//         e.preventDefault();
//
//         var url = $(this).attr('href');
//                bootbox.confirm('تأكيد عملية الحذف !', function (res) {
//
//                    if (res) {
//
//         $.ajax({
//             'url': url,
//             'type': 'DELETE',
//             'dataType': 'json',
//             data: {
//                 '_token': $('meta[name="csrf-token"]').attr('content')
//             },
//             success: function (response) {
//                 oTable.ajax.reload();
// //                                toastr.success(response.message);
//             },
//             error: function (xhr) {
//
//             }
//         });
//                  }
//
//            });
//     });

});
