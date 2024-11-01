import Button, { EButtonTheme } from '@/components/common/Button/Button';
import { REGISTER } from '@/common/constants/path.constant';
import { SignUpButtonStyle } from '@/components/common/Button/SignUpButton/sign-up-button.style';

const SignUpButton = () => {
  return (
    <SignUpButtonStyle href={REGISTER} hasUnderline={false}>
      <Button color={EButtonTheme.SECONDARY} type='default' style={{ padding: '0 1em' }}>
        Create account
      </Button>
    </SignUpButtonStyle>
  );
};

export default SignUpButton;
