export interface CalendarEventCardProps {
    
    salonName: string;
  
    
    service: string;
  
    
    masterName: string;
  
    
    rating: number;
  
    
    time: string;
  
    
    duration: string;
  
    
    avatarUri?: string;
  
    
    status?: 'confirmed' | 'active';
  
    
    isMini?: boolean;
  }
  
  export interface StatusStyles {
    container: object;
    text: object;
    symbolContainer: object;
    symbol: object;
  }