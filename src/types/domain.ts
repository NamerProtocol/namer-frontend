export interface Domain {
    id: string;
    address: string;
    hPrice: number;
    name: string;
    parentId: string;
    price: number;
    fullName: string;
    owner: string;
    level: number;
    linkedAddresses: { chain: string; address: string }[];
    subDomains: string[];
    subPrice: number;
    additionalData?: any;
}
