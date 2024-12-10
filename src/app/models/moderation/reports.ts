export type report = {
    id: string;
    entityId: string;
    entityType: string;
    userId: string;
    isModerated: boolean;
    isModeration2Required: boolean;
    isModerated2: boolean;
    createdAt: string;
    updatedAt: string;
}

export type reportEvent = {
    id: string;
    userId: string;
    reportingId: string;
    type: string;
    duration?: number;
    reason: string;
    createdAt: Date;
}

export type personalReport = {
    report: report;
    sanction: reportEvent;
}