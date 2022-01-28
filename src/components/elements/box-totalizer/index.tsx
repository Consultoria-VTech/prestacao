import Link from 'next/link'
import React from 'react'
import { BoxStyled, BoxStyledProps, BoxNumberStyled } from './styles'


type BoxProps = BoxStyledProps & {
  title : string,
  amount ?: string,
  imgcard?: string,
  redirect?: string,
  fontCol?: string,
}

type BoxBaixasProps = BoxStyledProps & {
  imgcard: string,
  redirect: string,
  realizadoRecebimentoBaixa: string,
  realizadoPagamentoBaixa: string,
}

// type BoxQtdProps = BoxStyledProps & {
//   imgcard: string,
//   redirect: string,
//   titlePagar: string,
//   titleReceber: string,
//   quantidadeReceber: number,
//   quantidadePagar: number,
// }

export const BoxTotalizer: React.FC<BoxProps> = ({title, amount, imgcard, redirect, fontCol}) => {
  return (
    <BoxStyled fontColor={fontCol}>
      <h2>{title}</h2>
      <h1>{amount}</h1>
      <a href={redirect}><img src={imgcard}/></a>
    </BoxStyled>  
  )
}

//Totalizador de quantidade de contas a pagar e receber
// export const BoxTotalizerQtd: React.FC<BoxQtdProps> = ({titlePagar, quantidadePagar, titleReceber, quantidadeReceber, imgcard, redirect}) => {
//   return (
//     <BoxStyled>
//       <div className="row">
//         <div className="col-md-3"> 
//           <BoxNumberStyled colorBox='#e00000'>
//           <h2>{titlePagar}</h2>
//           <h1>{quantidadePagar || 0}</h1>
//           </BoxNumberStyled>
//         </div>
//         <div className="col-md-6"> 
//         <BoxNumberStyled colorBox='#188121'>
//           <h2>{titleReceber}</h2>
//           <h1>{quantidadeReceber || 0}</h1>
//           </BoxNumberStyled>
//         </div>
//       </div>
//       <a href={redirect}><img src={imgcard}/></a>
//     </BoxStyled>  
//   )
// }

//Toalizadores Baixas Valor 
export const BoxTotalizerBaixas: React.FC<BoxBaixasProps> = ({imgcard, redirect, realizadoRecebimentoBaixa, realizadoPagamentoBaixa}) => {
  return (
    <BoxStyled>
      <div className="row">
        <div className="col-md-6">
          <div className="row">
          <h4>Despesas do Mês</h4>
            <div className="col-md-4 exempleChart">0%</div>
            <div className="col-md-8 contentPayReceive"> 
              <h5>Realizado: R$ {realizadoRecebimentoBaixa}</h5>
              <h5>Falta: R$ 0,00</h5>
              <h5>Previsto: R$ 0,00</h5>
            </div>
          </div>  
        </div>
        <div className="col-md-6">
          <div className="row">
          <h4>Pagamentos do Mês</h4>
            <div className="col-md-4 exempleChart">0%</div>
            <div className="col-md-8 contentPayReceive"> 
              <h5>Realizado: R$ {realizadoPagamentoBaixa}</h5>
              <h5>Falta: R$ 0,00</h5>
              <h5>Previsto: R$ 0,00</h5>
            </div>
          </div>
        </div> 
        
      </div> 
      <a href={redirect}><img src={imgcard}/></a>
    </BoxStyled>  
  )

}