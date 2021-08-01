'use strict';

window.addEventListener('load', function () {
  let forms = document.getElementsByClassName('needs-validation');

  Array.prototype.filter.call(forms, form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      event.stopPropagation();
      if (form.checkValidity() === true) {
        $.ajax({
          type: "POST",
          url: "/api/form",
          data: JSON.stringify({
            firstName: $('#firstName').val(),
            lastName: $('#lastName').val(),
            email: $('#email').val(),
            phone: $('#phone').val().slice(1), // remove the '+'
            text: $('#extraText').val(),
            language: window.location.pathname.startsWith('/en') ? 'ENG' : 'UKR'
          }),
          beforeSend: (xhr) => {
            xhr.setRequestHeader("Content-Type", "application/json");
          },
          success: (response) => {
            if (response.status == 2) {
              $('#spanSuccessConfirmation').show();
              $('#spanSuccessSent').hide();
            } else {
              $('#spanSuccessSent').show();
              $('#spanSuccessConfirmation').hide();
            }
            $('#successToast').toast('show');
          },
          error: (xhr) => {
            console.log(xhr.responseJSON);
          }
        });
      }
      form.classList.add('was-validated');
    }, false);
  });
}, false);