/**
 * Coordinates definition
 */
export interface Coordinates {
  lat: number;
  lng: number;
}

/**
 * Address definition
 */
export interface Address {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: Coordinates;
  country: string;
}

/**
 * Hair information
 */
export interface Hair {
  color: string;
  type: string;
}

/**
 * Bank information
 */
export interface Bank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

/**
 * Company definition
 */
export interface Company {
  department: string;
  name: string;
  title: string;
  address: Address;
}

/**
 * Crypto information
 */
export interface Crypto {
  coin: string;
  wallet: string;
  network: string;
}

/**
 * User Model
 * Defines the shape of the User object based on the data provided.
 */
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: Hair;
  ip: string;
  address: Address;
  macAddress: string;
  university: string;
  bank: Bank;
  company: Company;
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: Crypto;
  role: string;
}

/**
 * API Response for Users
 */
export interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}
