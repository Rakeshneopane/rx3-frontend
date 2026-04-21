import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteStudent } from "./studentSlice";

export default function StudentDetails() {
  const { id } = useParams();
  console.log("id: ", id);
  const navigate = useNavigate();
  const { students } = useSelector((state) => state.students);
  console.log("students array: ", students);
  const student = students.find((student) => student._id === id);
  console.log("student: ", student);
  const dispatch = useDispatch();
  const handleDelete = (e) => {
    dispatch(deleteStudent({ id })).then(() => navigate("/"));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <>
        {student && (
          <div className="bg-white border border-gray-200 rounded-xl p-8 max-w-md mx-auto">
            <h1 className="text-xl font-semibold text-gray-800 mb-6">Student details</h1>

            <div className="flex flex-col gap-3 mb-8">
              <p className="text-sm text-gray-600">
                <span className="text-gray-400">Name: </span>{student.name}
              </p>
              <p className="text-sm text-gray-600">
                <span className="text-gray-400">Age: </span>{student.age}
              </p>
              <p className="text-sm text-gray-600">
                <span className="text-gray-400">Attendance: </span>{student.attendance}%
              </p>
              <p className="text-sm text-gray-600">
                <span className="text-gray-400">Marks: </span>{student.marks}
              </p>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 border border-red-200 text-red-600 text-sm py-2 rounded-lg hover:bg-red-50 transition">
                <span onClick={(e) => handleDelete(e)}>Delete</span>
              </button>
              <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 rounded-lg transition">
                <Link to={`/addStudent/${student._id}/edit`}>Edit details</Link>
              </button>
            </div>
          </div>
        )}
      </>
    </div>
  );
}
