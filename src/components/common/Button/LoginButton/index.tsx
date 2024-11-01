import Button from '@/components/common/Button/Button';
import { LOGIN } from '@/common/constants/path.constant';
import { LoginButtonStyle } from '@/components/common/Button/LoginButton/login-button.style';

const LoginButton = () => {
  return (
    <LoginButtonStyle href={LOGIN} hasUnderline={false}>
      <Button type={'text'} style={{ padding: '0 1em' }}>
        Login
      </Button>
    </LoginButtonStyle>
  );
};

export default LoginButton;
