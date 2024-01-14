export interface SynonymResponse {
    id: number;
    name: string;
    description: string;
    parentId: number | null;
    relatedSynonyms: SynonymResponse[];
}