import { useQuery } from "@tanstack/react-query";
import { getCharacterById } from "@/services/characters";

export const useGetCharacter = (id: number) => {
  return useQuery({
    queryKey: ["character", id],
    queryFn: () => getCharacterById(id),
    enabled: !!id,
  });
};
