/* eslint-disable jsx-a11y/no-onchange */
import add from 'date-fns/add'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BiTrendingDown, BiTrendingUp } from 'react-icons/bi'
import {
  ModalFiltrarContasPagar,
  ModalFiltrarContasReceber,
} from '~/components/modules'
import { InitialData } from '../../../types/initialData'
import { ContasPagarPagination } from '../../../types/models/contasPagar'
import { ContasReceberPagination } from '../../../types/models/contasReceber'
import { formatMoney } from '../../../util/stringUtil'
import Button from '../../elements/button'
import TableConsultaContasPagar from '../../modules/tables/consulta-contas-pagar'
import { TemplateDefaultTable } from '../default'
import { Title } from './../../elements/title/index'
import TableConsultaContasReceber from './../../modules/tables/consulta-contas-receber/index'
import { CardTotalStyled } from './styles'

export type FiltroData =
  | 'Hoje'
  | '7 dias'
  | '30 dias'
  | 'Em atraso'
  | 'Personalizado'

type ConsultasTemplateProps = InitialData<any> & {
  dataContasReceber?: ContasReceberPagination
  dataContasPagar?: ContasPagarPagination
}
const ConsultasTemplate: React.FC<ConsultasTemplateProps> = ({
  dataContasReceber,
  dataContasPagar,
}) => {
  const [valorTotalContasReceber, setValorTotalContasReceber] = useState(0)
  const [valorTotalContasPagar, setValorTotalContasPagar] = useState(0)
  const [filtroData, setFiltroData] = useState<FiltroData>('Hoje')
  const [dataInicial, setDataInicial] = useState<Date>()
  const [dataFinal, setDataFinal] = useState<Date>()
  const [isEmAtraso, setIsEmAtraso] = useState(false)

  useEffect(() => {
    const currentDate = new Date()
    setIsEmAtraso(false)
    switch (filtroData) {
      case 'Hoje':
        setDataInicial(currentDate)
        setDataFinal(new Date())
        break
      case '7 dias':
        setDataInicial(currentDate)
        setDataFinal(add(new Date(), { days: 7 }))
        break
      case '30 dias':
        setDataInicial(currentDate)
        setDataFinal(add(new Date(), { days: 30 }))
        break
      case 'Em atraso':
        // setDataInicial(null)
        // setDataFinal(null)
        setIsEmAtraso(true)
        break
      default:
        break
    }
  }, [filtroData])
  return (
    <>
      <div className="container-fluid p-0">
        <div className="row">
          <div className="d-flex col-md-12 pb-3">
            <Button
              type="button"
              className="btn btn-sm btn-primary"
              onClick={() => setFiltroData('Hoje')}>
              Hoje
            </Button>
            <Button
              type="button"
              className="btn btn-sm btn-primary"
              onClick={() => setFiltroData('7 dias')}>
              7 dias
            </Button>
            <Button
              type="button"
              className="btn btn-sm btn-primary"
              onClick={() => setFiltroData('30 dias')}>
              30 Dias
            </Button>
            <Button
              type="button"
              className="btn btn-sm btn-warning"
              onClick={() => setFiltroData('Em atraso')}>
              Em atraso
            </Button>
          </div>
        </div>
        <div className="container-fluid p-0">
          <div className="row g-3">
            <div className="col-6 col-sm-6 col-lg-3">
              <CardTotalStyled typeCard="contas-receber" className="card">
                <div>
                  <Link href="/gestao/cadastros/contasreceber">
                    <a>Contas a receber</a>
                  </Link>
                  <span>{formatMoney(valorTotalContasReceber)}</span>
                  <p>{filtroData}</p>
                  <BiTrendingUp />
                </div>
              </CardTotalStyled>
            </div>
            <div className="col-6 col-sm-6 col-lg-3">
              <CardTotalStyled typeCard="contas-pagar" className="card">
                <div>
                  <Link href="/gestao/cadastros/contaspagar">
                    <a>Contas a pagar</a>
                  </Link>
                  <span>{formatMoney(valorTotalContasPagar)}</span>
                  <p>{filtroData}</p>
                  <BiTrendingDown />
                </div>
              </CardTotalStyled>
            </div>
          </div>
        </div>
      </div>
      <Title text="Contas a Receber" margin="0 0 1rem 0" />
      <TemplateDefaultTable height="34rem">
        <TableConsultaContasReceber
          data={dataContasReceber}
          dtVenInicial={dataInicial}
          dtVenFinal={dataFinal}
          isEmAtraso={isEmAtraso}
          onChangeValorTotal={valor => setValorTotalContasReceber(valor)}
        />
      </TemplateDefaultTable>
      <Title text="Contas a Pagar" />
      <TemplateDefaultTable height="34rem">
        <TableConsultaContasPagar
          data={dataContasPagar}
          dtVenInicial={dataInicial}
          dtVenFinal={dataFinal}
          isEmAtraso={isEmAtraso}
          onChangeValorTotal={valor => setValorTotalContasPagar(valor)}
        />
      </TemplateDefaultTable>
      <ModalFiltrarContasPagar />
      <ModalFiltrarContasReceber />
    </>
  )
}

export default ConsultasTemplate
