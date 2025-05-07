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
    /** Список событий для отображения. */
    events: Event[];
  
    /** Обработчик нажатия на кнопку "Показать больше" (опционально). */
    onMorePress?: () => void;
  
    /** Мини-режим отображения карточек (по умолчанию true). */
    isMini?: boolean;
  }