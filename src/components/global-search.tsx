"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Loader2, Search } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card } from "@/components/ui/card";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  const { data, isLoading } = useQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: async () => {
      if (!debouncedQuery) return null;
      const res = await fetch(`/api/search?q=${encodeURIComponent(debouncedQuery)}`);
      const result = await res.json();
      return result.data;
    },
    enabled: !!debouncedQuery,
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {/* @ts-ignore */}
      <PopoverTrigger asChild>
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search everywhere..."
            className="w-full appearance-none bg-background pl-8 shadow-none"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" align="start">
        <div className="max-h-[300px] overflow-y-auto p-4">
          {!debouncedQuery && <p className="text-sm text-muted-foreground">Type to search...</p>}
          {isLoading && (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            </div>
          )}
          {data && (
            <div className="space-y-4">
              {data.users?.length > 0 && (
                <div>
                  <h4 className="mb-2 text-xs font-semibold text-muted-foreground uppercase">Users</h4>
                  {data.users.map((u: any) => (
                    <div key={u.id} className="text-sm py-1 cursor-pointer hover:underline">{u.name} ({u.email})</div>
                  ))}
                </div>
              )}
              {data.products?.length > 0 && (
                <div>
                  <h4 className="mb-2 text-xs font-semibold text-muted-foreground uppercase">Products</h4>
                  {data.products.map((p: any) => (
                    <div key={p.id} className="text-sm py-1 cursor-pointer hover:underline">{p.name} - ${p.price}</div>
                  ))}
                </div>
              )}
              {data.categories?.length > 0 && (
                <div>
                  <h4 className="mb-2 text-xs font-semibold text-muted-foreground uppercase">Categories</h4>
                  {data.categories.map((c: any) => (
                    <div key={c.id} className="text-sm py-1 cursor-pointer hover:underline">{c.name}</div>
                  ))}
                </div>
              )}
              {data.orders?.length > 0 && (
                <div>
                  <h4 className="mb-2 text-xs font-semibold text-muted-foreground uppercase">Orders</h4>
                  {data.orders.map((o: any) => (
                    <div key={o.id} className="text-sm py-1 cursor-pointer hover:underline">Order #{o.id.substring(0,8)} - {o.status}</div>
                  ))}
                </div>
              )}
              {(!data.users?.length && !data.products?.length && !data.categories?.length && !data.orders?.length) && (
                <p className="text-sm text-muted-foreground">No results found.</p>
              )}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
