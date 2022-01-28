import Link from 'next/link'
import React, { useEffect } from 'react'
import { Dropdown } from 'react-bootstrap-v5'
import { BiBell } from 'react-icons/bi'
import { FaLevelUpAlt } from 'react-icons/fa'
import { useFetch } from '~/hooks/useFetch'
import Navbar, {
  NavbarDropDownMenu,
  NavbarHeader,
  NavbarListGroup,
  NavbarToggle,
} from './../navbar/index'
import { NotificationItemStyled } from './styles'

const NavbarNotification: React.FC = () => {
  const {
    data: dataFetch,
  } = useFetch(
    `/api/prestacaocontas/alertaPrestacao`,
    {
      revalidateOnReconnect: true,
    }
  )

  return (
    <Navbar className="navbar-nav align-items-center ms-auto">
      <Dropdown as="li" className="nav-item dropdown">
        <NavbarToggle>
          <BiBell size="1.5rem" />
          {dataFetch?.length}
        </NavbarToggle>

        <NavbarDropDownMenu>
          <NavbarHeader
            title="Notificações"
            href={`/gestao/cadastros/prestacaocontas/minhasprestacoes`}
            contentLink="Ver todos"
          />
        <NavbarListGroup>
          {dataFetch?.map((item) => {
            return <NavbarNotificaoItem key={item.id} id={item.id} observacao={item.observacao} funcionario={item.funcionario}/>
          })}
        </NavbarListGroup>
        </NavbarDropDownMenu>
      </Dropdown>
    </Navbar>
  )
}
interface NavbarNotificaoItemProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  id?: string
  observacao?: string
  funcionario?: string
}
const NavbarNotificaoItem: React.FC<NavbarNotificaoItemProps> = ({ id, observacao, funcionario}) => {

  return (
    <Link href={`/gestao/cadastros/prestacaocontas/${id}/despesas`}>
      <NotificationItemStyled
        href= {`/gestao/cadastros/prestacaocontas/minhasprestacoes`}
        className="list-group-item list-group-item-action">
        <div className="row align-items-center">
          <div className="img">
            <FaLevelUpAlt size="2.5rem" />
          </div>
          <div className="col">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h4 className="mb-0">Prestação de Contas Aberta: {id}</h4>
              </div>
            </div>
            <p className="mb-0">
              Observação: {observacao}
            </p>
            <p className="mb-0">
              Funcionario: {funcionario}
            </p>
            {/* <div>
              <small>Há 2 hrs</small>
            </div> */}
          </div>
        </div>
      </NotificationItemStyled>
    </Link>
  )
}

export default NavbarNotification
