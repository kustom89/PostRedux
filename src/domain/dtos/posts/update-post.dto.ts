export class UpdatePostDto {
  constructor(
    public readonly id: number, 
    public readonly titulo?: string, 
    public readonly descripcion?: string,
    public readonly fechaCreacion?: Date 
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {};

    if (this.titulo) returnObj.titulo = this.titulo;
    if (this.descripcion) returnObj.descripcion = this.descripcion;
    if (this.fechaCreacion) returnObj.fechaCreacion = this.fechaCreacion;

    return returnObj;
  }

  static create(props: { [key: string]: any }): [string?, UpdatePostDto?] {
    const {id, titulo, descripcion , fechaCreacion} = props;
    let newFechaCreacion = fechaCreacion;

    if (!id||isNaN(id)) return ["Id is required", undefined];

    if(fechaCreacion){
       newFechaCreacion = new Date(fechaCreacion);
      if (fechaCreacion) {
        newFechaCreacion = new Date(fechaCreacion);
        if (newFechaCreacion.toString() === "Invalid Date") {
          return ["CompletedAt must be a valid date"];
        }
      }
  
    }
 

    return [undefined, new UpdatePostDto(titulo, descripcion)];
  }
}
