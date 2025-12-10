import { Http } from "./http.class";
import { API_URL } from "../constants";
import type { Toy, ToyInsert, ToysResponse, SingleToyResponse } from "../interfaces/toy.interfaces";

export class ToysService {
  #http = new Http();

  async getToys(): Promise<Toy[]> {
    // Llamamos a /juguetes
    const res = await this.#http.get<ToysResponse>(`${API_URL}/juguetes`);
    return res.data; 
  }

  async insertToy(toy: ToyInsert): Promise<Toy> {
    const res = await this.#http.post<SingleToyResponse, ToyInsert>(
      `${API_URL}/juguetes`,
      toy
    );
    return res.data;
  }

  async deleteToy(id: number): Promise<void> {
    await this.#http.delete<void>(`${API_URL}/juguetes/${id}`);
  }
}