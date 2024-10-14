import * as R from "@src/allFiles";
import * as S from "./style/global";

import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext"

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <S.AppContainer>
          <S.ContentArea>
            <Routes>
              <Route path="/" element={<R.Landing />} />
              <Route path="/labrent" element={<R.LabRent />} />
              <Route path="/labenroll" element={<R.LabEnroll />} />
              <Route path="/admin" element={<R.TeacherScreen />} />
              <Route path="/rentapr" element={<R.RentApr />} />
              <Route path="/rentdel" element={<R.RentDel />} />
            </Routes>
          </S.ContentArea>
        </S.AppContainer>
      </Router>
    </AuthProvider>
  );
}

export default App
