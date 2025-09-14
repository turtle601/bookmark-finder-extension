import { useToggle } from '@/v3/shared/hooks/useToggle';
import { DropDownContext } from '@/v3/shared/ui/dropdown/model';

interface IDropDownProviderProps {
  children: React.ReactNode;
}

function Provider({ children }: IDropDownProviderProps) {
  const { value: isOpen, close, toggle } = useToggle();

  const contextValue = {
    isOpen,
    toggle,
    close,
  };

  return (
    <DropDownContext.Provider value={contextValue}>
      {children}
    </DropDownContext.Provider>
  );
}

export default Provider;
