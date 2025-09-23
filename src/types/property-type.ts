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
  bairro: string;
  cep: string;
  cidade: string;
  complemento: string;
  numero: number | string;
  logradouro: string;
  uf: string;
};
