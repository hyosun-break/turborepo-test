import { toMatchImageSnapshot } from 'jest-image-snapshot';
import '@testing-library/jest-dom/extend-expect';

expect.extend({ toMatchImageSnapshot });
