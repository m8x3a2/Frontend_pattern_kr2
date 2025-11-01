// diary.js — управление задачами
document.addEventListener("DOMContentLoaded", () => {
  const taskList = document.getElementById("taskList");
  const addTaskForm = document.getElementById("addTaskForm");
  const saveBtn = document.getElementById("saveTaskBtn");
  const modalEl = document.getElementById("addTaskModal");
  const modal = new bootstrap.Modal(modalEl);

  let editIndex = null; // null = добавление, число = редактирование

  // Открытие модалки для редактирования
  taskList.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-btn")) {
      const item = e.target.closest("li");
      const [dateText, description] = item.firstChild.textContent.trim().split(" — ");
      const statusBadge = item.querySelector(".badge").textContent.trim();

      document.getElementById("taskDate").value = dateText;
      document.getElementById("taskDescription").value = description;
      document.getElementById("taskStatus").value =
        statusBadge === "✓" || statusBadge === "✓ Выполнено" ? "done" : "in progress";

      editIndex = Array.from(taskList.children).indexOf(item);
      document.getElementById("addTaskModalLabel").textContent = "Редактировать запись";
      modal.show();
    }
  });

  // Сохранение задачи (добавление или редактирование)
  saveBtn.addEventListener("click", () => {
    const date = document.getElementById("taskDate").value.trim();
    const description = document.getElementById("taskDescription").value.trim();
    const status = document.getElementById("taskStatus").value;

    if (!date || !description) {
      alert("Пожалуйста, заполните все поля");
      return;
    }

    const badgeClass = status === "done" ? "bg-success" : "bg-warning";
    const badgeText = status === "done" ? "✓" : "in progress";

    const newItem = document.createElement("li");
    newItem.className = "list-group-item d-flex justify-content-between align-items-center";
    newItem.innerHTML = `
      ${date} — ${description}
      <span class="badge ${badgeClass}">${badgeText}</span>
      <button class="btn btn-sm btn-outline-secondary edit-btn">Редактировать</button>
    `;

    if (editIndex !== null) {
      taskList.replaceChild(newItem, taskList.children[editIndex]);
      editIndex = null;
      document.getElementById("addTaskModalLabel").textContent = "Добавить запись";
    } else {
      taskList.appendChild(newItem);
    }

    addTaskForm.reset();
    modal.hide();
  });

  // При закрытии модалки очищаем форму
  modalEl.addEventListener("hidden.bs.modal", () => {
    addTaskForm.reset();
    editIndex = null;
    document.getElementById("addTaskModalLabel").textContent = "Добавить запись";
  });
});
