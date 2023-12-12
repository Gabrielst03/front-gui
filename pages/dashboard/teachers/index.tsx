import React, { useState, useEffect } from "react";

import PageTitle from "example/components/Typography/PageTitle";
import SectionTitle from "example/components/Typography/SectionTitle";
import CTA from "example/components/CTA";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Avatar,
  Button,
  Pagination,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
} from "@roketid/windmill-react-ui";
import { EditIcon, TrashIcon } from "icons";

import response, { ITableData } from "utils/demo/tableData";
import Layout from "example/containers/Layout";
import { api } from "services/api";
import Link from "next/link";
import { toast } from "react-toastify";
// make a copy of the data, for the second table
const response2 = response.concat([]);

function Tables() {
  const [pageTable1, setPageTable1] = useState(1);
  const [pageTable2, setPageTable2] = useState(1);

  const [dataTable1, setDataTable1] = useState<ITableData[]>([]);
  const [dataTable2, setDataTable2] = useState<ITableData[]>([]);

  const resultsPerPage = 10;
  const totalResults = response.length;

  function onPageChangeTable1(p: number) {
    setPageTable1(p);
  }

  function onPageChangeTable2(p: number) {
    setPageTable2(p);
  }

  // Novo estado para controlar a abertura/fechamento do modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Novos estados para os campos do formulário no modal
  const [newTeacherName, setNewTeacherName] = useState("");
  const [newTeacherEmail, setNewTeacherEmail] = useState("");

  // Função para lidar com a abertura do modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Função para lidar com o fechamento do modal
  const closeModal = () => {
    setIsModalOpen(false);
    // Limpa os campos do formulário ao fechar o modal
    setNewTeacherName("");
    setNewTeacherEmail("");
  };

  // Função para lidar com o envio do formulário (cadastrar professor)
  const handleAddTeacher = async () => {
    try {
      // Faz a requisição para cadastrar o professor
      await api.post("/api/teachers", {
        name: newTeacherName,
        email: newTeacherEmail,
      });

      // Atualiza a lista de professores (faça o fetch novamente se necessário)
      api.get("/api/teachers").then((res) => setTeachers(res.data));

      toast.success(
        `O Professor ${newTeacherName} foi cadastrado com sucesso!`
      );
      // Fecha o modal após o cadastro
      closeModal();
    } catch (error) {
      console.error("Erro ao cadastrar professor:", error);
    }
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTeacherId, setSelectedTeacherId] = useState(null);

  // Função para abrir o modal de confirmação de exclusão
  const openDeleteModal = (teacherId) => {
    setSelectedTeacherId(teacherId);
    setIsDeleteModalOpen(true);
  };

  // Função para fechar o modal de confirmação de exclusão
  const closeDeleteModal = () => {
    setSelectedTeacherId(null);
    setIsDeleteModalOpen(false);
  };

    // Função para deletar um professor
  const handleDeleteTeacher = async () => {
    try {
      // Faz a requisição para deletar o professor
      await api.delete(`/api/teachers/${selectedTeacherId}`);

      // Atualiza a lista de professores (faça o fetch novamente se necessário)
      api.get('/api/teachers').then((res) => setTeachers(res.data));

      // Fecha o modal de confirmação após a exclusão
      closeDeleteModal();
    } catch (error) {
      toast.warning('Não foi possível excluir este professor, pois o mesmo está atrelado em outra entidade')
    }
  };



  const [teachers, setTeachers] = useState<any>([]);

  useEffect(() => {
    setDataTable1(
      response.slice(
        (pageTable1 - 1) * resultsPerPage,
        pageTable1 * resultsPerPage
      )
    );
  }, [pageTable1]);

  useEffect(() => {
    setDataTable2(
      response2.slice(
        (pageTable2 - 1) * resultsPerPage,
        pageTable2 * resultsPerPage
      )
    );
  }, [pageTable2]);

  useEffect(() => {
    api.get("/api/teachers").then((res) => setTeachers(res.data));
  });

  return (
    <Layout>
      <PageTitle>Professores</PageTitle>
      <Button className="mb-10 w-[200px]" onClick={openModal}>Adicionar Professor</Button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>Adicionar Professor</ModalHeader>
        <ModalBody>
          <Label>Nome</Label>
          <Input
            value={newTeacherName}
            onChange={(e) => setNewTeacherName(e.target.value)}
            placeholder="Digite o nome do professor"
          />
          <Label>Email</Label>
          <Input
            value={newTeacherEmail}
            onChange={(e) => setNewTeacherEmail(e.target.value)}
            placeholder="Digite o email do professor"
          />
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleAddTeacher}>Adicionar</Button>
          <Button layout="outline" onClick={closeModal}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
       {/* Modal de confirmação de exclusão */}
      <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
        <ModalHeader>Confirmar Exclusão</ModalHeader>
        <ModalBody>
          <p>Tem certeza de que deseja excluir este professor?</p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleDeleteTeacher}>Confirmar</Button>
          <Button layout="outline" onClick={closeDeleteModal}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Professor</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Ações</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {teachers.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <Avatar
                      src="https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png"
                      className="hidden mr-3 md:block"
                    />
                    <div>
                      <p className="font-semibold">{item.name}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{item.email}</span>
                </TableCell>

<TableCell>
              <div className="flex items-center space-x-4">
                <Link href={`/dashboard/teachers/${item.id}`}>
                  <Button layout="link" size="small" aria-label="Edit">
                    <EditIcon className="w-5 h-5" aria-hidden="true" />
                  </Button>
                </Link>
                <Button
                  layout="link"
                  size="small"
                  aria-label="Delete"
                  onClick={() => openDeleteModal(item.id)}
                >
                  <TrashIcon className="w-5 h-5" aria-hidden="true" />
                </Button>
              </div>
            </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable2}
            label="Navegação"
          />
        </TableFooter>
      </TableContainer>
    </Layout>
  );
}

export default Tables;
