export type OmitBaseEntity<T extends any | Omit<any, 'active'>> = Omit<T, 'active' | 'createdAt' | 'updatedAt'>
