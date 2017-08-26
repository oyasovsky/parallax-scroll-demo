export class FakeConfigService {
    public mockConfig:{} = {
        api: {
            route: 'ROUTE',
            projects: {
                get: 'PROJECTS_GET'
            }
        }
    };

    public load() {
        return this.mockConfig;
    };

    public get() {
        return this.mockConfig;
    };
}