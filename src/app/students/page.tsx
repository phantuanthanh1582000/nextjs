'use client';

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import CustomModal from "@/components/customModal";
import CustomForm from "@/components/customForm";
import { Field } from "@/components/customForm";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

declare const bootstrap: any;

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    classId: "",
  });

  const modalRef = useRef<HTMLDivElement | null>(null);
  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/students");
      setStudents(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddStudent = async () => {
    try {
      await axios.post("http://localhost:3000/api/students", formData);
      fetchStudents();
      setFormData({ name: "", email: "", classId: "" });
      // Đóng modal bằng JS
      if (modalRef.current) {
        const bsModal = bootstrap.Modal.getInstance(modalRef.current);
        bsModal?.hide();
      }
    } catch (error) {
      console.error("Add student error:", error);
    }
  };

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const fields: Field[] = [
  { label: "Tên sinh viên", name: "name", placeholder: "Nhập tên", type: "text" },
  { label: "Email", name: "email", placeholder: "Nhập email", type: "email" },
  { label: "Lớp", name: "classId", placeholder: "Nhập lớp", type: "text" },
];



  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Danh sách sinh viên</h1>
        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addStudentModal">
          Thêm mới
        </button>
      </div>

      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Tên sinh viên</th>
            <th>Email</th>
            <th>Lớp</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student: any) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.classId?.name || "Không rõ"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <CustomModal id="addStudentModal" title="Thêm sinh viên" onConfirm={handleAddStudent} modalRef={modalRef}>
        <CustomForm fields={fields.map(f => ({ ...f, value: formData[f.name as keyof typeof formData] }))} onChange={handleChange} />
      </CustomModal>
    </div>
  );
}
