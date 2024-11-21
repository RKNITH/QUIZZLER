import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Login from './pages/common/Login.js'
import Register from './pages/common/Register.js'

import './stylesheets/alignments.css'
import './stylesheets/custome-components.css'
import './stylesheets/from-elements.css'
import './stylesheets/layout.css'
import './stylesheets/textelements.css'
import './stylesheets/theme.css'
import ProtectedRoute from './components/ProtectedRoute.js'
import Home from './pages/common/Home.js'
import WriteExam from "./pages/user/writeExam/WriteExam.jsx";
import UserReports from "./pages/user/userReports/UserReport.jsx";
import AdminReports from "./pages/admin/AdminReports/adminReport.jsx";
import Exams from "./pages/admin/Exams/index.jsx";
import AddEditExam from "./pages/admin/Exams/AddEditExams.jsx";
import Loader from "./components/Loader.jsx";
import { useSelector } from "react-redux";

const App = () => {
    const { loading } = useSelector((state) => state.loader);
    return (
        <>
            {loading && <Loader />}
            <BrowserRouter>
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />

                    <Route
                        path="/user/write-exam/:id"
                        element={
                            <ProtectedRoute>
                                <WriteExam />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/user/reports"
                        element={
                            <ProtectedRoute>
                                <UserReports />
                            </ProtectedRoute>
                        }
                    />
                    {/* Admin Routes */}
                    <Route
                        path="/admin/exams"
                        element={
                            <ProtectedRoute>
                                <Exams />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/exams/add"
                        element={
                            <ProtectedRoute>
                                <AddEditExam />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/admin/exams/edit/:id"
                        element={
                            <ProtectedRoute>
                                <AddEditExam />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/admin/reports"
                        element={
                            <ProtectedRoute>
                                <AdminReports />
                            </ProtectedRoute>
                        }
                    />
                </Routes>


            </BrowserRouter>
        </>
    )
}

export default App