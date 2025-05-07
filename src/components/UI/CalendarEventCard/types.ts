export interface CalendarEventCardProps {
    /** Название салона. */
    salonName: string;
  
    /** Название услуги. */
    service: string;
  
    /** Имя мастера. */
    masterName: string;
  
    /** Рейтинг мастера. */
    rating: number;
  
    /** Время события. */
    time: string;
  
    /** Продолжительность события. */
    duration: string;
  
    /** URI аватара мастера (опционально). */
    avatarUri?: string;
  
    /** Статус события (по умолчанию 'confirmed'). */
    status?: 'confirmed' | 'active';
  
    /** Мини-режим отображения (по умолчанию false). */
    isMini?: boolean;
  }
  
  export interface StatusStyles {
    container: object;
    text: object;
    symbolContainer: object;
    symbol: object;
  }