// calculate duration between two dates in years, month and days
export default function timeManagement(startDate) {
  let recap = {}
  let diff = Date.now() - new Date(startDate).getTime()

  diff = Math.floor(diff / 1000)
  recap.sec = diff % 60
  diff = Math.floor((diff - recap.sec) / 60)
  recap.min = diff % 60
  diff = Math.floor((diff - recap.min) / 60)
  recap.hour = diff % 24
  diff = Math.floor((diff - recap.hour) / 24)
  recap.day = diff
  diff = Math.floor((diff - recap.day) / 30)
  recap.month = diff
  diff = Math.floor((diff - recap.month) / 12)
  recap.year = diff

  const yearString = () => {
    if (recap.year > 0) return recap.year + ' a'
    return ''
  }
  const monthString = () => {
    if (recap.month > 0) return recap.month + ' m'
    return ''
  }

  const dayString = () => {
    if (recap.day > 0) return recap.day + ' j'
    return ''
  }
  const hourString = () => {
    if (recap.hour > 0) return recap.hour + ' h'
    return ''
  }
  const minString = () => {
    return recap.min + ' m'
  }

  return `${yearString()} ${monthString()} ${dayString()} ${hourString()} et ${minString()}`
}
