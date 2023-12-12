import { Button, Input, Label, Select } from "@roketid/windmill-react-ui";
import PageTitle from "example/components/Typography/PageTitle";
import Layout from "example/containers/Layout";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "services/api";

function ClassroomId() {
  const router = useRouter();

  const [disciplines, setdisciplines] = useState({
    name: "",
  });

  useEffect(() => {
    // Carrega os dados padrão ao entrar na página
    api.get(`/api/disciplines/${router.query.id}`).then((res) => {
      setdisciplines(res.data);
    });
  }, [router.query.id]);

  const handleUpdate = async (name: string) => {
    try {
      // Atualiza os dados do usuário
      const response = await api.put(`/api/disciplines/${router.query.id}`, {
        name,
      });

      console.log(response.data);

      // Atualiza os dados exibidos na página
      setdisciplines(response.data);

      toast.success('Dados atualizados com sucesso!')
      router.push('/dashboard/disciplines')
    } catch (error) {
      toast.error('Erro ao atualizar dados')
    }
  };

  return (
    <Layout>
      <PageTitle>Detalhes da Disciplina</PageTitle>

      <div className="flex flex-col gap-2 bg-gray-700 p-5">
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col gap-1">
            <Label>Nome</Label>
            <Input
              value={disciplines.name}
              onChange={(e) => setdisciplines({ ...disciplines, name: e.target.value })}
            />
          </div>
        </div>
        <div className="flex w-full justify-end mt-3">
          <Button
            className="w-[300px]"
            onClick={() => handleUpdate(disciplines.name)}
          >
            Salvar
          </Button>
        </div>
      </div>
    </Layout>
  );
}

export default ClassroomId;
