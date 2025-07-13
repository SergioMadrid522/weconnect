import io from "socket.io-client";
import { userStatus } from "../utils/userStatus.js";

const socket = io("http://192.168.0.20:3000");
const storedName = localStorage.getItem("userName");
socket.on("logout-users", (storedName) => {
  userStatus(storedName, "is not longer with us");
});

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
      console.log(storedName);
      socket.emit("offline", storedName);

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
