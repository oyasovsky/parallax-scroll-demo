export interface ILogService {
    debug(message, ...args);
    error(message, ...args);
    info(message, ...args);
    log(message, ...args);
    trace(message, ...args);
    warn(message, ...args);
}
