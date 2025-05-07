export interface AvatarPickerProps {
    
    selectedImage: string | null;
    
    onImageChange: (uri: string) => void;
  }