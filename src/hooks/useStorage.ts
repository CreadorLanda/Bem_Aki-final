import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useStorage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [progress, setProgress] = useState<number>(0);

  // Função para fazer upload de uma imagem para um bucket específico
  const uploadImage = async (
    bucket: string,
    filePath: string,
    file: File,
    onProgress?: (progress: number) => void
  ) => {
    try {
      setLoading(true);
      setError(null);
      setProgress(0);

      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
          onUploadProgress: (event) => {
            const progress = event.loaded / event.total;
            setProgress(progress);
            if (onProgress) onProgress(progress);
          },
        });

      if (error) throw error;

      // Obter a URL pública do arquivo
      const { data: publicURL } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      return { data: { path: data.path, publicURL: publicURL.publicUrl }, error: null };
    } catch (err) {
      setError(err);
      return { data: null, error: err };
    } finally {
      setLoading(false);
    }
  };

  // Função para fazer upload de múltiplas imagens para um bucket específico
  const uploadMultipleImages = async (
    bucket: string,
    files: File[],
    pathPrefix: string,
    onProgress?: (progress: number) => void
  ) => {
    try {
      setLoading(true);
      setError(null);
      setProgress(0);

      const results = [];
      let totalProgress = 0;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const filePath = `${pathPrefix}/${Date.now()}_${file.name.replace(/\s/g, '_')}`;
        
        const { data, error } = await supabase.storage
          .from(bucket)
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: true,
            onUploadProgress: (event) => {
              const fileProgress = event.loaded / event.total;
              const currentProgress = (i + fileProgress) / files.length;
              setProgress(currentProgress);
              if (onProgress) onProgress(currentProgress);
            },
          });

        if (error) throw error;

        // Obter a URL pública do arquivo
        const { data: publicURL } = supabase.storage
          .from(bucket)
          .getPublicUrl(filePath);

        results.push({
          path: data.path,
          publicURL: publicURL.publicUrl
        });

        totalProgress = (i + 1) / files.length;
        setProgress(totalProgress);
        if (onProgress) onProgress(totalProgress);
      }

      return { data: results, error: null };
    } catch (err) {
      setError(err);
      return { data: null, error: err };
    } finally {
      setLoading(false);
    }
  };

  // Função para excluir um arquivo de um bucket
  const deleteFile = async (bucket: string, filePath: string) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase.storage
        .from(bucket)
        .remove([filePath]);

      if (error) throw error;
      return { data, error: null };
    } catch (err) {
      setError(err);
      return { data: null, error: err };
    } finally {
      setLoading(false);
    }
  };

  // Função para listar arquivos em um bucket/pasta
  const listFiles = async (bucket: string, folderPath?: string) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase.storage
        .from(bucket)
        .list(folderPath || '');

      if (error) throw error;
      return { data, error: null };
    } catch (err) {
      setError(err);
      return { data: null, error: err };
    } finally {
      setLoading(false);
    }
  };

  // Função para obter a URL pública de um arquivo
  const getPublicUrl = (bucket: string, filePath: string) => {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);
    
    return data.publicUrl;
  };

  // Função getImageUrl que é chamada em PacotesPage.tsx
  const getImageUrl = async (bucket: string, filePath: string) => {
    try {
      const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);
      
      return data.publicUrl;
    } catch (err) {
      console.error("Erro ao obter URL da imagem:", err);
      return null;
    }
  };

  return {
    loading,
    error,
    progress,
    uploadImage,
    uploadMultipleImages,
    deleteFile,
    listFiles,
    getPublicUrl,
    getImageUrl
  };
} 