import { useMemo } from 'react'
import { Column } from 'react-table'
import { TimeSheet } from '../../../../types/models/timeSheet'
import { leftPad } from '../../../../util/stringUtil'

export const columns = (): Column<TimeSheet>[] =>
  useMemo<Column<TimeSheet>[]>(
    () => [
      {
        Header: 'Código',
        accessor: data => leftPad(data.id, 6),
        id: 'id',
        style: {
          width: 100,
        },
      },
      {
        Header: 'Funcionário',
        accessor: data => data.funcionario.nome,
        id: 'funcionario',
      },
      {
        Header: 'Atividade',
        accessor: data => data.tarefas.nome,
        id: 'tarefa',
      },
      {
        Header: 'Projeto',
        accessor: data => data.projetos.nome,
        id: 'projetos',
      },
      {
        Header: 'Tempo Trabalhado',
        accessor: data => data.qtdHoras,
      },
      {
        Header: 'Data',
        accessor: data => data.data,
      },
    ],
    []
  )