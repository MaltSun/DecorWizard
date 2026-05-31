export interface ReviewModalProps {
    open: boolean;
    onClose: () => void;
    orderId: string;
    onSuccess: () => void;
}