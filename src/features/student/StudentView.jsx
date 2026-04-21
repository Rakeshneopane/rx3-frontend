import { useEffect } from "react";
import { fetchStudents } from "./studentSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import StudentList from "./StudentList";

export default function StudentView() {
  const dispatch = useDispatch();
  const { students, status, error } = useSelector((state) => {
    return state.students;
  });
  console.log("fetched Students: ", students, "typeof: ", typeof students);
  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      {status === "loading" && (
        <p className="text-sm text-gray-500 text-center py-20">Loading...</p>
      )}
      {error && (
        <p className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 max-w-4xl mx-auto mb-6">
          Something went wrong. {error}
        </p>
      )}
      {students && (
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Student View</h2>{" "}
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition">
              {" "}
              <Link to="/addStudent"> Add student </Link>{" "}
            </button>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <StudentList students={students} />
          </div>
        </div>
      )}
    </div>
  );
}
