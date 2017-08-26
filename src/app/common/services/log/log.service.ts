import { Injectable } from '@angular/core';

import Logger           from 'log4ts/build/Logger';
import LoggerConfig     from 'log4ts/build/LoggerConfig';
import BasicLayout      from 'log4ts/build/layouts/BasicLayout';
import ConsoleAppender  from 'log4ts/build/appenders/ConsoleAppender';
import { IAppender }    from 'log4ts/build/IAppender';
import { ILayout }      from 'log4ts/build/ILayout';
import { LogLevel }     from 'log4ts/build/LogLevel';

import { ILogService }  from '../../../common/interfaces/log/ilog.service';

class LoggerConfiguration {
    public static get LOG_LEVEL(): LogLevel { return LogLevel.ALL; }
}

@Injectable()
export class LogService implements ILogService {

    private _log: Logger;

    private _appender: IAppender;
    private _layout: ILayout;
    private _config: LoggerConfig;

    constructor() {
        this._layout = new BasicLayout();
        this._appender = new ConsoleAppender();
        this._appender.setLayout(this._layout);
        this._config = new LoggerConfig(this._appender);
        this._config.setLevel(LoggerConfiguration.LOG_LEVEL);
        this._log = new Logger();
        Logger.setConfig(this._config);
    }

    debug(message, ...args) {
        this._log.debug(message, args);
    }
    error(message, ...args) {
        this._log.error(message, args);
    }
    info(message, ...args) {
        this._log.info(message, args);
    }
    log(message, ...args) {
        this._log.log(message, args);
    }
    trace(message, ...args) {
        this._log.trace(message, args);
    }
    warn(message, ...args) {
        this._log.warn(message, args);
    }
}
