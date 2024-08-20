import React from 'react';
import { color, spacer } from '@/shared/config/styles';

import WarningIcon from '@/shared/config/assets/warning.svg';

import Flex from '@/shared/ui/flex';
import Text from '@/shared/ui/text';
import Spacer from '@/shared/ui/spacer';

export interface IErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<IErrorMessageProps> = ({ message }) => {
  const isShow = !!message;

  return (
    isShow && (
      <Flex
        align={'center'}
        etcStyles={{
          height: '36px',
        }}
      >
        <div>
          <WarningIcon />
        </div>
        <Spacer direction="horizontal" space={spacer.spacing1}></Spacer>
        <Text label={message} textColor={color.red} type="sm" />
      </Flex>
    )
  );
};
