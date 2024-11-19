export type report = {
    id: string;
    entityId: string;
    entityType: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
}

export type reportEvent = {
    id: string;
    userId: string;
    reportId: string;
    type: string;
    duration?: number;
    reason: string;
    createdAt: Date;
}

export type personalReport = {
    report: report;
    sanction: reportEvent;
}