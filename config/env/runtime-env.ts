import { EnvNamespace } from '@/../helpers';

export const config: EnvNamespace.IRuntimeEnv[] = [
    {
        key: 'Develop',
        serverBaseUrls: [
            {
                key: 'default',
                development: 'http://172.22.24.111:4010',
            },
        ],
    },
];
