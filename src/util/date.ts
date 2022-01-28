export const DaysBetweenDates = (dateInit: Date, dateEnd: Date): number => {
    return (
      Math.abs(dateEnd.getTime() - dateInit.getTime()) / (1000 * 60 * 60 * 24)
    )
  }
  
  export const DateAddMouth = (date: Date, month: number): Date => {
    const newDate = new Date(date.toISOString())
    const years = Math.floor(month / 12)
    const months = month - years * 12
    if (years) newDate.setFullYear(newDate.getFullYear() + years)
    if (months) newDate.setMonth(newDate.getMonth() + months)
    return newDate
  }
  export const DateRemoveMouth = (date: Date, month: number): Date => {
    const newDate = new Date(date.toISOString())
    const years = Math.floor(month / 12)
    const months = month - years * 12
    if (years) newDate.setFullYear(newDate.getFullYear() - years)
    if (months) newDate.setMonth(newDate.getMonth() - months)
    return newDate
  }