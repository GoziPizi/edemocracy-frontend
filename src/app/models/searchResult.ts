export type SearchResult = {
    id: string; 
    title: string;
    description: string;
    picture: string;
    type: 'Topic' | 'Personality' | 'Party'
}