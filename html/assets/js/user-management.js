const showEditUserModal = (btn) => {
  document.querySelector("#id").value = btn.dataset.id;
  document.querySelector("#usernameEdit").value = btn.dataset.username;
  document.querySelector("#firstNameEdit").value = btn.dataset.firstName;
  document.querySelector("#lastNameEdit").value = btn.dataset.lastName;
  document.querySelector("#mobileEdit").value = btn.dataset.mobile;
  document.querySelector("#isAdminEdit").value = btn.dataset.isAdmin;
  document.querySelector("#usernameEdit").checked =
    btn.dataset.isAdmin == "true" ? true : false;
};

const editUser = async (e) => {
  e.preventDefault();

  const formData = new FormData(document.getElementById("editUserForm"));
  const data = Object.fromEntries(formData.entries());

  try {
    const res = await fetch("/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.status == 200) {
      location.reload();
    } else {
      const resText = await res.text();
      throw new Error(resText);
    }
  } catch (err) {
    e.target.querySelector("#errorMessage").innerText = "Cannot update user!";
    console.log(err);
  }
};

const deleteUser = async (id) => {
  try {
    const res = await fetch(`/users/${id}`, {
      method: "DELETE",
    });
    if (res.status == 200) {
      location.reload();
    } else {
      const resText = await res.text();
      throw new Error(resText);
    }
  } catch (err) {
    const toast = new bootstrap.Toast(document.querySelector(".toast"), {});
    const toastBody = document.querySelector(".toast .toast-body");
    toastBody.innerHTML = "Cannot delete user!";
    toastBody.classList.add("test-danger");
    toast.show();
    console.log(err);
  }
};

document
  .querySelector("#editUserModal")
  .addEventListener("shown.bs.modal", () => {
    document.querySelector("#firstNameEdit").focus();
  });

document
  .querySelector("#addUserModal")
  .addEventListener("shown.bs.modal", () => {
    document.querySelector("#firstName").focus();
  });

document.querySelectorAll(".delete-btn").forEach((btnConfirm) => {
  btnConfirm.addEventListener("click", (e) => {
    const id = e.target.dataset.id;
    const options = {
      title: "Are you sure?",
      type: "danger",
      btnOkText: "Yes",
      btnCancelText: "No",
      onConfirm: () => {
        deleteUser(id);
      },
      onCancel: () => {
        console.log("Cancel");
      },
    };
    const {
      el,
      content,
      options: confirmedOptions,
    } = bs5dialog.confirm("Do you really want to delete this user?", options);
  });
});
