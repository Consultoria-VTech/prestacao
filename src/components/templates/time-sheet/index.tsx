import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../context/authContext'
import { ICON_LIBRARY } from '../../../types/icon'
import { InitialData } from '../../../types/initialData'
import { TimeSheetPagination } from '../../../types/models/timeSheet'
import { DateRemoveMouth, DaysBetweenDates } from '../../../util/date'
import Button from '../../elements/button'
import {Card} from '../../elements/card'
import Icon from '../../elements/icon'
import { FormGroupInput } from '../../modules/form-group'
import {FormTimeSheet} from '../../modules/forms/time-sheet'

const maxDaysInWeek = 5

const TimeSheetTemplate: React.FC<InitialData<TimeSheetPagination>> = ({
  data,
}) => {
  const [date, setDate] = useState(new Date())
  const [sumItemsHours, setSumItemsHours] = useState<
    { dia: number; qtdHoras: number }[]
  >([])

  const [currentWeek, setCurrentWeek] = useState(
    Math.ceil(
      DaysBetweenDates(date, new Date(date.getFullYear(), date.getMonth(), 1)) /
        maxDaysInWeek
    )
  )
  const [quantityWeeks, setQuantityWeeks] = useState(
    Math.ceil(
      DaysBetweenDates(
        new Date(date.getFullYear(), date.getMonth(), 1),
        new Date(date.getFullYear(), date.getMonth() + 1, 1)
      ) / maxDaysInWeek
    )
  )
  const [daysInWeek, setDaysInWeek] = useState<
    { dia: number; qtdHoras: number }[]
  >([])

  const { user } = useAuth()

  function handleNextWeek() {
    if (currentWeek === quantityWeeks) {
      const nextMouth = new Date(date.getFullYear(), date.getMonth() + 1, 1)

      setDate(nextMouth)
      setCurrentWeek(1)
    } else {
      setCurrentWeek(oldValue => oldValue + 1)
    }
  }

  function handlePrevWeek() {
    if (currentWeek === 1) {
      const newDate = DateRemoveMouth(date, 1)
      setCurrentWeek(Math.ceil(DaysBetweenDates(date, newDate) / maxDaysInWeek))
      setDate(newDate)
    } else {
      setCurrentWeek(oldValue => oldValue - 1)
    }
  }

  useEffect(() => {
    const thisMouth = new Date(date.getFullYear(), date.getMonth(), 1)

    const nextMouth = new Date(date.getFullYear(), date.getMonth() + 1, 1)

    setQuantityWeeks(
      Math.ceil(DaysBetweenDates(thisMouth, nextMouth) / maxDaysInWeek)
    )
  }, [date])

  useEffect(() => {
    const calcToDayWeek = maxDaysInWeek * (currentWeek - 1)

    const newDaysInWeek = []

    if (currentWeek === quantityWeeks) {
      const thisMouth = new Date(date.getFullYear(), date.getMonth(), 1)
      const nextMouth = new Date(date.getFullYear(), date.getMonth() + 1, 1)
      const daysInMonth = DaysBetweenDates(thisMouth, nextMouth)

      const initDay = currentWeek * maxDaysInWeek - (maxDaysInWeek - 1)

      for (let i = initDay; i <= daysInMonth; i++) newDaysInWeek.push(i)
    } else
      for (let i = 1; i <= maxDaysInWeek; i++)
        newDaysInWeek.push({ dia: calcToDayWeek + i, qtdHoras: 0 })

    setDaysInWeek([...newDaysInWeek])
    setSumItemsHours([...newDaysInWeek])
  }, [currentWeek])

  return (
    <>
      <Card>
        <div className="container-fluid p-3">
          <div className="row col-md-12 pb-3 align-items-center ">
            <FormGroupInput
              required
              classNameFormGroup="col-md-3"
              type="text"
              label="Funcionário"
              value={user?.nome || ''}
              readOnly
            />

            <div className="row col-md-6">
              <FormGroupInput
                required
                classNameFormGroup="col-md-6 col-8"
                type="month"
                label="Mês/Ano"
                value={`${date.getFullYear()}-${`0${date.getMonth() + 1}`.slice(
                  -2
                )}`}
                onChange={event => setDate(new Date(`${event.target.value}-1`))}
              />

              <div className="d-flex col-md-6 col-4 align-items-end pb-1">
                <Button
                  type="button"
                  onClick={handlePrevWeek}
                  className="btn btn-sm btn-primary m-0">
                  <Icon
                    icon="ImArrowLeft2"
                    iconLibrary={ICON_LIBRARY.ICOMOON_FREE}
                    className="m-0"
                  />
                </Button>
                <p className="my-0 p-1 mx-2 fw-bold">semana</p>
                <Button
                  type="button"
                  onClick={handleNextWeek}
                  className="btn btn-sm btn-primary m-0">
                  <Icon
                    icon="ImArrowRight2"
                    iconLibrary={ICON_LIBRARY.ICOMOON_FREE}
                    className="m-0"
                  />
                </Button>
              </div>
            </div>
          </div>

          {daysInWeek.length > 0 && (
            <FormTimeSheet
              daysInWeek={daysInWeek}
              setSumItemsHours={setSumItemsHours}
              sumItemsHours={sumItemsHours}
            />
          )}
        </div>
      </Card>
    </>
  )
}

export default TimeSheetTemplate