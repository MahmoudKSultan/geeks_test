import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCharacter } from "@/hooks/api/queries";
import { ArrowLeft } from "lucide-react";

export function CharacterDetails() {
  const { id } = useParams<{ id: string }>();
  const characterId = Number(id);

  const { data: character, isLoading, error } = useGetCharacter(characterId);

  if (isLoading) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <div className="mb-6">
          <Skeleton className="h-10 w-24" />
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <Skeleton className="w-full h-[400px] rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <div className="space-y-2 pt-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <div className="text-destructive mb-4">Error: {error.message}</div>
        <Link to="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
    );
  }

  if (!character) return null;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Link to="/" className="inline-block mb-6">
        <Button variant="ghost" className="gap-2">
          <ArrowLeft size={16} />
          Back to List
        </Button>
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img
            src={character.image}
            alt={character.name}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-2">{character.name}</h1>
          <div className="flex items-center gap-2 text-lg text-muted-foreground mb-6">
            <span
              className={`w-3 h-3 rounded-full ${
                character.status === "Alive"
                  ? "bg-green-500"
                  : character.status === "Dead"
                  ? "bg-red-500"
                  : "bg-gray-500"
              }`}
            />
            {character.status} - {character.species}
          </div>

          <div className="space-y-4 border rounded-lg p-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Gender
              </h3>
              <p className="text-lg">{character.gender}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Origin
              </h3>
              <p className="text-lg">{character.origin.name}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Location
              </h3>
              <p className="text-lg">{character.location.name}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Created
              </h3>
              <p className="text-lg">
                {new Date(character.created).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">
              Episodes ({character.episode.length})
            </h2>
            <div className="grid grid-cols-3 gap-2 max-h-60 overflow-y-auto pr-2">
              {character.episode.map((ep) => {
                const episodeId = ep.split("/").pop();
                return (
                  <div
                    key={ep}
                    className="bg-secondary p-2 rounded text-center text-sm"
                  >
                    Episode {episodeId}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
