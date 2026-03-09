import { useSelector } from "react-redux";
import { Link, Navigate, useLocation } from "react-router-dom";
import { Children } from "react";
import { ROUTES, ROLES } from "../utility/constants";

function RoleBasedRoutes({ allowedRoles, children }) {
  console.log("In RoleBased Routes ", allowedRoles);
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return (
      <Navigate to={ROUTES.LOGIN} state={{ from: location.pathname }} replace />
    );
  }

  const hasRequiredRole = allowedRoles
    ? Array.isArray(allowedRoles)
      ? allowedRoles.includes(user?.roles)
      : user?.roles === allowedRoles
    : true;

  if (!hasRequiredRole && allowedRoles) {
    return (
      <div className="container py-5" style={{ marginTop: "80px" }}>
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <div className="card border-danger">
              <div className="card-body p-5">
                <i
                  className="bi bi-shield-exclamation text-danger"
                  style={{ fontSize: "64px" }}
                ></i>
                <h1 className="text-danger mt-3">Access Denied</h1>
                <p className="text-muted mb-3">
                  You don't have permission to access this page.
                </p>
                <div className="p-3 rounded mb-4">
                  <p className="mb-1">
                    <strong>Your role: </strong>
                    <span className="badge bg-secondary ms-1">
                      {user?.roles || "Unknown"}
                    </span>
                  </p>
                  <p className="mb-0">
                    <strong>Required roles: </strong>
                    {Array.isArray(allowedRoles) ? (
                      allowedRoles.map((role) => (
                        <span key={role} className="badge bg-primary ms-1">
                          {role}
                        </span>
                      ))
                    ) : (
                      <span className="badge bg-primary ms-1">
                        {allowedRoles}
                      </span>
                    )}
                  </p>
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                  <button
                    className="btn btn-secondary"
                    onClick={() => window.history.back()}
                  >
                    <i className="bi bi-arrow-left me-2"></i>
                    Go Back
                  </button>
                  <Link to={ROUTES.HOME} className="btn btn-primary">
                    <i className="bi bi-house me-2"></i>
                    Go Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return children;
}

export default RoleBasedRoutes;
