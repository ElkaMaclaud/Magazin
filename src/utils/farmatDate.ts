function getRussianMonth(month: string) {
  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  return months[parseInt(month) - 1];
}
export const getFormatDate = (date?: Date) => {
  if (date) {
    const dateString = date.toString()
    const dateParts = dateString.split("-");

    const getDay = dateParts[2]
    const day = getDay.startsWith("0") ? dateParts[2].substring(1) :getDay;
    const month = getRussianMonth(dateParts[1]);
    const year = dateParts[0];

    const russianDate = `${day} ${month} ${year} г.`;

    return russianDate;
  }
};
