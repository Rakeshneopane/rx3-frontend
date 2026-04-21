import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setTopStudent,
  updateSchoolStats,
  fetchStudents,
} from "../student/studentSlice.js";

export default function SchoolView() {
  const {
    students,
    totalStudents,
    averageAttendance,
    averageMarks,
    topStudent,
  } = useSelector((state) => state.students);
  const dispatch = useDispatch();
  console.log(
    "from slice: ",
    students,
    totalStudents,
    averageAttendance,
    averageMarks,
    topStudent
  );

  useEffect(() => {
    if (students.length === 0) dispatch(fetchStudents());
  }, [dispatch, students.length]);

  useEffect(() => {
    const totalStudents = students.length;
    const averageAttendance = (
      students.reduce((att, stu) => att + stu.attendance, 0) / totalStudents
    ).toFixed(2);
    const averageMarks = (
      students.reduce((mark, stu) => mark + stu.marks, 0) / totalStudents
    ).toFixed(2);
    const topStudentMark = Math.max(...students.map((s) => s.marks));
    const topStudent = students.find((s) => s.marks === topStudentMark);
    console.log(topStudent);

    dispatch(
      updateSchoolStats({ totalStudents, averageAttendance, averageMarks })
    );
    dispatch(setTopStudent(topStudent));
  }, [students, dispatch]);
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">

        <h2 className="text-xl font-semibold text-gray-800 mb-6"> School View </h2>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white border border-gray-200 rounded-xl px-6 py-5">
            <p className="text-sm text-gray-400 mb-1">Total Students</p>
            <p className="text-2xl font-semibold text-gray-800"> {totalStudents} </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl px-6 py-5">
            <p className="text-sm text-gray-400 mb-1">Average Attendance</p>
            <p className="text-2xl font-semibold text-gray-800"> {averageAttendance}%</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl px-6 py-5">
            <p className="text-sm text-gray-400 mb-1">Average Marks</p>
            <p className="text-2xl font-semibold text-gray-800"> {averageMarks}</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl px-6 py-5">
            <p className="text-sm text-gray-400 mb-1">Top Student</p>
            <p className="text-2xl font-semibold text-gray-800"> {topStudent ? topStudent.name : "-"}</p>
          </div>
        </div>

      </div>
    </div>
  );
}
