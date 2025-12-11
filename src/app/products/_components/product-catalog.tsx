"use client";

import { useState, useMemo, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { products as allProducts } from "@/lib/products";
import ProductCard from "./product-card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Loader2, Search, SlidersHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getFilteredProducts } from "../actions";

export default function ProductCatalog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [brand, setBrand] = useState("all");
  const [aiNeeds, setAiNeeds] = useState("");
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  const categories = useMemo(() => ["all", ...new Set(allProducts.map((p) => p.category))], []);
  const brands = useMemo(() => ["all", ...new Set(allProducts.map((p) => p.brand))], []);

  const handleManualFilter = () => {
    let products = allProducts;
    if (searchQuery) {
        products = products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    if (category !== "all") {
        products = products.filter(p => p.category === category);
    }
    if (brand !== "all") {
        products = products.filter(p => p.brand === brand);
    }
    setFilteredProducts(products);
  };

  const handleAiFilter = () => {
    if (!aiNeeds.trim()) {
        toast({
            title: "Describe tus necesidades",
            description: "Por favor, escribe lo que buscas para que nuestro asistente de IA pueda ayudarte.",
            variant: "destructive"
        });
        return;
    }
    startTransition(async () => {
      const result = await getFilteredProducts(aiNeeds);
      if (result.success && result.data) {
        setFilteredProducts(result.data);
        toast({
          title: "¡Búsqueda completada!",
          description: "Estos son los productos que mejor se adaptan a lo que buscas."
        });
      } else {
        toast({
          title: "Error en la búsqueda",
          description: result.error,
          variant: "destructive"
        });
      }
    });
  }

  const resetFilters = () => {
    setSearchQuery("");
    setCategory("all");
    setBrand("all");
    setAiNeeds("");
    setFilteredProducts(allProducts);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <aside className="lg:col-span-1 space-y-8">
        {/* Manual Filters */}
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><SlidersHorizontal className="w-5 h-5" />Filtros</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input 
                        placeholder="Buscar por nombre..." 
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                        <SelectValue placeholder="Categoría" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map(cat => <SelectItem key={cat} value={cat}>{cat === 'all' ? 'Todas las categorías' : cat}</SelectItem>)}
                    </SelectContent>
                </Select>
                <Select value={brand} onValueChange={setBrand}>
                    <SelectTrigger>
                        <SelectValue placeholder="Marca" />
                    </SelectTrigger>
                    <SelectContent>
                        {brands.map(b => <SelectItem key={b} value={b}>{b === 'all' ? 'Todas las marcas' : b}</SelectItem>)}
                    </SelectContent>
                </Select>
                <Button onClick={handleManualFilter} className="w-full relative overflow-hidden group">
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>
                  Aplicar Filtros
                </Button>
            </CardContent>
        </Card>

        {/* AI Assistant */}
        <Card className="bg-primary/10 border-primary/20">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Bot className="w-5 h-5 text-primary" />Asistente IA</CardTitle>
                <CardDescription>¿No sabes qué elegir? Describe lo que necesitas y te ayudaremos.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Textarea 
                    placeholder="Ej: Soy guitarrista de rock clásico con un presupuesto de 1500€. Busco un sonido cálido y vintage."
                    value={aiNeeds}
                    onChange={(e) => setAiNeeds(e.target.value)}
                    rows={4}
                />
                <Button onClick={handleAiFilter} className="w-full relative overflow-hidden group" disabled={isPending}>
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>
                    {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Bot className="mr-2 h-4 w-4" />}
                    Encontrar por mí
                </Button>
            </CardContent>
        </Card>
        
        <Button variant="outline" onClick={resetFilters} className="w-full relative overflow-hidden group">
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>
            Limpiar filtros
        </Button>
      </aside>

      <main className="lg:col-span-3">
        {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-16 rounded-lg bg-secondary">
                <p className="text-2xl font-bold">No se encontraron productos</p>
                <p className="text-muted-foreground mt-2">Intenta ajustar tus filtros o usar nuestro Asistente de IA.</p>
            </div>
        )}
      </main>
    </div>
  );
}
