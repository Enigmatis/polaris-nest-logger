import {DynamicModule, Global, Module, Provider} from "@nestjs/common";
import {PolarisNestLogger} from "./services/polaris-nest-logger";
import {PolarisLoggerFactory} from "./services/polaris-logger-factory.service";
import {PolarisNestLoggerAsyncOptions, PolarisNestLoggerOptions} from "./common/polaris-nest-logger-options";
import {LoggerOptionsToken} from "./common/constants";

@Global()
@Module({})
export class PolarisNestLoggerModule {
    static register(options: PolarisNestLoggerOptions): DynamicModule {
        return {
            module: PolarisNestLoggerModule,
            providers: [{provide: LoggerOptionsToken, useValue: options},
                PolarisNestLogger, PolarisLoggerFactory],
            exports: [PolarisNestLogger]
        };
    }

    static registerAsync(options: PolarisNestLoggerAsyncOptions): DynamicModule {
        return {
            module: PolarisNestLoggerModule,
            providers: [PolarisNestLogger, PolarisLoggerFactory, this.createConfigurationProvider(options)],
            imports: options.imports,
            exports: [PolarisNestLogger]
        }
    }

    private static createConfigurationProvider(options: PolarisNestLoggerAsyncOptions): Provider {
        return {
            provide: LoggerOptionsToken,
            useFactory: options.useFactory,
            inject: options.inject,
        };
    }
}
