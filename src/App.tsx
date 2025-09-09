import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor  } from "./redux/store";
import { ProtectedRoute, PublicRoute } from "./routes/RouteGuards";

import "./App.css";
import SignIn from "./sign/signIn";
import SignUp from "./sign/signUp";
import Dashboard from "./dashboard/Dashboard";
import StudentDetail from "./dashboard/StudentDetail";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes>
          <Route path="/signin" element={
              <PublicRoute>
                <SignIn />
              </PublicRoute>
            }
          />
          <Route path="/signup" element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />

          <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route path="/students/:id" element={<StudentDetail />} />
          <Route path="*" element={<Navigate to="/signin" replace />} />
        </Routes>
      </PersistGate>
    </Provider>
  );
}

export default App;
