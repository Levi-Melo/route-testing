export interface ILoggerService {
  info: ((object: object) => void) & ((string: string) => void)
  debug: ((object: object) => void) & ((string: string) => void)
  error: (err: Error) => void
}
