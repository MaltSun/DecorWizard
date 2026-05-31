export interface CatalogPopupProps {
    name: string;
    price: number;
    image: string;
    id: string;
    carbs: number;
    proteins: number;
    fats: number;
    kkal: number;
    description: string;
    composition?: string;
    onClose: () => void;
}