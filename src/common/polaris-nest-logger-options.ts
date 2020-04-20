import {ApplicationProperties, LoggerConfiguration} from "@enigmatis/polaris-logs";
import {ModuleMetadata} from "@nestjs/common/interfaces";

export interface PolarisNestLoggerOptions {
    applicationProperties: ApplicationProperties;
    loggerConfiguration: LoggerConfiguration;
}

export interface PolarisNestLoggerAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    useFactory: (...args: any[]) => Promise<PolarisNestLoggerOptions> | PolarisNestLoggerOptions;
    inject? : any[];
}
