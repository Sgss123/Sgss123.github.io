declare module '@/utils/message' {
	export function showMsg(message: string, callback: (close: () => void) => void): void;
}
