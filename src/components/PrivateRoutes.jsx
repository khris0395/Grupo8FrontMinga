import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateLogin({ children }) {
  const token = useSelector((state) => state.authStore.token);

  if (token) {
    return <Navigate to="/home" replace />;
  }
  return children;
}

function PrivateroleNoToken({ children }) {
    const token = useSelector((state) => state.authStore.token);
  
    if (!token) {
      return <Navigate to="/home" replace />;
    }
    return children;
  }

function PrivateManager({ children }) {
  const token = useSelector((state) => state.authStore.token);
  const role = useSelector((state) => state.authStore.user.role);

  if (!token || role === 0) {
    return <Navigate to="/home" replace />;
  }
  return children;
}

function PrivateRoles({ children }) {
  const token = useSelector((state) => state.authStore.token);
  const role = useSelector((state) => state.authStore.user.role);

  if (token && role !== 0) {
    return <Navigate to="/home" replace />;
  }
  return children;
}

function PrivateProfileAuthor({ children }) {
  const token = useSelector((state) => state.authStore.token);
  const role = useSelector((state) => state.authStore.user.role);

  if (token && role !== 1) {
    return <Navigate to="/home" replace />;
  }
  return children;
}

function PrivateProfileCompany({ children }) {
  const token = useSelector((state) => state.authStore.token);
  const role = useSelector((state) => state.authStore.user.role);

  if (token && role !== 2) {
    return <Navigate to="/home" replace />;
  }
  return children;
}

function PrivateAdmin({ children }) {
  const token = useSelector((state) => state.authStore.token);
  const role = useSelector((state) => state.authStore.user.role);

  if (token && role !== 3) {
    return <Navigate to="/home" replace />;
  }
  return children;
}

export {
  PrivateLogin,
  PrivateAdmin,
  PrivateManager,
  PrivateProfileAuthor,
  PrivateProfileCompany,
  PrivateRoles,
  PrivateroleNoToken
};
