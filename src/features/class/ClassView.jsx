import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  setFilter,
  setSortBy,
  fetchStudents,
} from "../student/studentSlice.js";

export default function CLassView() {
  const { students, filter, sortBy } = useSelector((state) => state.students);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setFilter("All"));
    dispatch(setSortBy("name"));
    if (students.length === 0) dispatch(fetchStudents());
  }, []);

  const filteredStudents = students.filter((student) => {
    if (filter === "All" || filter === "") return true;
    return student.gender === filter;
  });

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return b[sortBy] - a[sortBy];
  });

  const handleFilterChange = (e) => {
    const { value } = e.target;
    dispatch(setFilter(value));
  };
  const handleSortChange = (e) => {
    const { value } = e.target;
    dispatch(setSortBy(value));
  };
  console.log("student in class", students);
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">

        <h2 className="text-xl font-semibold text-gray-800 mb-6">Class View</h2>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <label htmlFor="" className="text-sm text-gray-500">Filter by Gender:</label>
            <select
              onChange={(e) => handleFilterChange(e)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
            >
              <option value="">All</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="" className="text-sm text-gray-500">Sort by:</label>
            <select
              onChange={(e) => handleSortChange(e)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
            >
              {" "}
              <option value="name">Name</option>
              <option value="marks">Marks</option>
              <option value="attendance">Attendance</option>
            </select>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <ul>
            {" "}
            {sortedStudents.map((student, index) => (
              <li
                key={student._id}
                className="flex items-center justify-between px-4 py-3 border-b border-gray-100 last:border-none text-sm text-gray-700"
              >
                {" "}
                <span className="font-medium text-gray-800">{student.name}</span>
                <span className="text-gray-400 capitalize">{student.gender}</span>
                <span className="text-gray-600">Marks: {student.marks}</span>
                <span className="text-gray-600">Attendance: {student.attendance}</span>{" "}
              </li>
            ))}{" "}
          </ul>
        </div>

      </div>
    </div>
  );
}
