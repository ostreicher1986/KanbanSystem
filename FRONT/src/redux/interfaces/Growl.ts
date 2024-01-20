export interface Growl {
    show: boolean;
    severity: "success" | "info" | "warn" | "error" | undefined;
    summary: string;
    detail: string;
    life: number;
}