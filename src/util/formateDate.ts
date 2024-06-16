export function formateDate(date?: string, separator?: boolean): string {
  const type: boolean = separator == true || separator == undefined ? true : false
  const dateObj = date ? new Date(date) : new Date()
  const dia = date
    ? String(dateObj.getDate() + 1).padStart(2, "0")
    : String(dateObj.getDate()).padStart(2, "0")
  const mes = String(dateObj.getMonth() + 1).padStart(2, "0")
  const ano = String(dateObj.getFullYear()).padStart(4, "0")

  if (type) {
    return `${dia}/${mes}/${ano}`
  }
  return dia + mes + ano
}
