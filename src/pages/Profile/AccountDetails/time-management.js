// calculate duration between two dates in years, month and days
export default function signUpTime(startDate) {
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
    if (recap.year > 1) return recap.year + ' ans'
    if (recap.year === 1) return recap.year + ' an'
    return ''
  }
  const monthString = () => {
    if (recap.month > 0) return recap.month + ' mois'
    return ''
  }

  const dayString = () => {
    if (recap.day > 1) return recap.day + ' jours'
    if (recap.day === 1) return recap.day + ' jour'
    return ''
  }
  const hourString = () => {
    if (recap.hour > 1) return recap.hour + ' heures'
    if (recap.hour === 1) return recap.hour + ' heure'
    return ''
  }
  const minString = () => {
    if (recap.min > 1) return recap.min + ' minutes'
    if (recap.min === 1) return recap.min + ' minute'
    return ''
  }
  const secString = () => {
    if (recap.sec > 1) return recap.sec + ' secondes'
    if (recap.sec === 1) return recap.sec + ' seconde'
    return ''
  }

  return `${yearString()} ${monthString()} ${dayString()} ${hourString()} ${minString()} et ${secString()}`
}
