import { format } from 'date-fns'
import pt from 'date-fns/locale/pt-BR' // the locale you want
import React, { ReactElement, useCallback, useState } from 'react'
import DatePicker, {
  ReactDatePickerProps,
  registerLocale,
} from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs'
import { Container, Header } from './styled'

type DatePickerCustomProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'value'
> &
  Omit<ReactDatePickerProps, 'value'> & {
    messageError?: string | Date | any
    isInvalid?: boolean
    label?: string
    value?: Date | string | null
    onChange?: (
      date: Date | [Date, Date] | null,
      event: React.SyntheticEvent<any> | undefined
    ) => void
  }

interface HighlightDates {
  [className: string]: Date[]
}

type CalendarType = 'day' | 'month' | 'year'

/**
 * @param {int} The month number, 0 based
 * @param {int} The year, not zero based, required to account for leap years
 * @return {Date[]} List with date objects for each day of the month
 */
function getDaysInMonth(month, year) {
  const date = new Date(year, month, 1)
  const days = []
  while (date.getMonth() === month) {
    days.push(new Date(date))
    date.setDate(date.getDate() + 1)
  }
  return days
}

const DatePickerCustomDespesa = ({
  className,
  label,
  isInvalid,
  messageError,
  name,
  value,
  readOnly,
  onChange,
  isClearable = true,
  onBlur,
  popperPlacement,
}: DatePickerCustomProps): ReactElement => {
  registerLocale('pt-BR', pt) // register it with the name you want
  // const startDate: Date = value || new Date()

  const [startDate, setStartDate] = useState<Date>(
    value ? new Date(value) : null
    )

  React.useEffect(() => {
    if (value) setStartDate(new Date(value))
  }, [value])

  const [calendarType, setCalendarType] = useState<CalendarType>('day')
  const [daysMonthCurrent, setDaysMonthCurrent] = 
  useState<Array<HighlightDates | Date>>()

  const addHighlightedDay = useCallback((date = new Date()) => {
    setDaysMonthCurrent([
      {
        'react-datepicker__day--highlighted-custom-day': getDaysInMonth(
          date?.getMonth() || new Date().getMonth(),
          date?.getFullYear() || new Date().getFullYear()
        ),
      },
    ])
  }, [])

  const handleCalendarClose = useCallback(() => setCalendarType('day'), [])
  const handleCalendarOpen = useCallback(() => addHighlightedDay(startDate), [])
  const handleOnChange = useCallback((date, event) => {
    addHighlightedDay(date)
    setStartDate(date)

    if (onChange) onChange(date, event)
  }, [])

  const renderCustomHeader = ({
    date,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,

    decreaseYear,
    increaseYear,
    prevYearButtonDisabled,
    nextYearButtonDisabled,
  }) => (
    <Header
      style={{
        margin: 10,
        display: 'flex',
        justifyContent: 'center',
      }}>
      <button
        onClick={calendarType === 'day' ? decreaseMonth : decreaseYear}
        disabled={prevMonthButtonDisabled}
        type="button">
        <BsChevronDoubleLeft size=".8125rem" />
      </button>

      <button
        type="button"
        className="title-date"
        onClick={() => {
          setCalendarType(p => (p === 'day' ? 'month' : 'year'))
        }}>
        {calendarType === 'day'
          ? format(date, 'MMM, yyyy', { locale: pt })
          : format(date, 'YYY', { locale: pt })}
      </button>

      <button
        onClick={calendarType === 'day' ? increaseMonth : increaseYear}
        disabled={nextMonthButtonDisabled}
        type="button">
        <BsChevronDoubleRight size=".8125rem" />
      </button>
    </Header>
  )

  const isError = isInvalid
  return (
    <Container
      className={`form-group py-1 ${className} ${isError ? 'has-danger' : ''}`}>
      {label && (
        <label htmlFor={name} className="form-control-label">
          {label}
        </label>
      )}
      <div
        className={
          isError
            ? `position-relative alert-validate ${
                isClearable && value ? 'datepicker-isClearable' : ''
              }`
            : ''
        }
        style={{ flex: 1 }}
        data-validate={messageError}>
        <DatePicker
          name={name}
          id={name}
          readOnly={readOnly}
          onBlur={onBlur}
          renderCustomHeader={renderCustomHeader}
          className={`form-control ${isError ? 'pe-2-25 is-invalid' : ''}`}
          selected={startDate}
          onChange={handleOnChange}
          popperPlacement={popperPlacement}
          onChangeRaw={() =>
            setCalendarType(p => (p === 'year' ? 'month' : 'day'))
          }
          // customInput={<Input type="text" mask="number" />}
          onCalendarClose={handleCalendarClose}
          onCalendarOpen={handleCalendarOpen}
          isClearable={isClearable && !readOnly}
          onMonthChange={date => addHighlightedDay(date)}
          onYearChange={date => addHighlightedDay(date)}
          shouldCloseOnSelect={calendarType === 'day'}
          showMonthYearPicker={calendarType === 'month'}
          showYearPicker={calendarType === 'year'}
          showFourColumnMonthYearPicker
          highlightDates={daysMonthCurrent}
          todayButton="Hoje"
          dateFormat="dd/MM/yyyy"
          locale="pt-BR"
          focusSelectedMonth={false}
          placeholderText="dd/MM/yyyy"
          withPortal={false}
          preventOpenOnFocus={true}
          // onClickOutside={}
        />
      </div>
    </Container>
  )
}

export default DatePickerCustomDespesa
