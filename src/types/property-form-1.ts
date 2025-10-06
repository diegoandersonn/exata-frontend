export type PropertyForm1Props = {
  index: number;
  form: {
    name: string;
    prazo: string;
    mainImage: string;
    propertyType: string;
    bedrooms: string;
    bathrooms: string;
    garages: string;
    rent: string;
    tax: string;
    reajusteType: string;
    horarioVisita: string;
    area: string;
    descricao: string;
    cep: string;
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
  };
  setForm: React.Dispatch<
    React.SetStateAction<{
      name: string;
      prazo: string;
      mainImage: string;
      propertyType: string;
      bedrooms: string;
      bathrooms: string;
      garages: string;
      rent: string;
      tax: string;
      reajusteType: string;
      horarioVisita: string;
      area: string;
      descricao: string;
      cep: string;
      street: string;
      number: string;
      complement: string;
      neighborhood: string;
      city: string;
      state: string;
    }>
  >;
  triedNext: boolean;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
};
