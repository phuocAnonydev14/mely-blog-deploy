'use client';

import { Modal } from 'antd';
import FormLoginRegister from '@/components/page/auth/FormLoginRegister/FormLoginRegister';
import { LOGIN } from '@/common/constants/path.constant';
import { usePathname } from 'next/navigation';

interface FormModalProps {
  open: boolean;
  onClose: () => void;
}

export const AuthModal = ({ onClose, open }: FormModalProps) => {
  const pathname = usePathname();
  return (
    <Modal
      className=''
      style={{ background: 'transparent' }}
      open={open}
      onCancel={onClose}
      footer={null}
      width={600}
      centered
    >
      <FormLoginRegister isModal={true} currentUrl={pathname} url={LOGIN} />
    </Modal>
  );
};
