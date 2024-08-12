import { borderRadius, color, spacer } from '@/shared/config/styles';

import Flex from '@/shared/ui/flex';
import OpenSearchModalButton from '@/features/modal';

const SidebarHeader = () => {
  return (
    <Flex
      justify={'flex-end'}
      align={'center'}
      etcStyles={{
        width: '100%',
        height: '100px',
        padding: `0 ${spacer.spacing4}`,
        borderRadius: `0 ${borderRadius.large} 0 0`,
        backgroundColor: color.gray,
      }}
    >
      <OpenSearchModalButton />
    </Flex>
  );
};

export default SidebarHeader;
