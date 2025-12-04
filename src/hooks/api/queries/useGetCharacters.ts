import { useQuery } from "@tanstack/react-query";
import { getCharacters } from "@/services/characters";

export const useGetCharacters = (page: number = 1, name: string = "") => {
  return useQuery({
    queryKey: ["characters", page, name],
    queryFn: () => getCharacters(page, name),
  });
};
