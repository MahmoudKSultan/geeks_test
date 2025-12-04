import { env } from "@/data/env";
import { API_ENDPOINTS } from "@/data/endpoints";

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface CharactersResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

export const getCharacters = async (
  page: number = 1,
  name: string = ""
): Promise<CharactersResponse> => {
  const url = `${env.BASE_URL}${API_ENDPOINTS.CHARACTER.list}?page=${page}&name=${name}`;

  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 404) {
      return {
        info: { count: 0, pages: 0, next: null, prev: null },
        results: [],
      };
    }
    throw new Error(`Failed to fetch characters: ${response.statusText}`);
  }

  return response.json();
};

export const getCharacterById = async (id: number): Promise<Character> => {
  const url = `${env.BASE_URL}${API_ENDPOINTS.CHARACTER.list}/${id}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch character: ${response.statusText}`);
  }

  return response.json();
};
