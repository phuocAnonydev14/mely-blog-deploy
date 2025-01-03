import Button, { EButtonTheme } from '@/components/common/Button/Button';
import Icon from '@mdi/react';
import { mdiFacebook, mdiGithub, mdiGoogle } from '@mdi/js';
import React from 'react';
import { ButtonGroupStyle } from '@/components/page/auth/ButtonGroup/button-group.style';
import { EAuthProvider } from '@/common/enums/app.enum';
import { authService } from '@/services/auth.service';

export interface IButtonAction {
  id: string | number;
  name?: string;
  icon?: React.ReactNode;
  action?: () => void | Promise<void>;
}

interface ButtonGroupProps {
  currentUrl?: string;
}

export const ButtonGroup = ({ currentUrl }: ButtonGroupProps) => {
  const btns: IButtonAction[] = [
    {
      id: EAuthProvider.GOOGLE,
      icon: <Icon path={mdiGoogle} size={1.5} />,
      action: async () => {
        await authService.signIn({ provider: EAuthProvider.GOOGLE }, currentUrl);
      },
    },
    {
      id: EAuthProvider.FACEBOOK,
      icon: <Icon path={mdiFacebook} size={1.5} />,
      action: async () => {
        await authService.signIn({ provider: EAuthProvider.FACEBOOK }, currentUrl);
      },
    },
    {
      id: EAuthProvider.GITHUB,
      icon: <Icon path={mdiGithub} size={1.5} />,
      action: async () => {
        await authService.signIn({ provider: EAuthProvider.GITHUB }, currentUrl);
      },
    },
  ];
  return (
    <ButtonGroupStyle className={'flex justify-between'}>
      {btns.map((btn: IButtonAction) => {
        return (
          <Button
            key={btn.id}
            onClick={btn.action}
            color={EButtonTheme.SECONDARY}
            type={'primary'}
            className={'btn-action'}
          >
            {btn.icon}
          </Button>
        );
      })}
    </ButtonGroupStyle>
  );
};
