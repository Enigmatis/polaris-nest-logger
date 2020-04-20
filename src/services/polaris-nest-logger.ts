import {PolarisLogger, PolarisLogProperties} from "@enigmatis/polaris-logs";
import {Inject, Injectable, LoggerService} from "@nestjs/common";
import {PolarisLoggerFactory} from "./polaris-logger-factory.service";
import {PolarisNestLoggerOptions} from "../common/polaris-nest-logger-options";
import {LoggerOptionsToken} from "../common/constants";

@Injectable()
/**
 * levels: verbose < debug < log < warn < error < fatal
 */
export class PolarisNestLogger implements LoggerService {
    private polarisLogger: PolarisLogger;

    constructor(@Inject(LoggerOptionsToken)
                private options: PolarisNestLoggerOptions, private polarisLoggerService: PolarisLoggerFactory) {
        this.polarisLogger = polarisLoggerService.createPolarisLogger(options.loggerConfiguration, options.applicationProperties);
    }

    /**
     * Alias to info
     * @param message
     * @param contextOrPolarisLogProperties
     */
    log(message: string, contextOrPolarisLogProperties?: string | PolarisLogProperties) {
        if (typeof contextOrPolarisLogProperties === 'string') {
            this.info(message, {customProperties: {nestJsContext: contextOrPolarisLogProperties}});
        } else {
            this.info(message, contextOrPolarisLogProperties);
        }
    }

    private info(message: string, properties?: PolarisLogProperties) {
        this.polarisLogger.info(message, properties);
    }

    error(message: string, trace?: string, contextOrPolarisLogProperties?: string | PolarisLogProperties) {
        if ((trace && !contextOrPolarisLogProperties) || typeof contextOrPolarisLogProperties === 'string') {
            this.polarisLogger.error(message, {
                customProperties: {
                    nestJsContext: contextOrPolarisLogProperties,
                    nestJsTrace: trace,
                }
            });
        } else {
            this.polarisLogger.error(message, contextOrPolarisLogProperties);
        }
    }

    /**
     * Worse than error
     * @param message
     * @param properties
     */
    fatal(message: string, properties?: PolarisLogProperties) {
        this.polarisLogger.fatal(message, properties);
    }

    warn(message: string, contextOrPolarisLogProperties?: string | PolarisLogProperties) {
        if (typeof contextOrPolarisLogProperties === 'string') {
            this.polarisLogger.warn(message, {customProperties: {nestJsContext: contextOrPolarisLogProperties}});
        } else {
            this.polarisLogger.warn(message, contextOrPolarisLogProperties);
        }
    }

    debug(message: string, contextOrPolarisLogProperties?: string | PolarisLogProperties) {
        if (typeof contextOrPolarisLogProperties === 'string') {
            this.polarisLogger.debug(message, {customProperties: {nestJsContext: contextOrPolarisLogProperties}});
        } else {
            this.polarisLogger.debug(message, contextOrPolarisLogProperties);
        }
    }

    /**
     * Alias to trace
     * @param message
     * @param contextOrPolarisLogProperties
     */
    verbose(message: string, contextOrPolarisLogProperties?: string | PolarisLogProperties) {
        if (typeof contextOrPolarisLogProperties === 'string') {
            this.trace(message, {customProperties: {nestJsContext: contextOrPolarisLogProperties}});
        } else {
            this.trace(message, contextOrPolarisLogProperties);
        }
    }

    private trace(message: string, properties?: PolarisLogProperties) {
        this.polarisLogger.trace(message, properties);
    }
}
