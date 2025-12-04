import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCharacters } from "@/hooks/api/queries";

export function Home() {
  const [page, setPage] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [debouncedName, setDebouncedName] = useState("");

  const { data, isLoading, error } = useGetCharacters(page, debouncedName);

  const handleSearch = () => {
    setDebouncedName(searchName);
    setPage(1); // Reset to first page on new search
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  if (error)
    return <div className="p-8 text-destructive">Error: {error.message}</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Rick and Morty Characters</h1>

      <div className="flex gap-2 mb-6">
        <Input
          type="text"
          placeholder="Search characters..."
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          onKeyDown={handleKeyDown}
          className="max-w-xs"
          disabled={isLoading}
        />
        <Button onClick={handleSearch} disabled={isLoading}>
          Search
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="border rounded-lg p-4">
              <Skeleton className="w-full h-48 rounded-md mb-2" />
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <>
          {data?.results?.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              No characters found
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {data?.results?.map((character: any) => (
                <Link key={character.id} to={`/character/${character.id}`}>
                  <div className="border rounded-lg p-4 hover:bg-accent transition-colors cursor-pointer h-full">
                    <img
                      src={character.image}
                      alt={character.name}
                      className="w-full h-48 object-cover rounded-md mb-2"
                    />
                    <h3 className="font-semibold text-lg">{character.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {character.status} - {character.species}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="flex gap-2 justify-center">
            <Button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              variant="outline"
            >
              Previous
            </Button>
            <span className="flex items-center px-4">Page {page}</span>
            <Button
              onClick={() => setPage((p) => p + 1)}
              disabled={!data?.info?.next}
              variant="outline"
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
