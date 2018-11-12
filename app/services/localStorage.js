/**
 * APIs for managing data in localStorage.
 *
 * @flow
 */
import { persistor } from '../store';


// purge state from disk and returns a promise.
export const localPurge = () => persistor.purge();

// immediately writes all pending state to disk and returns a promise.
export const localFlush = () => persistor.flush();

export const pausePersistence = () => persistor.pause();

export const resumPersistence = () => persistor.persist();
