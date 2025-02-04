/**
 * Base type for all SWR keys.
 *
 * @template Key - The unique key for the data.
 * @template Data - The data type, reserved for future use.
 */
export type KeyData<Key, Data> = {
  key: Key;
  __data?: undefined & Data;
};
