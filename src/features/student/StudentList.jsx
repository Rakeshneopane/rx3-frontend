import { Link } from "react-router-dom";

export default function StudentList({ students }) {
  console.log("student in list: ", students);
  return (
    <div>
      {" "}
      <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide px-4 py-3 border-b border-gray-100">
        Student List
      </h3>
      <ul>
        {students.length > 0 &&
          students.map((student, index) => (
            <li key={student._id} className="border-b border-gray-100 last:border-none">
              <Link
                to={`/student/${student._id}`}
                className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {" "}
                <span className="font-medium">{student.name}</span>
                <span className="text-gray-400">Age: {student.age}</span>{" "}
              </Link>
            </li>
          ))}{" "}
      </ul>{" "}
    </div>
  );
}
