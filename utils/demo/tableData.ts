interface ITableData {
  id: number;
  name: string;
  email: string;
  discipline: string;
}

const tableData: ITableData[] = [
  {
    id: 1,
    name: "Celso Barreto",
    discipline: "Programação Orientada a Objetos",
    email: "sucelso@gmail.com",
  },
  {
    id: 2,
    name: "Celso Barreto",
    discipline: "Programação Orientada a Objetos",
    email: "sucelso@gmail.com",
  },
];

export default tableData;
export type { ITableData };
