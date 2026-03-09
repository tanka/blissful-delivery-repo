import { use, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLoginUserMutation } from "../../store/api/authApi.js";
import { ROLES, ROUTES } from "../../utility/constants.js";
import { useDispatch } from "react-redux";
import { setAuth } from "../../store/slice/authSlice.js";
import { getUserInfoFromToken } from "../../utility/jwtUtility.js";

function Login() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [loginUser, { isLoading, error }] = useLoginUserMutation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // couple of checks before sending data to API endpoint

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all required fields");
      return;
    }
    // model to send to API endpoint
    const loginData = {
      email: formData.email,
      password: formData.password,
    };
    console.log("Form Data Submitted:", loginData);

    try {
      const response = await loginUser(loginData);
      if (response.data?.isSuccess) {
        console.log("Login response data:", response);
        const token = response.data.result?.token;
        const user = getUserInfoFromToken(token);
        //    console.log("Decoded Token and User Info:", token, user);
        toast.success("Login successful!");

        dispatch(setAuth({ user, token }));

        const from = location.state?.from || ROUTES.HOME;
        navigate(from, { replace: true });
      } else {
        toast.error(response.error.data?.errorMessages?.[0] || "Login failed!");
      }
      console.log("Login response:", response);
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err.data?.errorMessages?.[0] || "Login failed!");
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center py-5">
      <div className="container">
        <div className="row g-5 align-items-center justify-content-center">
          {/* Marketing / Side Panel (desktop) */}
          <div className="col-lg-5 d-none d-lg-block">
            <div className="text-center px-4">
              <div className="mb-4">
                <i
                  className="bi bi-basket text-primary"
                  style={{ fontSize: "4rem" }}
                ></i>
              </div>
              <h2 className="fw-bold mb-3">Welcome to MangoFusion</h2>
              <p className="text-muted mb-4">
                Sign in to explore fresh flavors, manage your cart, and place
                your orders seamlessly.
              </p>
              <div className="text-start mx-auto" style={{ maxWidth: "360px" }}>
                <div className="d-flex mb-2 small">
                  <i className="bi bi-check-circle-fill text-primary me-2"></i>
                  <span>Secure account access</span>
                </div>
                <div className="d-flex mb-2 small">
                  <i className="bi bi-check-circle-fill text-primary me-2"></i>
                  <span>Track past orders</span>
                </div>
                <div className="d-flex mb-2 small">
                  <i className="bi bi-check-circle-fill text-primary me-2"></i>
                  <span>Save your favorites</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Panel */}
          <div className="col-md-8 col-lg-6 col-xl-5">
            <div className="border rounded-4 shadow-sm p-4 p-lg-5 bg-body-tertiary">
              <div className="mb-4 text-center">
                <h3 className="fw-bold mb-1">Sign In</h3>
                <p className="text-muted small mb-0">Access your account</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    autoComplete="on"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <label htmlFor="email">Email address</label>
                </div>

                <div className="mb-3">
                  <div className="input-group">
                    <div className="form-floating flex-grow-1">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        autoComplete="on"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      <label htmlFor="password">Password</label>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  // onClick={handleSubmit}
                  className="btn btn-primary w-100 py-2 mb-3"
                >
                  {isLoading && (
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    ></span>
                  )}
                  {isLoading ? "Signing In..." : "Sign In"}
                </button>
              </form>
              <div className="text-center small">
                <span className="text-muted">No account? </span>
                <Link to={ROUTES.REGISTER} className="fw-semibold">
                  Create one
                </Link>
              </div>
              <div className="text-center mt-3 small">
                <Link to={ROUTES.HOME} className="text-decoration-none">
                  <i className="bi bi-arrow-left me-1"></i>Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
