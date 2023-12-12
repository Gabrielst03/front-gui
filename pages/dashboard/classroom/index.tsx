import { Button } from "@roketid/windmill-react-ui";
import PageTitle from "example/components/Typography/PageTitle";
import Layout from "example/containers/Layout";
import { TeacherIcon } from "icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  MdCalendarMonth,
  MdCalendarViewWeek,
  MdEdit,
  MdLockClock,
  MdMenuOpen,
  MdMore,
  MdOutlineSupervisedUserCircle,
} from "react-icons/md";
import { api } from "services/api";

function Classroom() {
  const [classroom, setClassroom] = useState<any>([]);

  useEffect(() => {
    api.get("/api/classrooms").then((res) => {
      setClassroom(res.data);
    });
  });

  return (
    <Layout>
      <PageTitle>Classroom</PageTitle>

      <div className="grid grid-cols-4">
          <div
            className="w-full rounded-xl p-5 flex justify-between bg-gray-800 text-gray-100"
          >
            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-indigo-400 font-semibold mb-3">
                <MdOutlineSupervisedUserCircle size={32} /> Sala 1
              </div>
              <div className="flex items-center gap-2">
                <TeacherIcon /> Celso Barreto
              </div>
              <div className="flex items-center gap-2">
                <MdCalendarMonth size={24} /> Segunda, Terça e Quarta
              </div>
              <div className="flex items-center gap-2">
                <MdLockClock size={24} /> 7:30 ás 11:00
              </div>
            </div>

              <div className="w-8 h-8 flex items-center justify-center cursor-pointer rounded-lg hover:bg-gray-600 transition-colors">
                <MdEdit />
              </div>
          </div>
      </div>
    </Layout>
  );
}

export default Classroom;
