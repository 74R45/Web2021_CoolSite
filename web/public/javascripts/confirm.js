'use strict';

const token = document.URL.split('/').slice(-1).pop();
$.ajax({
  type: 'POST',
  url: `/api/token/${token}`,
  success: () => {
    $('#resultText')[0].innerHTML = 'Your e-mail has been validated! Your application has been sent successfully.';
  },
  error: () => {
    $('#resultText')[0].innerHTML = 'Whoops, seems like this token is invalid. If you tried to send an application, make sure you got the link from your confirmation e-mail right.';
  }
});
