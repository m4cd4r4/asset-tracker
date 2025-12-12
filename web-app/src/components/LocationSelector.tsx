import { LOCATIONS } from '@/types';
import { useStore } from '@/store/useStore';

export function LocationSelector() {
  const { currentLocation, setLocation } = useStore();

  return (
    <div className="flex flex-wrap gap-2 p-4 bg-white border-b">
      {LOCATIONS.map((location) => (
        <button
          key={location.id}
          onClick={() => setLocation(location.id)}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            currentLocation === location.id
              ? 'bg-primary-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {location.name}
        </button>
      ))}
    </div>
  );
}
