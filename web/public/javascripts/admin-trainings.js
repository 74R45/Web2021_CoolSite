$(document).ready(() => {
  $("#createTraining").submit((e) => {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/api/trainings",
      data: JSON.stringify({
        title: $('#createTitle').val(),
        descShort: $('#createDescShort').val(),
        descFull: $('#createDescFull').val(),
        language: $('#createLanguage').val()
      }),
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Content-Type", "application/json");
      },
      success: () => {
        $("#createModal").modal("hide");
        $("#createTraining").trigger("reset");
        loadTrainings();
      },
      error: (xhr) => {
        console.log(xhr.responseJSON);
      }
    });
  });

  $("#editTraining").submit((e) => {
    e.preventDefault();
    $.ajax({
      type: "PUT",
      url: `/api/trainings/${$('#editId')[0].innerHTML}`,
      data: JSON.stringify({
        title: $('#editTitle').val(),
        descShort: $('#editDescShort').val(),
        descFull: $('#editDescFull').val(),
        language: $('#editLanguage').val()
      }),
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Content-Type", "application/json");
      },
      success: () => {
        $("#editModal").modal("hide");
        $("#editTraining").trigger("reset");
        loadTrainings();
      },
      error: (xhr) => {
        console.log(xhr.responseJSON);
      }
    });
  });
  
  // Load trainings when page is opened
  loadTrainings();
});

function setEditingTraining(id) {
  $("#editModal").modal("show");
  $("#editId")[0].innerHTML = id;
  $("#editTitle").val($(`#tt${id}`)[0].innerHTML);
  $("#editDescShort").val($(`#tds${id}`)[0].innerHTML);
  $("#editDescFull").val($(`#tdf${id}`)[0].innerHTML);
  $("#editLanguage").val($(`#tl${id}`)[0].innerHTML);
}

function loadTrainings() {
  $.ajax({
    url: "/api/trainings/all",
    success: (response) => {
      setTrainings(response);
    }
  });
}

function deleteTraining(id) {
  $('#deleteModal').modal('show');
  $('#deleteModalLabel')[0].innerHTML = 'Видалити Тренінг';
  $('#deleteModalText')[0].innerHTML = 'Ви впевнені, що хочете видалити цей тренінг?';
  $('#deleteButton')[0].onclick = () => {
    $.ajax({
      type: "DELETE",
      url: `/api/trainings/${id}`,
      success: (_response) => {
        $('#deleteModal').modal('hide');
        loadTrainings();
      }
    });
  };
}

function setTrainings(data) {
  let $trainingTable = $("#trainingTable");

  $trainingTable.empty();
  data.forEach((training) => {
    $trainingTable.append(
`<tr>
<td id='tt${training.id}'>${training.title}</td>
<td id='tds${training.id}'>${training.descShort}</td>
<td id='tdf${training.id}'>${training.descFull}</td>
<td id='tl${training.id}'>${training.language}</td>
<td>
  <button type="button" class="btn btn-outline-primary mb-2" onclick="setEditingTraining(${training.id})">
    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"></path>
    </svg>
  </button>
  <button type="button" class="btn btn-outline-danger" onclick="deleteTraining(${training.id})">
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