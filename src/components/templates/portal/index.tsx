/* eslint-disable jsx-a11y/no-onchange */
import React, { useEffect, useState } from 'react'
import { TemplateDefaultTable } from '../default'
import { BoxTotalizerContent } from '../../elements/box-totalizer-content/index'
import { BoxChartsStyled, BoxDreStyled } from '../../../components/elements/box-charts/styles'
import Button from '../../elements/button'
import { useFetch } from '../../../hooks/useFetch';
import { alertError } from '../../elements/alert';
import { TOAST_CONTAINER } from '../../../util/constants';
import dynamic from 'next/dynamic';
import { BoxChartsContentStyled, BoxChartsContentStyledProps } from '../../elements/box-charts-content/styles';
import _isEmpty from 'lodash/isEmpty';
import { BoxPageTotalizersStyled, BoxTotalizersStyled } from '~/components/elements/box-totalizer-content/styles';
import { BoxTotalizer, BoxTotalizerBaixas } from '~/components/elements/box-totalizer';
import { formatMoney } from '~/util/stringUtil';
import { format } from 'date-fns'
import pt from 'date-fns/locale/pt-BR'
import moment from 'moment'
const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const PortalTemplate: React.FC = () => {
  const [DataFilterDashboard, setDataFilterDashboard] = useState([]);
  const [DataFilterDashboardReceive, setDataFilterDashboardReceive] = useState([]);
 
  const { data: today } = useFetch(`/api/borderoHojeDashBoard`, {
    revalidateOnReconnect: true,
    onError: error => {
      alertError(error, TOAST_CONTAINER.modal)
    },
  })
  const { data: todayReceive } = useFetch(`/api/receberhojedash`, {
    revalidateOnReconnect: true,
    onError: error => {
      alertError(error, TOAST_CONTAINER.modal)
    },
  })
  const { data: sevenDays } = useFetch(`/api/setediasdashboard`, {
    revalidateOnReconnect: true,
    onError: error => {
      alertError(error, TOAST_CONTAINER.modal)
    },
  })
  const { data: sevenDaysReceive } = useFetch(`/api/setediasreceberdash`, {
    revalidateOnReconnect: true,
    onError: error => {
      alertError(error, TOAST_CONTAINER.modal)
    },
  })
  const { data: fifteenDays } = useFetch(`/api/quinzediasdashboard`, {
    revalidateOnReconnect: true,
    onError: error => {
      alertError(error, TOAST_CONTAINER.modal)
    },
  })
  const { data: fifteenDaysReceive } = useFetch(`/api/quinzediasreceberdash`, {
    revalidateOnReconnect: true,
    onError: error => {
      alertError(error, TOAST_CONTAINER.modal)
    },
  })
  const { data: thirtyDays } = useFetch(`/api/trintadiasdashboard`, {
    revalidateOnReconnect: true,
    onError: error => {
      alertError(error, TOAST_CONTAINER.modal)
    },
  })
  const { data: thirtyDaysReceive } = useFetch(`/api/trintadiasreceberdash`, {
    revalidateOnReconnect: true,
    onError: error => {
      alertError(error, TOAST_CONTAINER.modal)
    },
  })
  const { data: receiveDown } = useFetch(`/api/receberbaixadashboard/30`, {
    revalidateOnReconnect: true,
    onError: error => {
      alertError(error, TOAST_CONTAINER.modal)
    },
  })

  function onChangeDateButtons(date) {
    switch (date) {
      case 'hoje':
        setDataFilterDashboard(today);
        setDataFilterDashboardReceive(todayReceive);
        console.log(DataFilterDashboardReceive)
        break
      case '7 dias':
        setDataFilterDashboard(sevenDays);
        setDataFilterDashboardReceive(sevenDaysReceive);
        break
      case '15 dias':
        setDataFilterDashboard(fifteenDays);
        setDataFilterDashboardReceive(fifteenDaysReceive);
        break
      case '30 dias':
        setDataFilterDashboard(thirtyDays);
        setDataFilterDashboardReceive(thirtyDaysReceive);
        break
      default:
        break
    }
  }
  
  const [dataPay, setDatapay] = useState([]);
  const [dataReceive, setDatareceive] = useState([]);
  const [dataPaydown, setDatapaydown] = useState([]);
  const [dataReceivedown, setDatareceivedown] = useState([]);
  const [dataPayCalc, setDatapaycalc] = useState([]);
  const [dataReceiveCalc, setDatareceivecalc] = useState([]);
  const [date, setDate] = useState([]);

    useEffect(() => {
      if (!_isEmpty(thirtyDays)) {
        const allData = thirtyDays;
        const reducer = (previousValue, currentValue) => previousValue + currentValue;
        const allAPValue = allData.map((item, indice) => {
          return item.valor
        });
        const accountsPay = allAPValue.reduce(reducer);
        setDatapay(allAPValue);
        setDatapaycalc(accountsPay.toFixed(2));
        }
        else {
          setDatapay([]);
          setDatapaycalc([]);
        }
      }, [thirtyDays]);
  
    useEffect(() => {
      if (!_isEmpty(thirtyDaysReceive)) {
        const allData = thirtyDaysReceive;
        const reducer = (previousValue, currentValue) => previousValue + currentValue;
        const allARValue = allData.map((item, indice) => {
          return item.valor;
        });
        const accountsReceive = allARValue.reduce(reducer);
        setDatareceive(allARValue);
        setDatareceivecalc(accountsReceive.toFixed(2));
        }
        else {
          setDatareceive([]);
          setDatareceivecalc([]);
        }
      }, [thirtyDaysReceive]);

    useEffect(() => {
      if (!_isEmpty(DataFilterDashboard)) {
        const allData = DataFilterDashboard;
        const reducer = (previousValue, currentValue) => previousValue + currentValue;
        const allAPValue = allData.map((item, indice) => {
          return item.valor
        });
        
        const accountsPay = allAPValue.reduce(reducer);
        setDatapay(allAPValue);
        setDatapaycalc(accountsPay.toFixed(2));
        }
        else {
          setDatapay([]);
          setDatapaycalc([]);
        }
      }, [DataFilterDashboard]);
  
    useEffect(() => {
      if (!_isEmpty(DataFilterDashboardReceive)) {
        const allData = DataFilterDashboardReceive;
        const reducer = (previousValue, currentValue) => previousValue + currentValue;
        const allARValue = allData.map((item, indice) => {
          return item.valor;
        });
        const dateRValue = allData.map((item, indice) => {
          return indice%10 === 0 ? format(moment(item.dtVencimento).toDate()  as Date, 'dd/MM/yyyy', { locale: pt }) : '';
        });
        const accountsReceive = allARValue.reduce(reducer);
        setDatareceivecalc(accountsReceive.toFixed(2));
        setDate(dateRValue);
        }
        else {
          setDatareceive([]);
          setDatareceivecalc([]);
        }
      }, [DataFilterDashboardReceive]);

      // Grafico Baixa Receber
    useEffect(() => {
      if (!_isEmpty(receiveDown)) {
        const allData = receiveDown;
        const allRDownValue = allData.map((item, indice) => {
          return item.valorTotal.toFixed(2);
        });
          const dateRValue = allData.map((item, indice) => {
            return format(moment(item.dtBaixa).toDate()  as Date, 'dd/MM/yyyy', { locale: pt });
          });
          setDatareceivedown(allRDownValue);
          setDate(dateRValue);
          }
          else {
            setDatareceivedown([]);
            setDate([]);
          }
        }, [receiveDown]);

      const dataPayInt = parseInt(dataPayCalc.toString());
      const dataReceiveInt = parseInt(dataReceiveCalc.toString());

  const options = {
      colors: ["#188121"],
      chart: {
        toolbar: {
          show: false
        }
      },
      stroke: {
        width: 3
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        opacity: 1
      },
      markers: {
        size: 0
      },
        // labels: date,
  };
  
  const series= [
    // {name: 'Recebidos', data: dataReceivedown},
    {name: 'Recebidos', data: [0, 0, 0, 0, 0, 0]},
  ];

  return (
      <BoxPageTotalizersStyled>
        {/* <div className="d-flex col-md-12 px-4 pt-3 justify-content-end">
            <Button
              type="button"
              className="btn btn-sm btn-primary"
              onClick={() => onChangeDateButtons("hoje")}>
              Hoje
            </Button>
            <Button
              type="button"
              className="btn btn-sm btn-primary"
              onClick={() => onChangeDateButtons("7 dias")}>
              7 Dias
            </Button>
            <Button
              type="button"
              className="btn btn-sm btn-primary"
              onClick={() => onChangeDateButtons("15 dias")}>
              15 Dias
            </Button>
            <Button
              type="button"
              className="btn btn-sm btn-primary"
              onClick={() => onChangeDateButtons("30 dias")}>
              30 Dias
            </Button>
          </div> */}
          <BoxTotalizersStyled>
            {/* <div className="col-md-3">
              <BoxTotalizer
              fontCol='#e00000' 
              title="Pagar" 
              amount= {formatMoney(0)}
              imgcard="/img/arrow-down.png" 
              redirect="/gestao/cadastros/contaspagar"
              /> 
            </div>
            <div className="col-md-3">
              <BoxTotalizer
              fontCol='#188121'
              title="Receber" 
              amount={formatMoney(0)}
              imgcard="/img/arrow-up.png" 
              redirect="/gestao/cadastros/contasreceber"
              />
            </div> */}
            <div className="col-md-12">
              <BoxTotalizerBaixas
              realizadoRecebimentoBaixa="0,00"
              realizadoPagamentoBaixa="0,00"
              imgcard="/img/dolar.png" 
              redirect="/portal"
              />
            </div>
      </BoxTotalizersStyled>

      <BoxChartsContentStyled>
        <div className="col-md-6"> 
        {/* <BoxDreStyled>
          <h2>DRE</h2>
          <iframe width="100%" height="410" src="https://app.powerbi.com/reportEmbed?reportId=43ab3eb3-d6e4-4005-a046-26ed21b35ab2&autoAuth=true&ctid=963028bf-5d91-4069-868e-f512e5993a1c&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLWJyYXppbC1zb3V0aC1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D"></iframe>
          </BoxDreStyled>  */}
          <BoxChartsStyled>
            <h2>Prestação de Contas</h2>
            {/* <Chart options={options} series={series} type="bar" height="400rem" />  */}
            <img
                    src="/img/teste.png"
                    alt="VTech Consultoria"
                    width="700px"
                    height="400px"
                    // loading="eager"
                    // className="navbar-brand-img"
            />
          </BoxChartsStyled>
        </div>
        <div className="col-md-6"> 
          <BoxChartsStyled>
            <h2>Despesas</h2>
            {/* <Chart options={options} series={series} type="bar" height="400rem" />  */}
            <img
                    src="/img/teste.png"
                    alt="VTech Consultoria"
                    width="700px"
                    height="400px"
                    // loading="eager"
                    // className="navbar-brand-img"
            />
          </BoxChartsStyled>
        </div>
      </BoxChartsContentStyled>
    </BoxPageTotalizersStyled>
  )
}

export default PortalTemplate
