import type {AWS} from '@serverless/typescript';

const serverlessConfiguration: AWS = {
    service: `${process.env.STAGE}-api`,
    frameworkVersion: '3',
    useDotenv: true,
    plugins: [
        'serverless-esbuild',
        'serverless-offline',
    ],
    provider: {
        name: 'aws',
        runtime: 'nodejs14.x',
        region: 'eu-west-1',
        stage: process.env.STAGE,
        deploymentBucket: `api-deployment`,
        apiGateway: {
            minimumCompressionSize: 1024,
            shouldStartNameWithService: true,
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
            NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
        },
    },
    // import the function via paths
    functions: {
        private: {
            handler: './src/api/handler/main.main',
            events: [
                {
                    http: {
                        method: 'ANY',
                        path: '/private/{proxy+}',
                        cors: true,
                        private: true,
                    },
                },
            ],
        },
        public: {
            handler: './src/api/handler/main.main',
            events: [
                {
                    http: {
                        method: 'ANY',
                        path: '/public/{proxy+}',
                        cors: true,
                    },
                },
            ],
        },
    },
    package: {individually: true},
    custom: {
        "serverless-offline": {
            httpPort: 8082,
            lambdaPort: 3004,
            apiKey: 'E0M7Yk6AXg9IaWhvHMN7NVkNVvc1zeY9XgVOWMhg',
            noPrependStageInUrl: true,
            useChildProcesses: true
        },
        esbuild: {
            bundle: true,
            minify: false,
            sourcemap: true,
            exclude: ['aws-sdk'],
            target: 'node14',
            define: {'require.resolve': undefined},
            platform: 'node',
            concurrency: 10,
            watch: {
                pattern: ['**/*.ts'],
            },
            plugins: './esbuild/plugin.js'
        },
    },
};

module.exports = serverlessConfiguration;
