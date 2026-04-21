import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStudent, updateStudent } from "./studentSlice";
import { useParams, useNavigate } from "react-router-dom";

export default function AddStudent() {
  const { id } = useParams();
  const isEdit = !!id;
  console.log("isEdit: ", isEdit);

  const studentToEdit = useSelector((state) =>
    state.students.students.find((student) => student._id === id)
  );
  console.log("to find stdn: ", studentToEdit);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: studentToEdit?.name ?? "",
    age: studentToEdit?.age ?? "",
    grade: studentToEdit?.grade ?? "",
    gender: studentToEdit?.gender ?? "",
    attendance: studentToEdit?.attendance ?? "",
    marks: studentToEdit?.marks ?? "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, age, grade, gender, attendance, marks } = formData;
    if (!gender) {
      alert("Please select a gender");
      return;
    }
    if (isEdit) {
      dispatch(
        updateStudent({
          id,
          updateStudent: {
            name,
            age: parseInt(age),
            grade,
            gender,
            attendance: parseInt(attendance),
            marks: parseInt(marks),
          },
        })
      ).then(() => navigate("/"));
    } else {
      dispatch(
        addStudent({
          name,
          age: parseInt(age),
          grade,
          gender,
          attendance: parseInt(attendance),
          marks: parseInt(marks),
        })
      ).then(() => navigate("/"));
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="bg-white border border-gray-200 rounded-xl p-8 w-full max-w-md mx-auto">
        <form>
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-gray-800">
              {isEdit ? "Update" : "Add"} Student
            </h1>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-sm text-gray-500"></label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) => handleChange(e)}
                placeholder="Name"
                required
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-sm text-gray-500"></label>
              <input
                type="text"
                name="age"
                value={formData.age}
                onChange={(e) => handleChange(e)}
                placeholder="Age"
                required
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-sm text-gray-500"></label>
              <input
                type="text"
                name="grade"
                value={formData.grade}
                onChange={(e) => handleChange(e)}
                placeholder="Grade"
                required
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-sm text-gray-500">Gender</label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value={"male"}
                    onChange={(e) => handleChange(e)}
                    className="accent-indigo-600"
                  />
                  Male
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value={"female"}
                    onChange={(e) => handleChange(e)}
                    className="accent-indigo-600"
                  />
                  Female
                </label>
              </div>
            </div>

            {isEdit ? (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="text-sm text-gray-500"></label>
                  <input
                    type="text"
                    name="attendance"
                    value={formData.attendance}
                    onChange={(e) => handleChange(e)}
                    placeholder="Attendance"
                    required
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="text-sm text-gray-500"></label>
                  <input
                    type="text"
                    name="marks"
                    value={formData.marks}
                    onChange={(e) => handleChange(e)}
                    placeholder="Marks"
                    required
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
                  />
                </div>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="mt-6">
            <button
              onClick={(e) => handleSubmit(e)}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 rounded-lg transition"
            >
              {isEdit ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
