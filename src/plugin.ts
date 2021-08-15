import { PluginCommonModule, Type, VendurePlugin } from '@vendure/core';

import { Logger } from '@nestjs/common';

import { LOGGER_CTX, PLUGIN_OPTIONS } from './constants';
import { ExampleEntity } from './entities/example.entity';
import { ExampleService } from './service/example.service';
import { adminApiExtensions, shopApiExtensions } from './api/api-extensions';
import { ExampleResolver } from './api/example.resolver';
import { ExampleAdminResolver } from './api/example-admin.resolver';
import { WishlistPluginOptions } from './types';

/**
 * An example Vendure plugin.
 *
 * @example
 * ```TypeScript
 * export const config: VendureConfig = {
 *   //...
 *   plugins: [
 *     ExamplePlugin.init({
 *       // options
 *     }),
 *   ]
 * }
 * ```
 */
@VendurePlugin({
    // Importing the PluginCommonModule gives all of our plugin's injectables (services, resolvers)
    // access to the Vendure core providers. See https://www.vendure.io/docs/typescript-api/plugin/plugin-common-module/
    imports: [PluginCommonModule],
    entities: [ExampleEntity],
    adminApiExtensions: {
        schema: adminApiExtensions,
        resolvers: [ExampleResolver, ExampleAdminResolver],
    },
    shopApiExtensions: {
        schema: shopApiExtensions,
        resolvers: [ExampleResolver],
    },
    providers: [
        ExampleService,
        // By definiting the `PLUGIN_INIT_OPTIONS` symbol as a provider, we can then inject the
        // user-defined options into other classes, such as the {@link ExampleService}.
        { provide: PLUGIN_OPTIONS, useFactory: () => WishlistPlugin.options },
    ],
})
export class WishlistPlugin {
    static options: WishlistPluginOptions;

    /**
     * The static `init()` method is a convention used by Vendure plugins which allows options
     * to be configured by the user.
     */
    static init(options: WishlistPluginOptions): Type<WishlistPlugin> {
        Logger.verbose('Wishlist plugin starting...', LOGGER_CTX);

        this.options = options;
        return this;
    }
}
