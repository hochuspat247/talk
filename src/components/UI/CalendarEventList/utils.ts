





export const parseDurationToMinutes = (duration: string): number => {
    const parts = duration.match(/^(?:(\d+)ч)?\s*(?:(\d+)мин)?$/);
    if (!parts) return 0;
  
    const hours = parseInt(parts[1] || '0', 10);
    const minutes = parseInt(parts[2] || '0', 10);
    return hours * 60 + minutes;
  };
  
  





  export const formatTotalDuration = (totalMinutes: number): string => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (hours === 0) return `${minutes}мин`;
    if (minutes === 0) return `${hours}ч`;
    return `${hours}ч ${minutes}мин`;
  };