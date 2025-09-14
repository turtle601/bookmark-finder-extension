import { BookmarkMessageEvent } from './bookmarkMessageEvent';
import { ChromeTabMessageEvent } from './chromeTabMessageEvent';

const MessageEvent = {
  ...BookmarkMessageEvent,
  ...ChromeTabMessageEvent,
} as const;

class BackgroundMessageEvent {
  public init() {
    this._messageEventListener();
  }

  private _messageEventListener = () => {
    const event = (
      ...args: Parameters<(typeof MessageEvent)[keyof typeof MessageEvent]>
    ) => {
      const handler = MessageEvent[args[0].action];

      if (handler) {
        (handler as (...args: Parameters<typeof handler>) => void)(...args);
      }

      return true;
    };

    chrome.runtime.onMessage.addListener(event);
  };
}

export default BackgroundMessageEvent;
