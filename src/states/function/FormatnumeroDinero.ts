
export function formatearNumero(numero: number): string {
    return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }