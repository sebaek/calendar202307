$(function () {
  const todoModal = new bootstrap.Modal(document.querySelector("#todo-modal"));
  const modalOpenButton = $("#todo-add-modal-open-button");
  modalOpenButton.on("click", function () {
    $("#titleInput").val("");
    $("#bodyTextarea").val("");
    $("#modalEditFooter").addClass("d-none");
    $("#modalAddFooter").removeClass("d-none");
    todoModal.show();
  })

  $("#todoModifyButton").on("click", function () {
    const id = $(this).data("todoId");
    const dateString = $("#dateStringInput").val();
    const title = $("#titleInput").val();
    const body = $("#bodyTextarea").val();

    const data = {id, dateString, title, body};

    $.ajax(`/modify`, {
      method: "put",
      contentType: "application/json",
      data: JSON.stringify(data),
      complete: function (data) {
        reloadCalendar(new Date(dateString));
        todoModal.hide();
      }
    });
  })

  $("#todoRemoveButton").on("click", function () {
    const id = $(this).data("todoId");
    const dateString = $("#dateStringInput").val();
    const title = $("#titleInput").val();
    const body = $("#bodyTextarea").val();

    // const data = {id, dateString, title, body};

    $.ajax(`/remove/${id}`, {
      method: "delete",
      // data: data,
      complete: function (data) {
        reloadCalendar(new Date(dateString));
        todoModal.hide();
      }
    });
  })

  $("#todoAddButton").on("click", function () {
    const dateString = $("#dateStringInput").val();
    const title = $("#titleInput").val();
    const body = $("#bodyTextarea").val();

    const data = {dateString, title, body};

    $.ajax("/add", {
      method: "post", data: data, complete: function (data) {
        reloadCalendar(new Date(dateString));
        todoModal.hide();
      }
    });
  })

  function reloadTodo(items) {
    const todoListBody = $(document.querySelector("#todo-list-body"));
    todoListBody.empty();

    const todoList = $(`<div class="list-group" />`);

    for (const item of items) {
      const itemElem = $(`
        <li class="list-group-item d-flex align-items-center">
          <input style="width: 14px" 
                 id="checkbox${item.id}" 
                 type="checkbox" 
                 class="form-check-input me-1 done-check flex-shrink-0" 
                 data-item-id="${item.id}" ${item.done ? "checked" : ""}>
          <div class="flex-grow-1 px-2">
            <div data-bs-toggle="collapse" 
                 data-bs-target="#body-container-${item.id}" 
                 style="cursor: pointer">
              ${item.title}
            </div>
            <div id="body-container-${item.id}" 
                 style="white-space: pre-wrap;" 
                 class="collapse px-2">${item.body}</div>
          </div>
          <button class="btn btn-light edit-button ms-auto" 
                  data-item-id="${item.id}">
            <i class="fa-regular fa-pen-to-square"></i>
          </button>
        </li>
      `);
      itemElem.find(".done-check").on("click", function () {
        $.ajax(`/done/${item.id}`, {
          method: "post",
          success: function (data) {
            if (data.result) {
              $(`#checkbox${item.id}`).attr("checked", "checked");
            } else {
              $(`#checkbox${item.id}`).removeAttr("checked");
            }
          }
        });
      });

      itemElem.find(".edit-button").on("click", function () {
        $("#titleInput").val(item.title);
        $("#bodyTextarea").val(item.body);

        $("#modalEditFooter").removeClass("d-none");
        $("#modalAddFooter").addClass("d-none");
        $("#todoRemoveButton").data("todoId", item.id);
        $("#todoModifyButton").data("todoId", item.id);

        todoModal.show();

      });
      todoList.append(itemElem);
    }

    todoListBody.append(todoList);

  }

  function reloadCalendar(today) {
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date = today.getDate();
    let lastDate = new Date(today.getFullYear(), today.getMonth() + 1,
        0).getDate();
    const thisDateString = new Date(today.getFullYear(), today.getMonth(), date,
        9, 0, 0).toISOString().split("T")[0];
    $("#dateStringInput").val(thisDateString);

    const calendarRoot = $(document.querySelector("#calendar-root"));
    calendarRoot.empty();

    const prevButton = $(
        `<h1 class="fw-bold"><i class="fa-solid fa-angle-left"></i></h1>`);
    const nextButton = $(
        `<h1 class="fw-bold"><i class="fa-solid fa-angle-right"></i></h1>`);

    prevButton.on("click", function () {
      let prevMonth = new Date(today.setDate(0));
      let lastDate = prevMonth.getDate();

      reloadCalendar(new Date(prevMonth.setDate(Math.min(lastDate, date))));
    });
    nextButton.on("click", function () {

      let nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
      let lastDate = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1,
          0).getDate();

      date = Math.min(date, lastDate);
      reloadCalendar(
          new Date(nextMonth.getFullYear(), nextMonth.getMonth(), date));
    });
    const thisMonth = $(`<h1 class="fw-bold">${year}년 ${month}월</h1>`);
    const calendarHeader = $(`
      <div style="display: flex; justify-content: space-around; align-items: center; margin-bottom: 3rem; ">
      </div>
    `);
    calendarHeader.append(prevButton, thisMonth, nextButton);

    const calendar = $(`
      <div style="display: grid; grid-template-columns: repeat(7, 1fr); grid-gap: 1rem;">
      </div>
    `);

    const firstDateOfThisMonth = new Date(today.getFullYear(), today.getMonth(),
        1);
    const lastDateOfThisMonth = new Date(today.getFullYear(),
        today.getMonth() + 1, 0);

    const headerStyle = {
      fontWeight: "bold",
      marginBottom: "1rem",
      cursor: "default"
    };
    addDateCell("일", false,
        {
          fontWeight: "bold",
          marginBottom: "1rem",
          color: "red",
          cursor: "default"
        });
    addDateCell("월", false,
        {fontWeight: "bold", marginBottom: "1rem", cursor: "default"});
    addDateCell("화", false,
        {fontWeight: "bold", marginBottom: "1rem", cursor: "default"});
    addDateCell("수", false,
        {fontWeight: "bold", marginBottom: "1rem", cursor: "default"});
    addDateCell("목", false,
        {fontWeight: "bold", marginBottom: "1rem", cursor: "default"});
    addDateCell("금", false,
        {fontWeight: "bold", marginBottom: "1rem", cursor: "default"});
    addDateCell("토", false,
        {
          fontWeight: "bold",
          marginBottom: "1rem",
          color: "blue",
          cursor: "default"
        });

    for (let i = 0; i < firstDateOfThisMonth.getDay(); i++) {
      addDateCell("");
    }

    for (let i = 1; i <= lastDate; i++) {
      if ((new Date(today.getFullYear(), today.getMonth(), i).getDay()) === 0) {
        addDateCell(i, true, {color: "red"});
      } else if ((new Date(today.getFullYear(), today.getMonth(), i).getDay())
          === 6) {
        addDateCell(i, true, {color: "blue"})
      } else {
        addDateCell(i, true)

      }

    }

    for (let i = lastDateOfThisMonth.getDay(); i < 6; i++) {
      addDateCell("");
    }

    function addDateCell(num, addListener, style) {

      const dateCell = $(
          `<span class="p-2" style="text-align: right; cursor: pointer;" data-value="${num}">${num}</span>`);
      if (num === date) {
        dateCell.css("background-color", "yellow");
      }

      if (style) {
        dateCell.css(style);
      }

      if (addListener) {

        dateCell.on("click", function () {

          reloadCalendar(new Date(today.getFullYear(), today.getMonth(),
              parseInt(dateCell.data("value"))));
        });
      }
      calendar.append(dateCell);
    }

    calendarRoot.append(calendarHeader, calendar);

    $.ajax(`/today/${thisDateString}`, {
      success: function (data) {
        reloadTodo(data);
      }
    })

  }

  reloadCalendar(new Date());
});




