
// async related methods
import { Timeout } from 'types';

// return a promise when setTimeout() finished
export const timeout: Timeout = (time) => new Promise(resolve => setTimeout(resolve, time));