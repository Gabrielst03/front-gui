import { Button, Input, Label, Select } from "@roketid/windmill-react-ui";
import PageTitle from "example/components/Typography/PageTitle";
import Layout from "example/containers/Layout";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "services/api";

function ClassroomId() {
  const router = useRouter();

  const [teachers, setTeachers] = useState({
    email: "",
    name: "",
  });

  useEffect(() => {
    // Carrega os dados padrão ao entrar na página
    api.get(`/api/teachers/${router.query.id}`).then((res) => {
      setTeachers(res.data);
    });
  }, [router.query.id]);

  const handleUpdate = async (email: string, name: string) => {
    try {
      // Atualiza os dados do usuário
      const response = await api.put(`/api/teachers/${router.query.id}`, {
        email,
        name,
      });

      console.log(response.data);

      // Atualiza os dados exibidos na página
      setTeachers(response.data);

      toast.success('Dados atualizados com sucesso!')
      router.push('/dashboard/teachers')
    } catch (error) {
      toast.error('Erro ao atualizar dados')
    }
  };

  return (
    <Layout>
      <PageTitle>Detalhes do Professor {router.query.id}</PageTitle>

      <div className="flex flex-col gap-2 bg-gray-700 p-5">
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col gap-1">
            <Label>Nome Completo</Label>
            <Input
              placeholder="Dias"
              value={teachers.name}
              onChange={(e) => setTeachers({ ...teachers, name: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label>Email</Label>
            <Input
              placeholder="Dias"
              value={teachers.email}
              onChange={(e) => setTeachers({ ...teachers, email: e.target.value })}
            />
          </div>
        </div>
        <div className="flex w-full justify-end mt-3">
          <Button
            className="w-[300px]"
            onClick={() => handleUpdate(teachers.email, teachers.name)}
          >
            Salvar
          </Button>
        </div>
      </div>
    </Layout>
  );
}

export default ClassroomId;
