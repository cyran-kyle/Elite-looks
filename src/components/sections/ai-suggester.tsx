'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { getAIStyleSuggestion } from '@/app/actions';
import type { AIStyleSuggestionOutput } from '@/ai/flows/ai-style-suggestion';
import { Loader2, Palette, Scissors, Users } from 'lucide-react';

const AiSuggester = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestion, setSuggestion] = useState<AIStyleSuggestionOutput | null>(null);

  const placeholderImg = getPlaceholderImage('ai-suggestion-placeholder');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit
        setError('Image size exceeds 4MB. Please choose a smaller file.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setError(null);
        setSuggestion(null);
      };
      reader.onerror = () => {
        setError('Failed to read the image file.');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!imagePreview) {
      setError('Please upload an image of your desired look.');
      return;
    }
    setLoading(true);
    setError(null);
    setSuggestion(null);

    const result = await getAIStyleSuggestion({
      desiredLookImage: imagePreview,
      description: description,
    });

    setLoading(false);
    if (result.success && result.data) {
      setSuggestion(result.data);
    } else {
      setError(result.error || 'An unexpected error occurred.');
    }
  };

  return (
    <section id="ai-suggester" className="py-16 sm:py-24 bg-secondary/50">
      <div className="container">
        <div className="text-center">
          <h2 className="font-headline text-4xl font-bold text-primary">AI Style Suggestions</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Not sure what you want? Upload a photo of a look you love and let our AI provide expert recommendations.
          </p>
        </div>
        <Card className="mt-12 max-w-4xl mx-auto">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="look-image">Upload Your Desired Look</Label>
                  <Input id="look-image" type="file" accept="image/*" onChange={handleImageChange} required />
                  <p className="text-sm text-muted-foreground">Max file size: 4MB.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Describe the Look (Optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="e.g., 'I love the soft waves and honey blonde color.'"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </div>
                <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    'Get Suggestions'
                  )}
                </Button>
                {error && <p className="text-sm text-destructive">{error}</p>}
              </form>
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="relative w-full aspect-square rounded-lg border-2 border-dashed overflow-hidden">
                  <Image
                    src={imagePreview || placeholderImg?.imageUrl || '/placeholder.svg'}
                    alt="Desired look preview"
                    fill
                    className="object-cover"
                    data-ai-hint={imagePreview ? "user uploaded" : "abstract art"}
                  />
                </div>
                {suggestion && (
                <Card className="w-full bg-background">
                    <CardHeader>
                      <CardTitle className="font-headline">Our Suggestions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                      <div>
                        <h4 className="font-semibold flex items-center gap-2"><Users className="w-4 h-4 text-primary"/>Recommended Stylists</h4>
                        <p className="text-muted-foreground">{suggestion.recommendedStylists.join(', ')}</p>
                      </div>
                       <div>
                        <h4 className="font-semibold flex items-center gap-2"><Palette className="w-4 h-4 text-primary"/>Suggested Hair Colors</h4>
                        <p className="text-muted-foreground">{suggestion.suggestedHairColors.join(', ')}</p>
                      </div>
                       <div>
                        <h4 className="font-semibold flex items-center gap-2"><Scissors className="w-4 h-4 text-primary"/>Similar Styles</h4>
                        <p className="text-muted-foreground">{suggestion.similarStyles.join(', ')}</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
                 {loading && (
                    <div className="w-full space-y-2 p-4 rounded-lg bg-muted animate-pulse">
                        <div className="h-6 w-3/4 rounded bg-muted-foreground/20"></div>
                        <div className="h-4 w-1/2 rounded bg-muted-foreground/20"></div>
                        <div className="h-4 w-1/2 rounded bg-muted-foreground/20"></div>
                        <div className="h-4 w-1/2 rounded bg-muted-foreground/20"></div>
                    </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AiSuggester;
