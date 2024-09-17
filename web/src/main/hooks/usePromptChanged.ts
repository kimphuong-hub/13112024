import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { unstable_usePrompt } from 'react-router-dom';

const usePromptNotSaved = (condition: boolean) => {
  const { t } = useTranslation();

  const beforeUnload = (event: BeforeUnloadEvent) => {
    event.preventDefault();
    event.returnValue = '';
  };

  useEffect(() => {
    window.removeEventListener('beforeunload', beforeUnload);
    if (condition) {
      window.addEventListener('beforeunload', beforeUnload);
    }
    return () => {
      window.removeEventListener('beforeunload', beforeUnload);
    };
  }, [condition]);

  unstable_usePrompt({
    message: t('app.system.changed.not-saved'),
    when: ({ currentLocation, nextLocation }) => condition && currentLocation.pathname !== nextLocation.pathname
  });
};

export default usePromptNotSaved;
