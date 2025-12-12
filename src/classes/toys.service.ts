import { Http } from "./http.class";
import { API_URL } from "../constants";
import type { Toy, ToyInsert, ToysResponse, SingleToyResponse } from "../interfaces/toy.interfaces";

export class ToysService {
  #http = new Http();

  // src/classes/toys.service.ts
  async getToys(): Promise<Toy[]> {
    // AÑADIMOS "/api" AQUÍ
    const res = await this.#http.get<ToysResponse>(`${API_URL}/api/juguetes`);
    return res.data;
  }

  async postToy(toy: ToyInsert): Promise<Toy> {
    // AÑADIMOS "/api" AQUÍ TAMBIÉN
    const res = await this.#http.post<SingleToyResponse, ToyInsert>(
      `${API_URL}/api/juguetes`,
      toy
    );
    return res.data;
  }

  async deleteToy(id: number): Promise<void> {
    // Y AQUÍ
    await this.#http.delete<void>(`${API_URL}/api/juguetes/${id}`);
  }
}