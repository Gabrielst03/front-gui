import React, { useState, useEffect } from 'react'

import PageTitle from 'example/components/Typography/PageTitle'
import SectionTitle from 'example/components/Typography/SectionTitle'
import CTA from 'example/components/CTA'
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
} from '@roketid/windmill-react-ui'
import { EditIcon, TrashIcon } from 'icons'

import response, { ITableData } from 'utils/demo/tableData'
import Layout from 'example/containers/Layout'
// make a copy of the data, for the second table
const response2 = response.concat([])

function Tables() {
 
  const [pageTable1, setPageTable1] = useState(1)
  const [pageTable2, setPageTable2] = useState(1)

  const [dataTable1, setDataTable1] = useState<ITableData[]>([])
  const [dataTable2, setDataTable2] = useState<ITableData[]>([])

  const resultsPerPage = 10
  const totalResults = response.length

  function onPageChangeTable1(p: number) {
    setPageTable1(p)
  }

  function onPageChangeTable2(p: number) {
    setPageTable2(p)
  }


  useEffect(() => {
    setDataTable1(response.slice((pageTable1 - 1) * resultsPerPage, pageTable1 * resultsPerPage))
  }, [pageTable1])

  useEffect(() => {
    setDataTable2(response2.slice((pageTable2 - 1) * resultsPerPage, pageTable2 * resultsPerPage))
  }, [pageTable2])

  return (
    <Layout>
      <PageTitle>Cursos</PageTitle>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Curso</TableCell>
              <TableCell></TableCell>
              <TableCell>Disciplina</TableCell>
              <TableCell>Ações</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable2.map((user, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <Avatar src='https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png' className="hidden mr-3 md:block"/>
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{user.job}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.email}</span>
                </TableCell>
                <TableCell>
                                    <span className="text-sm">{user.discipline}</span>

                </TableCell>
                
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button layout="link" size="small" aria-label="Edit">
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button layout="link" size="small" aria-label="Delete">
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
  )
}

export default Tables
