export interface UserData {
  id: string;
  name: string;
  lastName: string;
  conversations: any[]; // Podés tipar mejor luego
  isPaidCliente: boolean;
  files: any[]; // Lista de archivos, puede ser array de objetos con metadata
}
