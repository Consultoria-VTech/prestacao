import { ToastContainer } from 'react-toastify'
import styled from 'styled-components'

export const ToastContainerStyled = styled(ToastContainer).attrs({
  // custom props
})`
  .Toastify__toast-container {
  }

  .Toastify__toast {
    .Toastify__toast-body {
      font-family: Inter, sans-serif;
      font-size: 0.8125rem;
      font-weight: 200;
      line-height: 1rem;

      .alert-title {
        margin-bottom: 0.25rem;
        color: #fff;
        opacity: 0.9;
        font-weight: 400;
      }

      .alert-body {
        opacity: 0.7;
      }

      div .alert-body:first-child {
        font-size: 0.875rem;
      }
    }
  }
  .Toastify__toast--default {
    .Toastify__progress-bar--default {
      background: ${props => props.theme.colors.primary};
    }
    .Toastify__close-button--default {
      color: ${props => props.theme.colors.purple700};
    }
    .Toastify__toast-body {
      color: ${props => props.theme.colors.purple500};
      .alert-title {
        color: ${props => props.theme.colors.primary};
      }
    }

    .alert-body {
      opacity: 1 !important;
    }
  }

  .Toastify__toast--info {
    background: #1489d8;
    .Toastify__progress-bar--info {
      opacity: 0.5;
    }
  }
  .Toastify__toast--error {
  }
  .Toastify__toast--warning {
    background: #f1ab0f;
  }
  .Toastify__toast--success {
    background: #228c25;
  }

  .Toastify__progress-bar {
  }
`
