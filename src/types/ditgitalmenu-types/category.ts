export interface ICategoryItem {
  category_id?: number;
  menu_id?: number;
  branch_id?: number;
  name?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
  is_active?: number;
  is_featured?: number;
  discount?: number;
  branchName?: string;
  image_base64?: string;
}
export interface ICategoryResult {
  status: string;
  message: string;
  result: Array<ICategoryItem>;
  errors: Array<any>;
}

export interface ICategoryAddDTO {
  title: string;
  description: string;
  level: number;
  thumbnail: {
    name: string;
    url: string;
  };
  items: [
    {
      id: 0;
      title: string;
      english_title: string;
      price: 0;
      discount: 0;
      details: {};
      available: true;
      featured: true;
      level: 0;
      thumbnail: {
        id: 0;
        name: string;
        url: string;
      };
      album: string[];
    }
  ];
  subCategories: [
    {
      id: 0;
      title: string;
      description: string;
      level: 0;
      thumbnail: {
        id: 0;
        name: string;
        url: string;
      };
      items: [
        {
          id: 0;
          title: string;
          english_title: string;
          price: 0;
          discount: 0;
          details: {};
          available: true;
          featured: true;
          level: 0;
          thumbnail: {
            id: 0;
            name: string;
            url: string;
          };
          album: [string];
        }
      ];
      subCategories: any[];
    }
  ];
}
