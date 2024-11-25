export interface EdgeList<T> {
  edges: { node: T }[];
}

export interface Language {
  name: string;
}

export interface Currency {
  name: string;
}

export interface Country {
  name: string;
  capital: string;
  region: string;
  flag: string;
  languages: EdgeList<Language>;
  currencies: EdgeList<Currency>;
  population: number;
  borders: string[];
  timezones: string[];
  area: number;
  alpha3Code: string;
}

export interface GraphQLCountryDetailsData {
  country: Country;
}
