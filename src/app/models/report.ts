export enum ReportType {
    TOPIC, 
    DEBATE, 
    ARGUMENT,
    COMMENT, 
    REFORMULATION
}

export class Report {
    id: string = '';
    entityType: ReportType = ReportType.TOPIC;
    entityId: string = '';
    createdAt: Date = new Date();
}