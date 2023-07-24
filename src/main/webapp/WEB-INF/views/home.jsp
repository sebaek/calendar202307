<%--
  Created by IntelliJ IDEA.
  User: admin
  Date: 2023-07-19
  Time: 오전 8:40
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="cal" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Title</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
          crossorigin="anonymous">
    <link rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossorigin="anonymous" referrerpolicy="no-referrer"/>
    <style>
      .done-check:checked + div {
        text-decoration: line-through;
      }
    </style>
</head>
<body>
<cal:navbar/>

<div class="container-lg">

    <div class="row gx-5">
        <div class="col-md-6 col-12">
            <div class="px-3">

                <div id="calendar-root"></div>
            </div>
        </div>
        <div class="col-md-6 col-12">
            <div class="px-3">

                <div id="todo-list-root">
                    <h1 class="text-center fw-bold">
                        TODO
                    </h1>
                    <div id="todo-list-header" class="my-4 d-grid">
                        <button id="todo-add-modal-open-button" class="btn btn-primary">
                            <i class="fa-solid fa-plus"></i>
                            할 일 추가
                        </button>
                    </div>
                    <div id="todo-list-body"></div>
                </div>
            </div>
        </div>
    </div>

</div>

<%-- 입력 모달 --%>
<div class="modal fade" id="todo-modal" tabindex="-1" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">할 일</h1>
            </div>
            <div class="modal-body">
                <div class="mb-3">

                    <input type="date" id="dateStringInput" class="form-control"
                           value="<%= java.time.LocalDate.now() %>">
                </div>
                <div class="mb-3">
                    <label for="titleInput" class="form-label"></label>
                    <input type="text" id="titleInput" class="form-control" placeholder="제목">
                </div>
                <div class="mb-3">
                    <label for="bodyTextarea" class="form-label"></label>
                    <textarea id="bodyTextarea" rows="10" class="form-control"
                              placeholder="본문"></textarea>
                </div>
            </div>
            <div class="modal-footer modal-add-footer" id="modalAddFooter">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    <i class="fa-solid fa-ban"></i>
                    취소
                </button>
                <button type="button" class="btn btn-primary" id="todoAddButton">
                    <i class="fa-solid fa-plus"></i>
                    저장
                </button>
            </div>
            <div class="modal-footer modal-modify-footer" id="modalEditFooter">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    <i class="fa-solid fa-ban"></i>
                    취소
                </button>
                <button class="btn btn-danger" id="todoRemoveButton">
                    <i class="fa-solid fa-trash"></i>
                    삭제
                </button>
                <button type="button" class="btn btn-primary" id="todoModifyButton">
                    <i class="fa-solid fa-pen"></i>
                    저장
                </button>
            </div>
        </div>
    </div>
</div>


<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
        integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
        crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js"
        integrity="sha384-fbbOQedDUMZZ5KreZpsbe1LCZPVmfTnH7ois6mU1QK+m14rQ1l2bGBq41eYeM/fS"
        crossorigin="anonymous"></script>
<script src="https://code.jquery.com/jquery-3.7.0.min.js"
        integrity="sha256-2Pmvv0kuTBOenSvLm6bvfBSSHrUJ+3A7x6P5Ebd07/g="
        crossorigin="anonymous"></script>

<script src="/resources/js/calendar.js"></script>
</body>
</html>
