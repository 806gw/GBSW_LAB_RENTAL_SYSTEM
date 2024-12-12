import * as R from "@src/allFiles"

import { Routes, Route } from "react-router-dom"

const CommonRouter = () => {

    return (
        <Routes>
            <Route path="/" element={<R.Landing />} />
            <Route path="/signin" element={<R.SignIn />} />
            <Route element={<R.PrivateRoute role="admin" />}>
                <Route path="/admin" element={<R.TeacherScreen />} />
                <Route path="/admin/management" element={<R.RentManagement />} />
            </Route>
            <Route element={<R.PrivateRoute role="user" />}>
                <Route path="/student" element={<R.StudentScreen />} />
                <Route path="/student/rental" element={<R.LabRentalForm />} />
            </Route>
            <Route path="*" element={<R.NotFound />} />
        </Routes>
    )
}

export default CommonRouter