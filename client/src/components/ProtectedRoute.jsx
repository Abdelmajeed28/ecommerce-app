import { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
// import { showLoginRequiredAlert } from "../utils/authAlert";
import Swal from "sweetalert2";
import { getSwalThemeOptions } from "../utils/swalTheme";

function ProtectedRoute() {
  // const { isAuthenticated } = useSelector((state) => state.auth);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     showLoginRequiredAlert(navigate);
  //   }
  // }, [isAuthenticated]);

  // return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  // const [shouldRedirect, setShouldRedirect] = useState(false);
  const [alertShown, setAlertShown] = useState(false);

  if (!isAuthenticated && !alertShown) {
    setAlertShown(true);
    Swal.fire({
      ...getSwalThemeOptions(),
      title: "Login First",
      text: "You must to log in to go to this page",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Log In ",
      cancelButtonText: " back to home",
      confirmButtonColor: "#2563EB",
      cancelButtonColor: "#6b7280",
      allowOutsideClick: false, // يمنع القفل من غير اختيار
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/login");
      } else {
        navigate("/");
      }
    });
  }

  if (!isAuthenticated) {
    return null; // منستناش الـ Outlet ولا نعمل أي redirect لحد ما اليوزر يختار
  }

  return <Outlet />;
}

export default ProtectedRoute;
