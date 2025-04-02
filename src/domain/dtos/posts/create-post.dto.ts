export class CreatePostDto {
  constructor(
    public readonly titulo: string, 
    public readonly descripcion: string,
    public readonly fechaCreacion: Date = new Date()
  ) {}

  static create(props: { [key: string]: any }): [string?, CreatePostDto?] {
    const { titulo, descripcion } = props;

    if (!titulo) return ["Title is required", undefined];
    if (!descripcion) return ["Description is required", undefined];

    return [undefined, new CreatePostDto(titulo, descripcion)];
  }
}
