import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthScreen = () => {
  const navigation = useNavigate();

  useEffect(() => {
    navigation('/auth/login');
  }, [navigation]);

  return null;
};

export default AuthScreen;
