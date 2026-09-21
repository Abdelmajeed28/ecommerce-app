import Swal from "sweetalert2";
import { getSwalThemeOptions } from "./swalTheme";

export const showLoginRequiredAlert = (navigate) => {
  Swal.fire({
    ...getSwalThemeOptions(),
    title: "Login First",
    text: " You must to log in to add products to your cart or favorites.",
    icon: "info",
    showCancelButton: true,
    confirmButtonText: "Login In",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#2563EB",
    cancelButtonColor: "#6b7280",
  }).then((result) => {
    if (result.isConfirmed) {
      navigate("/login");
    }
  });
};
