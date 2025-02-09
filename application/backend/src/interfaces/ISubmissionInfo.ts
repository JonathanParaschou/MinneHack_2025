export interface SubmissionInfo {
    photoURL: string;
    prompt: string;
    creatorId: string;
    submittedAt: Date;
    comments: any[];
    contestId?: string;
    votes?: number;
    totalVotes?: number;
    submissionId: string;
}