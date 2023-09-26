import { EnvNamespace } from '@/../helpers';

export const config: EnvNamespace.IRuntimeEnv[] = [
    {
        key: 'Develop',
        serverBaseUrls: [
            {
                key: 'default',
                development: 'http://4.194.19.250',
            },
        ],
    },
];
