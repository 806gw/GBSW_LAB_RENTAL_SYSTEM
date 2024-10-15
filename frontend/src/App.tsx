import * as R from "@src/allFiles";

import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    // <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<R.Landing />} />
        <Route path="/student" element={<R.StudentScreen />} />
        <Route path="/student/rental" element={<R.LabRentalForm />} />
        <Route path="/admin" element={<R.TeacherScreen />} />
        <Route path="/admin/approval" element={<R.RentApproval />} />
        <Route path="/admin/deletion" element={<R.RentDeletion />} />
      </Routes>
    </Router>
    // </AuthProvider>
  );
}

export default App
