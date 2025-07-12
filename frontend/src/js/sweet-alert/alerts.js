// Success login and sign up alert
export function successAlert(type, user, link) {
  Swal.fire({
    title: `You've just ${type}`,
    text: `Welcome ${user}, enjoy the chat!`,
    showConfirmButton: false,
    icon: "success",
  });
  setTimeout(() => {
    window.location.href = link;
  }, 1800);
}

// Log out Alert
export function logoutAlert() {
  Swal.fire({
    title: "You're about to log out!",
    text: "Are You sure?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, log me out",
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("userName");
      Swal.fire({
        text: "Loging out, wait a second",
        showConfirmButton: false,
        icon: "success",
      });
      setTimeout(() => {
        window.location.href = "../../index.html";
      }, 1650);
    }
  });
}

export function errorAlert(error) {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: error,
  });
}
