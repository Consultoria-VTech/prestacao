import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import {BoxChartsStyled} from '../box-charts/styles';
import { BoxChartsContentStyled, BoxChartsContentStyledProps } from './styles'
import _isEmpty from 'lodash/isEmpty';
import { useFetch } from '~/hooks/useFetch';
const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

type BoxChartsContentProps = BoxChartsContentStyledProps & {}

export const BoxChartsContent: React.FC<BoxChartsContentProps> = () => {
  const {
    data: dataFetchP,
  } = useFetch(
    `/api/contaspagar`,
    {
      revalidateOnReconnect: true,
    }
  )

  const {
    data: dataFetchR,
  } = useFetch(
    `/api/contasreceber`,
    {
      revalidateOnReconnect: true,
    }
  )

  const [dataP, setDatap] = useState([]);
  const [dataR, setDatar] = useState([]);

  useEffect(() => {
    if (!_isEmpty(dataFetchP)) {
      const allData = dataFetchP?.data;
      const allCPValue = allData.map((item, indice) => {
        return item.valor
      });
      setDatap(allCPValue);
      }
    }, [dataFetchP]);

  useEffect(() => {
      if (!_isEmpty(dataFetchR)) {
        const allData = dataFetchR?.data;
        const allCRValue = allData.map((item, indice) => {
          return item.valor;
        });
        setDatar(allCRValue);
        }
      }, [dataFetchR]);

  console.log(dataP);
  console.log(dataR);

  const options = {
      colors: ["#188121", "#e00000"],
      tooltip:{
        followCursor: true,
      },
      dataLabels:{
        enabled: false,
      }

  };

  const series= [
    {name: 'A Receber', data: dataP},
    {name: 'A Pagar', data: dataR}
  ];

  return (
    <BoxChartsContentStyled>
      <div className="col-md-12"> 
      <BoxChartsStyled>
        <Chart options={options} series={series} type="area" height="420rem" /> 
      </BoxChartsStyled>
      </div>
    </BoxChartsContentStyled>
  )
}