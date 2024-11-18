import * as R from "@src/allFiles"

import { Routes, Route } from "react-router-dom"

const CommonRouter = () => {

    return (
        <Routes>
            <Route element={<R.PublicRoute />}>
                <Route path="/" element={<R.Landing />} />
            </Route>
            <Route element={<R.PrivateRoute role="ROLE_ADMIN" />}>
                <Route path="/admin" element={<R.TeacherScreen />} />
                <Route path="/admin/management" element={<R.RentManagement />} />
            </Route>
            <Route element={<R.PrivateRoute role="ROLE_USER" />}>
                <Route path="/student" element={<R.StudentScreen />} />
                <Route path="/student/rental" element={<R.LabRentalForm />} />
            </Route>
            <Route path="*" element={<R.NotFound />} />
        </Routes>
    )
}

export default CommonRouter