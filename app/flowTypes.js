// @flow
import * as React from 'react';

// CentraApi data typs
export type LoginData = {
  email: string,
  password: string,
};


// Navigator data types
export type ScreenConfig = {
  screen: React.ComponentType<any>,
  id: string,
  reducer?: null | Function,
}
