import { PropertyTypeEnum } from "./property-type-enum";

export type PropertyType = {
  _id: string;
  imagem: string;
  nome: string;
  descricao: string;
  tipo: PropertyTypeEnum;
  ativo: boolean;
  aluguel: number;
  iptu: number;
  prazo: string;
  tipoReajuste: string;
  horarioVisita: string;
  area: number;
  dormitorios: number;
  banheiros: number;
  vagasGaragem: number;
  others?: string;
};
