import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, 
  Cloud, 
  Home, 
  Grid, 
  User, 
  ShoppingCart,
  MoreVertical, 
  AlertCircle, 
  CheckCircle2,
  Tv,
  Headset,
  X,
  Percent,
  Plus,
  Search,
  Filter
} from 'lucide-react';

function ManageCharactersPage() {
  const navigate = useNavigate();
  const [showAllModal, setShowAllModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRarity, setFilterRarity] = useState<'Common' | 'Rare' | 'Epic' | 'Legendary' | 'All'>('All');
  const [tempSelectedCharacters, setTempSelectedCharacters] = useState<string[]>([]);

  // Set initial state to null (no default characters)
  const [characterCards, setCharacterCards] = useState<Array<{
    id: string;
    name: string;
    image: string;
    rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
    dropRate: number;
    amount: number;
    description: string;
    selected: boolean;
  }> | null>(null);

  // Wrapping the fetch call in an async function
  const fetchCharacters = async () => {
    try {
      console.log('Fetching characters from API...');
      const res = await fetch('http://localhost:5001/characters');
      const data = await res.json();
      console.log('Fetched data:', data);
      if (Array.isArray(data)) {
        setCharacterCards(data);
        return data;
      }
    } catch (err) {
      console.error('Error fetching characters:', err);
    }
    return [];
  };

  useEffect(() => {
    fetch('http://localhost:5001/characters')
      .then((res) => res.json())
      .then((data) => {
        console.log('DB data:', data);
      })
      .catch((error) => {
        console.error('Error fetching DB data:', error);
      });
  }, []);

  // Load data when component mounts
  useEffect(() => {
    fetchCharacters();
  }, []);

  useEffect(() => {
    console.log('Current characterCards state:', characterCards);
  }, [characterCards]);

  // Show loading indicator while waiting for data
  if (characterCards === null) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // Compute filtered list
  const filteredCharacters = characterCards.filter(char => {
    const matchesSearch = char.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         char.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRarity = filterRarity === 'All' || char.rarity === filterRarity;
    return matchesSearch && matchesRarity;
  });

  const toggleCharacterSelection = (id: string) => {
    setTempSelectedCharacters(prev => {
      return prev.includes(id)
        ? prev.filter(charId => charId !== id)
        : [ ...prev, id ];
    });
  };

  const handleSubmitSelection = async () => {
    try {
      const response = await fetch('http://localhost:5001/characters/selected', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selectedIds: tempSelectedCharacters }),
      });
      if (response.ok) {
        // Refresh the local state from the DB
        await fetchCharacters();
        setShowAllModal(false);
        setTempSelectedCharacters([]);
      } else {
        console.error('Failed to update selected characters');
      }
    } catch (error) {
      console.error('Error during update:', error);
    }
  };

  const handleDeselectAll = () => {
    setTempSelectedCharacters([]);
  };

  const handleSelectAll = () => {
    // Select all character IDs from the filtered list
    setTempSelectedCharacters(filteredCharacters.map((character) => character.id));
  };

  const handleRemoveCharacter = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5001/characters/deselect/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        setCharacterCards(prev =>
          prev!.map(char =>
            char.id === id ? { ...char, selected: false } : char
          )
        );
      } else {
        console.error('Failed to update character selection to false in DB');
      }
    } catch (error) {
      console.error('Error in handleRemoveCharacter:', error);
    }
  };

  const getRarityColor = (rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary') => {
    switch (rarity) {
      case 'Common': return 'text-gray-600';
      case 'Rare': return 'text-blue-600';
      case 'Epic': return 'text-purple-600';
      case 'Legendary': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getRarityBgColor = (rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary') => {
    switch (rarity) {
      case 'Common': return 'bg-gray-100';
      case 'Rare': return 'bg-blue-100';
      case 'Epic': return 'bg-purple-100';
      case 'Legendary': return 'bg-yellow-100';
      default: return 'bg-gray-100';
    }
  };

  const selectedCharacters = characterCards.filter(char => char.selected);
  const unselectedCharacters = filteredCharacters.filter(char => !char.selected);

  const Modal = ({ children }: { children: React.ReactNode }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {children}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Main Page */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Selected Characters</h1>
          <button 
            onClick={() => {
              // When modal opens, use the selected characters from the DB result
              setTempSelectedCharacters(characterCards.map(char => char.id));
              setShowAllModal(true);
            }}
            className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Characters
          </button>
        </div>

        {/* Display Selected Characters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Characters Pool ({selectedCharacters.length})</h2>
          {selectedCharacters.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No characters selected. Click "Add Characters" below to choose characters from the database.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedCharacters.map((character) => (
                <div 
                  key={character.id} 
                  className={`relative rounded-lg border p-4 ${getRarityBgColor(character.rarity)} bg-opacity-20 group`}
                >
                  <button
                    onClick={() => handleRemoveCharacter(character.id)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded-full"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                  <div className="flex items-start space-x-4">
                    <img
                      src={character.image}
                      alt={character.name}
                      className="w-20 h-20 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{character.name}</h3>
                        <span className={`text-sm font-medium ${getRarityColor(character.rarity)}`}>
                          {character.rarity}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <Percent className="w-4 h-4 mr-1" />
                          <span>Drop Rate: {character.dropRate}%</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <span>Amount: {character.amount}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Character Selection Modal pulls data from the database */}
      {showAllModal && (
        <Modal>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Select Characters</h2>
              <button
                onClick={() => setShowAllModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Search and Filter */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search characters..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                />
              </div>
              <div className="relative">
                <select
                  value={filterRarity}
                  onChange={(e) => setFilterRarity(e.target.value as typeof filterRarity)}
                  className="appearance-none pl-10 pr-8 py-2 border rounded-lg"
                >
                  <option value="All">All Rarities</option>
                  <option value="Common">Common</option>
                  <option value="Rare">Rare</option>
                  <option value="Epic">Epic</option>
                  <option value="Legendary">Legendary</option>
                </select>
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

{/* Character Grid from Database */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[60vh] overflow-y-auto">
  {unselectedCharacters.map((character) => (
    <div 
      key={character.id} 
      className={`relative bg-white rounded-lg border p-4 hover:shadow-md transition-shadow
        ${tempSelectedCharacters.includes(character.id) ? 'border-purple-500 bg-purple-50' : 'border-gray-200'}`}
    >
      {tempSelectedCharacters.includes(character.id) && (
        <div className="absolute top-2 right-2">
          <CheckCircle2 className="w-6 h-6 text-purple-600" />
        </div>
      )}
      <div className="flex items-start space-x-4">
        <img
          src={character.image}
          alt={character.name}
          className="w-20 h-20 rounded-xl object-cover"
        />
        <div className="flex-1">
          <h3 className="font-medium">{character.name}</h3>
          <span className={`text-sm font-medium ${getRarityColor(character.rarity)}`}>
            {character.rarity}
          </span>
          <div className="flex items-center mt-1 text-sm text-gray-500">   
            <span>Drop Rate: {character.dropRate}</span>
            <Percent className="w-4 h-4 mr-1" />
          </div>
          <div className="mt-1 text-sm text-gray-500">
            <span>Amount: {character.amount}</span>
          </div>
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">{character.description}</p>
          <button
            onClick={() => toggleCharacterSelection(character.id)}
            className={`mt-4 w-full px-3 py-2 border rounded text-sm font-medium
              ${tempSelectedCharacters.includes(character.id)
                ? 'border-purple-300 text-purple-600 bg-purple-50'
                : 'border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
          >
            {tempSelectedCharacters.includes(character.id) ? 'Selected' : 'Select'}
          </button>
        </div>
      </div>
    </div>
  ))}
</div>

            {/* Submit Selection Button */}
            <div className="mt-6 flex justify-end border-t pt-4 space-x-4">
              <button
                onClick={handleSelectAll}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Select All
              </button>
              <button
                onClick={handleDeselectAll}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Deselect All
              </button>
              <button
                onClick={handleSubmitSelection}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Submit Selection
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default ManageCharactersPage;