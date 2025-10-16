import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'TableStatus'
})
export class TableStatusPipe implements PipeTransform {

 private labelMap: Record<string, string[]> = {
    'disponible': ['available', 'free', 'libre'],
    'ocupada': ['occupied', 'in_use', 'busy'],
    'ventas en barra': ['bar', 'counter', 'sales'],
    // agrega más mapeos si usas otras etiquetas
  };

  transform(items: any[] | null | undefined, filter: string | null | undefined): any[] {
    if (!items) return [];
    if (!filter) return items;

    const f = String(filter).trim().toLowerCase();
    if (f === '' || f === '-1' || f === 'todos' || f === 'all') return items;

    // Si el valor del select ya viene como un status interno, permitirlo:
    const candidateInternalStatus = f;

    // Obtener lista de estados permitidos por la etiqueta
    const mapped = this.labelMap[f];

    return items.filter(item => {
      if (!item || item.status == null) return false;
      const status = String(item.status).toLowerCase();

      // si viene un mapping (p.e. 'Disponible' => ['available', ...]) comprobar ahí
      if (mapped && mapped.length) {
        return mapped.includes(status);
      }

      // si no hay mapping, comparar directamente con el valor seleccionado
      return status === candidateInternalStatus;
    });
  }

}
