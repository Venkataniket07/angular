/**
 * Represents geographical coordinates
 */
export interface Geo {
  lat: string;
  lng: string;
}

/**
 * Represents a physical address
 */
export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

/**
 * Represents company information associated with a user
 */
export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

/**
 * User Model
 * Defines the shape of the User object as returned by the API.
 * Using TypeScript interfaces ensures type safety throughout the app.
 */
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}
