import {DynamicModule, Global, Module} from "@nestjs/common";
import {PolarisNestLogger} from "./services/polaris-nest-logger";
import {PolarisLoggerFactory} from "./services/polaris-logger-factory.service";
import {PolarisNestLoggerOptions} from "./common/polaris-nest-logger-options";
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
}
