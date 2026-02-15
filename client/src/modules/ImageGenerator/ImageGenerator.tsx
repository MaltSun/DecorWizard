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

  // const handleGenerate = async () => {
  //   if (!prompt.trim()) return;

  //   setLoading(true);
  //   setGeneratedImage(null);

  //   try {
  //     const uniquePrompt = `${prompt} ${Date.now()}`;
      // const imageUrl = await generateImage(uniquePrompt);
// 
  //     const img = await preloadImage(imageUrl);

  //     setGeneratedImage(imageUrl);
  //     setLoading(false);

  //     handleSaveHistory({
  //       imageSrc: imageUrl,
  //       title: `Generated_${new Date().toLocaleString()}`,
  //       prompt: prompt,
  //     });
  //     setGeneratedImage(imageUrl);
  //   } catch (error) {
  //     console.error('Error generating image:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setGeneratedImage(null);

    try {
      const uniquePrompt = `${prompt} ${Date.now()}`;

      const response = await generateImage(uniquePrompt)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (!response.body) {
        throw new Error('No response body');
      }

      const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();

      let accumulatedImageUrl: string | null = null;

      // Читаем поток в цикле
      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          console.log('Stream completed');
          break;
        }

        if (!value) continue;

        // Разбиваем на строки
        const lines = value.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));

              switch (data.status) {
                case 'processing':
                  console.log('Progress:', data.message);
                  // Можно добавить индикатор прогресса, если есть процент
                  break;

                case 'complete':
                  console.log('Image ready:', data.imageUrl);
                  accumulatedImageUrl = data.imageUrl;
                  // Можно сразу выйти, если больше ничего не ждём
                  break;

                case 'error':
                  console.error('Generation error:', data.message);
                  throw new Error(data.message || 'Unknown error');
              }
            } catch (e) {
              console.error('Failed to parse SSE data:', e, line);
            }
          }
        }
      }

      if (accumulatedImageUrl) {
        await preloadImage(accumulatedImageUrl);

        setGeneratedImage(accumulatedImageUrl);

        handleSaveHistory({
          imageSrc: accumulatedImageUrl,
          title: `Generated_${new Date().toLocaleString()}`,
          prompt: prompt,
        });
      } else {
        console.warn('No image URL received in stream');
      }
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Ошибка генерации изображения');
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
          sx={{
            padding: '12px 40px',
            fontSize: '1.2rem',
            fontFamily: '"Katibeh", serif',
            backgroundColor: '#FD8E53',
            '&:hover': {
              backgroundColor: '#FF7B6A',
            },
            '&:disabled': {
              backgroundColor: '#F6D8C8',
            },
          }}
        >
          {loading ? 'Loading..' : 'Generate'}
        </Button>
      ) : (
        <GenerateContent>
          <ImageContainer>
            {loading ? (
              <Box>
                <CircularProgress size={60} sx={{ color: '#FD8E53', mb: 2 }} />
              </Box>
            ) : (
              <img
                src={generatedImage}
                alt="Generated"
                style={{
                  width: '100%',
                  maxWidth: '500px',
                  height: 'auto',
                  borderRadius: '12px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                }}
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
              sx={{
                width: '40%',
                fontFamily: '"Katibeh", serif',
                fontSize: '1.1rem',
                color: '#fdfaf8ff',
                borderColor: '#FD8E53',
                '&:hover': {
                  borderColor: '#FF7B6A',
                  backgroundColor: 'rgba(253, 143, 83, 0.05)',
                },
              }}
            >
              Redo
            </Button>

            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading}
              sx={{
                fontFamily: '"Katibeh", serif',
                fontSize: '1.1rem',
                width: '40%',
                borderColor: '#FD8E53',
                '&:hover': {
                  borderColor: '#FF7B6A',
                  backgroundColor: 'rgba(253, 143, 83, 0.05)',
                },
              }}
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
