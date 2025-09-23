import { AdjustmentTypeEnum } from "./adjustment-type-enum";
import { PropertyTypeEnum } from "./property-type-enum";

export type PropertyType = {
  _id: string;
  imagens: string[];
  nome: string;
  descricao: string;
  tipo: PropertyTypeEnum;
  ativo: boolean;
  aluguel: number;
  iptu: number;
  prazo: string;
  tipoReajuste: AdjustmentTypeEnum;
  horarioVisita: string;
  area: number;
  dormitorios: number;
  banheiros: number;
  vagasGaragem: number;
  others?: string;
  cep: string;
  logradouro: string;
  numero: number | string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  favorito: boolean;
};
