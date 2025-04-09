export interface Character {
  id: string;
  name: string;
  image: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  dropRate: number;
  amount: number;
  description: string;
}

export interface CharacterRequest {
  name: string;
  image: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  dropRate: number;
  amount: number;
  description: string;
}