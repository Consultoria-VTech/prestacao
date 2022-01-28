import styled from 'styled-components'

export const Header = styled.div`
  display: flex;
  padding: 0 0.9rem;

  button:first-child {
    width: 1.75rem;
    text-align: center;
  }
  button {
    border: none;
    background: none;
    height: 1.75rem;
    color: ${props => props.theme.colors.primary};
    border-radius: 0.25rem;
    transition: all 0.15s ease;

    &:focus-visible,
    &:active,
    &:hover {
      border: none;
      outline: none;
      background: ${props => props.theme.colors.selecion};
    }
  }
  button.title-date {
    flex: 1;
    text-transform: capitalize;
    font-weight: 600;
    font-size: 0.875rem;
  }

  button:last-child {
    width: 1.75rem;
    margin-right: 0.35rem;
    text-align: center;
  }
`
export const Container = styled.div`
  .react-datepicker__navigation {
    top: 20px;
    transition: all 0.15s ease;

    &::focus-visible {
      outline: none;
    }
    &:hover {
      span {
        &:before {
          border-color: ${props => props.theme.colors.purple900};
        }
      }
    }

    span {
      &:before {
        transition: all 0.15s ease;
        border-color: ${props => props.theme.colors.purple500};
      }
    }
  }
  .react-datepicker__navigation--next {
    right: 16px;
  }
  .react-datepicker__navigation--previous {
    left: 12px;
  }
  .react-datepicker {
    padding: 0.5rem 0;
    border: none;
    border-radius: 0.5rem;
    box-shadow: 0 50px 100px #ae89cc1f, 0 15px 35px rgb(127 76 189 / 15%),
      0 5px 15px rgb(39 12 80 / 10%);
    font-family: Inter, sans-serif;

    color: ${props => props.theme.colors.purple500};
  }
  .react-datepicker__month-container {
    padding: 0.5rem;
    /* width: 240px;
    max-width: 240px; */
    .react-datepicker__day-name {
      color: ${props => props.theme.colors.purple900};
      width: 2rem;
      height: 2rem;
    }
  }
  .react-datepicker__header {
    background: white;
    border: none;
    border-radius: 0.5rem;

    .react-datepicker__current-month {
      color: ${props => props.theme.colors.purple900};
    }
  }

  .react-datepicker__month {
    .react-datepicker__week .react-datepicker__day {
      color: ${props => props.theme.colors.purple400};
      border-radius: 50%;
      transition: all 0.15s ease;
      width: 2rem;
      height: 2rem;
      line-height: 2rem;
      font-size: 0.8125rem;

      &.react-datepicker__day--keyboard-selected,
      &.react-datepicker__day--selected {
        background: ${props => props.theme.colors.primary};
        color: white;
      }

      &:not(.react-datepicker__day--selected, .react-datepicker__day--keyboard-selected).react-datepicker__day--highlighted-custom-day {
        color: ${props => props.theme.colors.purple900};
      }

      &:focus-visible,
      &:hover {
        outline: none;
        background: ${props => props.theme.colors.selecion};
        color: ${props => props.theme.colors.purple900};
      }
    }
  }

  .react-datepicker__today-button {
    background: white;
    border: none;
    border-radius: 0.5rem;
    padding-bottom: 0.5rem;
    color: ${props => props.theme.colors.purple900};
    transition: all 0.15s ease;
    font-weight: bold;
    &:hover {
      color: ${props => props.theme.colors.purple700};
    }
  }

  .react-datepicker__close-icon {
    &:hover {
      &::after {
        color: ${props => props.theme.colors.purple900};
      }
    }
    &::after {
      transition: all 0.15s ease;
      color: ${props => props.theme.colors.purple400};
      background: transparent;
      font-size: inherit;
    }
  }

  .react-datepicker__month {
    padding: 0 1rem;
  }
  .react-datepicker__month-text {
    height: 2.5rem;
    width: 2.5rem;
    line-height: 2.5rem;
    text-align: center;
    text-transform: capitalize;

    &:hover {
      background: ${props => props.theme.colors.selecion};
    }

    &.react-datepicker__month-text--keyboard-selected {
      background: ${props => props.theme.colors.primary};
      color: white;
    }
  }

  .react-datepicker__year-wrapper {
    max-width: 208px;
    padding: 0 1rem;

    .react-datepicker__year-text {
      height: 2.5rem;
      width: 2.5rem;
      line-height: 2.5rem;

      &:hover {
        background: ${props => props.theme.colors.selecion};
      }

      &.react-datepicker__year-text--keyboard-selected,
      &.react-datepicker__year-text--selected {
        background: ${props => props.theme.colors.primary};
        color: white;
      }
    }
  }

  .react-datepicker-wrapper {
    width: 100%;
  }
`
