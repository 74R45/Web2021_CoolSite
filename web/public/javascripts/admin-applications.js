$(document).ready(() => {
  $("#confirmationSwitch").on("change.bootstrapSwitch", (event) => {
    changeStatus(event.target.checked);
  });
  loadApplications();
  loadEmailConfig();
});

function loadApplications() {
  $.ajax({
    url: "/api/applications",
    success: (response) => setApplications(response)
  });
}

function loadEmailConfig() {
  $.ajax({
    url: "/api/email-config",
    success: (response) => setConfigToggle(response.status)
  });
}

function deleteApplication(id) {
  $('#deleteModal').modal('show');
  $('#deleteModalLabel')[0].innerHTML = 'Видалити Заявку';
  $('#deleteModalText')[0].innerHTML = 'Ви впевнені, що хочете видалити цю заявку?';
  $('#deleteButton')[0].onclick = () => {
    $.ajax({
      type: "DELETE",
      url: `/api/applications/${id}`,
      success: (_response) => {
        $('#deleteModal').modal('hide');
        loadApplications();
      }
    });
  };
}

function changeStatus(status) {
  $.ajax({
    type: "POST",
    url: "/api/email-config",
    data: JSON.stringify({status: status}),
    beforeSend: (xhr) => {
      xhr.setRequestHeader("Content-Type", "application/json");
    },
    success: (_response) => setConfigToggle(status)
  });
}

function setConfigToggle(status) {
  $("#confirmationSwitch").prop("checked", status === true);
}

function setApplications(data) {
  let $applicationsTable = $("#applicationsTable");
  $applicationsTable.empty();
  data.forEach((application) => {
    $applicationsTable.append(
`<tr>
<td>${application.firstName} ${application.lastName}</td>
<td>${application.email}</td>
<td>+${application.phone}</td>
<td>${application.text}</td>
<td>
  <button type="button" class="btn btn-outline-danger" onclick="deleteApplication(${application.id})">
    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
    </svg>
  </button>
</td>
</tr>`
    );
  });
}