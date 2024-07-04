import { useEffect } from 'react';

type CmdKeyType = 'cmd' | 'ctrl' | 'alt' | 'shift' | 'esc';
type AlphabetKeyType =
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z';

interface IUseCommandParameter {
  cmdKeys: (CmdKeyType | AlphabetKeyType)[];
  action: VoidFunction;
}

const getKeyMap = (event: KeyboardEvent) => {
  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const isWindows = navigator.platform.toUpperCase().indexOf('WIN') >= 0;

  const keyMap: { [key: string]: boolean } = {
    ctrl: (isWindows && event.ctrlKey) || (isMac && event.metaKey),
    alt: event.altKey,
    shift: event.shiftKey,
    esc: event.key === 'Escape',
  };

  Array(26)
    .fill(0)
    .forEach((v, i) => {
      const char = String.fromCharCode(97 + i);
      keyMap[char] = event.key.toLowerCase() === char;
    });

  return keyMap;
};

export const useCommand = ({ cmdKeys, action }: IUseCommandParameter) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const keyMap = getKeyMap(event);
      const allCommandsPressed = cmdKeys.every((cmd) => keyMap[cmd]);

      if (allCommandsPressed) {
        event.preventDefault();
        action();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [cmdKeys, action]);
};
