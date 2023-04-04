// Formats a date object into a dd/mm/yyyy string
function useFormatDate(date: Date) {
  const day = `${date}`.substring(8, 10);
  const month = `${date}`.substring(5, 7);
  const year = `${date}`.substring(0, 4);

  return `${day}/${month}/${year}`;
}

export default useFormatDate;
