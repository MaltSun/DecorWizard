import { useState, useEffect } from 'react';
import { generateImage } from '../../generationLogic/imageGenerate';
import { Button, CircularProgress, Box } from '@mui/material';
import { GenerateContainer, GenerateContent, ImageContainer, ButtonsContainer } from './style';
import { HistoryCardProps } from '../../components/HistoryCard/type';
import { response } from 'express';

const ImageGenerator = ({ initialPrompt = '' }) => {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPrompt(initialPrompt);
  }, [initialPrompt]);

  const handleSaveHistory = (newEntry: HistoryCardProps) => {
    const history = sessionStorage.getItem('history');
    sessionStorage.setItem(
      'history',
      JSON.stringify([...(history ? JSON.parse(history) : []), newEntry])
    );
  };

  const preloadImage = (url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(img);
      img.onerror = reject;
    });
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setGeneratedImage(null);

    try {
      const imageUrl = await generateImage(prompt);

      // Прямо устанавливаем URL в src картинки
      setGeneratedImage(imageUrl);

      handleSaveHistory({
        imageSrc: imageUrl,
        title: `Cake_${Date.now()}`,
        prompt: prompt,
      });
    } catch (error) {
      console.error(error);
      alert('Ошибка генерации');
    } finally {
      setLoading(false);
    }
  };


  
  const handleSubmit = () => {
    console.log('Submitting image:', generatedImage);
    alert('Изображение сохранено!');
  };

  return (
    <GenerateContainer>
      {!generatedImage ? (
        <Button
          variant="contained"
          onClick={handleGenerate}
          disabled={loading || !prompt.trim()}
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
          sx={theme => ({
            padding: '12px 40px',
            fontSize: '1.2rem',
            fontFamily: '"Katibeh", serif',
            backgroundColor: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: theme.palette.text.secondary,
            },
            '&:disabled': {
              backgroundColor: theme.palette.background.paper,
            },
          })}
        >
          {loading ? 'Loading..' : 'Generate'}
        </Button>
      ) : (
        <GenerateContent>
          <ImageContainer>
            {loading ? (
              <Box>
                <CircularProgress
                  size={60}
                  sx={theme => ({ color: theme.palette.primary.main, mb: 2 })}
                />
              </Box>
            ) : (
              <Box
                component="img"
                src={generatedImage}
                alt="Generated"
                sx={theme => ({
                  width: '100%',
                  maxWidth: '500px',
                  height: 'auto',
                  borderRadius: '12px',
                  boxShadow: theme.shadows[2],
                })}
              />
            )}
          </ImageContainer>

          <ButtonsContainer>
            <Button
              variant="outlined"
              onClick={() => {
                setGeneratedImage(null);
                setTimeout(() => handleGenerate(), 100);
              }}
              disabled={loading}
              sx={theme => ({
                width: '40%',
                fontFamily: '"Katibeh", serif',
                fontSize: '1.1rem',
                color: theme.palette.text.primary,
                borderColor: theme.palette.primary.main,
                '&:hover': {
                  borderColor: theme.palette.text.secondary,
                  backgroundColor: theme.palette.action.hover,
                },
              })}
            >
              Redo
            </Button>

            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading}
              sx={theme => ({
                fontFamily: '"Katibeh", serif',
                fontSize: '1.1rem',
                width: '40%',
                borderColor: theme.palette.primary.main,
                '&:hover': {
                  borderColor: theme.palette.text.secondary,
                  backgroundColor: theme.palette.action.hover,
                },
              })}
            >
              Submit
            </Button>
          </ButtonsContainer>
        </GenerateContent>
      )}
    </GenerateContainer>
  );
};
export default ImageGenerator;
