"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Loader2, BarChart, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { checkPostStyle } from "../actions";
import { Progress } from "@/components/ui/progress";

interface StyleResult {
    adherenceScore: number;
    suggestions: string;
}

export default function BlogStyleChecker() {
    const [postContent, setPostContent] = useState("");
    const [result, setResult] = useState<StyleResult | null>(null);
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    const handleStyleCheck = () => {
        if (!postContent.trim()) {
            toast({
                title: "El contenido está vacío",
                description: "Por favor, escribe el contenido de tu post para analizarlo.",
                variant: "destructive"
            });
            return;
        }
        startTransition(async () => {
            setResult(null);
            const res = await checkPostStyle(postContent);
            if (res.success && res.data) {
                setResult(res.data);
                toast({
                    title: "Análisis completado",
                    description: "Tu post ha sido analizado con éxito."
                });
            } else {
                toast({
                    title: "Error en el análisis",
                    description: res.error,
                    variant: "destructive"
                });
            }
        });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Analizador de Estilo de Blog
                </CardTitle>
                <CardDescription>
                    Escribe el contenido de tu post para la comunidad y nuestra IA verificará si se alinea con el tono y estilo de OCTAVA.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Textarea 
                    placeholder="Pega aquí el contenido de tu post..."
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    rows={10}
                    className="min-h-[200px]"
                />
                <Button onClick={handleStyleCheck} className="w-full sm:w-auto relative overflow-hidden group" disabled={isPending}>
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>
                    {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Bot className="mr-2 h-4 w-4" />}
                    Verificar Estilo
                </Button>
            </CardContent>

            {isPending && (
                <div className="p-6 text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                    <p className="mt-2 text-muted-foreground">Analizando contenido...</p>
                </div>
            )}
            
            {result && (
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border-t">
                        <div>
                             <h3 className="text-lg font-headline mb-2 flex items-center gap-2"><BarChart className="w-5 h-5 text-primary" />Puntuación de Adherencia</h3>
                             <p className="text-4xl font-bold text-primary">{result.adherenceScore}<span className="text-2xl text-muted-foreground">/100</span></p>
                             <Progress value={result.adherenceScore} className="mt-2" />
                             <p className="text-sm text-muted-foreground mt-1">
                                {result.adherenceScore > 80 ? "¡Excelente! El post se alinea perfectamente." : result.adherenceScore > 50 ? "Buen trabajo, pero hay margen de mejora." : "Necesita algunos ajustes para encajar con el estilo."}
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-headline mb-2">Sugerencias de Mejora</h3>
                            <p className="text-sm whitespace-pre-wrap font-mono bg-muted/50 p-4 rounded-md">{result.suggestions}</p>
                        </div>
                    </div>
                </CardContent>
            )}
        </Card>
    );
}
