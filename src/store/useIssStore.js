import { create } from 'zustand';

export const useIssStore = create((set, get) => ({
  currentPosition: null,
  history: [], // Last 15 positions
  speedHistory: [], // Last 30 speed measurements
  currentSpeed: 0,
  astronauts: [],
  nearestLocation: null,
  isLoading: true,
  error: null,
  
  updatePosition: (position, speed) => set((state) => {
    const newHistory = [...state.history, position];
    if (newHistory.length > 15) newHistory.shift();
    
    let newSpeedHistory = [...state.speedHistory];
    if (speed !== null && speed !== undefined) {
      newSpeedHistory = [...state.speedHistory, { time: new Date(position.timestamp * 1000).toLocaleTimeString(), speed }];
      if (newSpeedHistory.length > 30) newSpeedHistory.shift();
    }

    return {
      currentPosition: position,
      history: newHistory,
      currentSpeed: speed !== null ? speed : state.currentSpeed,
      speedHistory: newSpeedHistory,
      isLoading: false,
      error: null
    };
  }),
  
  setAstronauts: (astronauts) => set({ astronauts }),
  setNearestLocation: (location) => set({ nearestLocation: location }),
  setError: (error) => set({ error, isLoading: false }),
  setLoading: (isLoading) => set({ isLoading })
}));
