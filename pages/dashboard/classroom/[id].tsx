import { Button, Input, Label, Select } from "@roketid/windmill-react-ui";
import PageTitle from "example/components/Typography/PageTitle";
import Layout from "example/containers/Layout";

import { useRouter } from "next/router";

function ClassroomId() {
  const router = useRouter();

  return (
    <Layout>
      <PageTitle>Detalhes da Sala {router.query.id}</PageTitle>

      <div className="flex flex-col gap-2 bg-gray-700 p-5">
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col gap-1">
            <Label>Professor</Label>
            <Select>
              <option value="">Celso Barreto</option>
              <option value="">Caio</option>
              <option value="">Gabriels</option>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <Label>Dias da Semana</Label>
            <Input placeholder="Dias" defaultValue={'Segunda, Terça, Quinta'}/>
          </div>
           <div className="flex flex-col gap-1">
            <Label>Horário</Label>
            <Input placeholder="Horário" defaultValue={'7:00 ás 11:30'}/>
          </div>
        </div>
        <div className="flex w-full justify-end mt-3">
        <Button className="w-[300px]">Salvar</Button>

        </div>
      </div>
    </Layout>
  );
}

export default ClassroomId;
