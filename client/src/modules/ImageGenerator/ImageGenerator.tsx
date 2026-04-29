import { useState, useEffect } from 'react';
import { generateImage } from '../../generationLogic/imageGenerate';
import { Button, CircularProgress, Box } from '@mui/material';
import { GenerateContainer, GenerateContent, ImageContainer, ButtonsContainer } from './style';
import { HistoryCardProps } from '../../components/HistoryCard/type';
import { response } from 'express';
import { Bounce, toast } from 'react-toastify';
import { useNavigate, useNavigation } from 'react-router-dom';
import { AppRoutes } from '../../router/router';
import { useTranslation } from 'react-i18next';

type Status =
  | { type: 'idle' }
  | { type: 'generating'; message: string }
  | { type: 'done'; url: string }
  | { type: 'error'; message: string };

const ImageGenerator = ({ initialPrompt = '' }) => {
  const { t } = useTranslation('common');
  const [prompt, setPrompt] = useState(initialPrompt);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const model = 'flux';
  const [status, setStatus] = useState<Status>({ type: 'idle' });
  const [abortCtrl, setAbortCtrl] = useState<AbortController | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    setPrompt(initialPrompt);
  }, [initialPrompt]);

  const MAX_HISTORY_ITEMS = 10;

  const handleSaveHistory = (newEntry: HistoryCardProps) => {
    try {
      const raw = sessionStorage.getItem('history');
      const oldHistory = raw ? JSON.parse(raw) : [];

      const newHistory = [newEntry, ...oldHistory].slice(0, MAX_HISTORY_ITEMS);

      sessionStorage.setItem('history', JSON.stringify(newHistory));
    } catch (error) {
      console.error('Не удалось сохранить в sessionStorage:', error);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setGeneratedImage(null);

    const controller = new AbortController();
    setAbortCtrl(controller);

    setStatus({ type: 'generating', message: 'Искусственный интеллект рисует...' });

    try {
      const res = await fetch('http://localhost:5000/api/generate/image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, model }),
        signal: controller.signal,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Ошибка сервера');

      setStatus({ type: 'done', url: data.imageUrl });
      setGeneratedImage(data.imageUrl);

      handleSaveHistory({
        imageSrc: data.imageUrl,
        title: `Cake_${Date.now()}`,
        prompt: prompt,
      });
    } catch (err: any) {
      console.error(err);

      if (err.name === 'AbortError') {
        setStatus({ type: 'idle' });
      } else {
        setStatus({ type: 'error', message: err.message });

        toast.error(err.message || 'Ошибка генерации', {
          position: 'top-center',
          autoClose: 5000,
          theme: 'dark',
          transition: Bounce,
        });
      }
    } finally {
      setAbortCtrl(null);
      setLoading(false);
    }
  };

  useEffect(() => () => abortCtrl?.abort(), [abortCtrl]);

  const handleSubmit = () => {
    navigate(AppRoutes.History);

    toast.success('Изображение сохранено!', {
      position: 'top-center',
      autoClose: 5000,
      theme: 'dark',
      transition: Bounce,
    });
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
              {t('redo')}
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
              {t('submit')}
            </Button>
          </ButtonsContainer>
        </GenerateContent>
      )}
    </GenerateContainer>
  );
};
export default ImageGenerator;
