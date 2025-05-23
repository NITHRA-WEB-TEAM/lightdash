import type { KnexPaginatedData } from './knex-paginate';
import { type ChartKind } from './savedCharts';

export enum ContentType {
    CHART = 'chart',
    DASHBOARD = 'dashboard',
    SPACE = 'space',
}

export interface Content {
    contentType: ContentType;
    uuid: string;
    slug: string;
    name: string;
    description: string | null;
    createdAt: Date;
    createdBy: {
        uuid: string;
        firstName: string;
        lastName: string;
    } | null;
    lastUpdatedAt: Date | null;
    lastUpdatedBy: {
        uuid: string;
        firstName: string;
        lastName: string;
    } | null;
    project: {
        uuid: string;
        name: string;
    };
    organization: {
        uuid: string;
        name: string;
    };
    space: {
        uuid: string;
        name: string;
    };
    pinnedList: {
        uuid: string;
    } | null;
    views: number;
    firstViewedAt: Date | null;
}

export enum ContentSortByColumns {
    NAME = 'name',
    SPACE_NAME = 'space_name',
    LAST_UPDATED_AT = 'last_updated_at',
}

// Chart types

export enum ChartSourceType {
    DBT_EXPLORE = 'dbt_explore',
    SQL = 'sql',
    SEMANTIC_LAYER = 'semantic_layer',
}

export interface ChartContent extends Content {
    contentType: ContentType.CHART;
    source: ChartSourceType;
    chartKind: ChartKind;
    dashboard: {
        uuid: string;
        name: string;
    } | null;
}

// Dashboard types

export interface DashboardContent extends Content {
    contentType: ContentType.DASHBOARD;
}

export interface SpaceContent extends Content {
    contentType: ContentType.SPACE;
    isPrivate: boolean;
    access: string[];
    dashboardCount: number;
    chartCount: number;
    pinnedList: {
        uuid: string;
        order: number;
    } | null;
    parentSpaceUuid: string | null;
    path: string;
}

// Group types

export type SummaryContent = ChartContent | DashboardContent | SpaceContent; // Note: more types will be added.

// API types

export type ApiContentResponse = {
    status: 'ok';
    results: KnexPaginatedData<SummaryContent[]>;
};

export type ApiChartContentResponse = {
    status: 'ok';
    results: KnexPaginatedData<ChartContent[]>;
};
