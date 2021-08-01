$(document).ready(() => {
  $("#login").submit((e) => {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/api/admin-login",
      data: JSON.stringify({
        login: $('#loginInput').val(),
        password: $('#passwordInput').val()
      }),
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Content-Type", "application/json");
      },
      success: (_response) => {
        window.location.href = `${window.location.origin}/admin`;
      },
      error: (xhr) => {
        $('#failToastMessage')[0].innerHTML = xhr.responseText;
        $('#failToast').toast('show');
      }
    });
  });
});