import '@testing-library/jest-dom';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { toHaveNoViolations } from 'jest-axe';

/**
 * Extend expect to include jest-axe matcher
 */
expect.extend(toHaveNoViolations);

/**
 * magic import jest-dom adds Jest matchers to `expect`
 */

/*
 * Make all Jest unit tests use a constitent timestamp  so that these unit
 * tests work across environments with diff timezones (CI, local dev, etc.)
 */

beforeEach(() => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.tz.setDefault('Africa/Lagos');

  global.localStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  };

  global.chrome = {
    runtime: { sendMessage: jest.fn() },
  };
});

afterEach(() => {});

window.open = jest.fn();
window.scrollTo = jest.fn();
window.document.createRange = () => {
  return {
    selectNodeContents: jest.fn(),
  };
};
window.document.execCommand = jest.fn();

window.getSelection = () => {
  return {
    removeAllRanges: jest.fn(),
    addRange: jest.fn(),
  };
};

window.URL.createObjectURL = jest.fn();

const oldLocation = window.location;

beforeAll(() => {
  window.setImmediate = window.setTimeout; //had to add this for it to start the loop

  delete window.location;
  // delete performance and don't restore it
  // so that @sinon/fake-timers can mock it
  delete window.performance;

  window.location = Object.defineProperties(
    {},
    {
      ...Object.getOwnPropertyDescriptors(oldLocation),
      assign: {
        configurable: true,
        value: jest.fn(),
      },
      reload: {
        configurable: true,
        value: jest.fn(),
      },
      replace: {
        configurable: true,
        value: jest.fn(),
      },
    }
  );

  const div = document.createElement('div');
  div.setAttribute('id', 'portal-root');
  document.body.appendChild(div);
});
afterAll(() => {
  // restore `window.location` to the original `jsdom`
  // `Location` object
  window.location = oldLocation;
  delete window.setImmediate;
  const el = document.getElementById('portal-root');
  el.remove();
});
