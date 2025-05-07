export interface Event {
    salonName: string;
    service: string;
    masterName: string;
    rating: number;
    time: string;
    duration: string;
    avatarUri?: string;
    status: 'confirmed' | 'active';
  }
  
  export interface CalendarEventListProps {
    
    events: Event[];
  
    
    onMorePress?: () => void;
  
    
    isMini?: boolean;
  }