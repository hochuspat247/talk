export interface FilterState {
    men: boolean;
    women: boolean;
    children: boolean;
  }
  
  export interface ClientFilterProps {
    
    onChange: (filters: FilterState) => void;
    
    initialValues?: Partial<FilterState>;
  }