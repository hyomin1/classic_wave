interface IScene {
  id: number;
  image: string;
  plotSummary: string;
  audioFile: string;
}

export interface IBookDetail {
  id: number;
  isbnId: string;
  authorName: string;
  name: string;
  folderName: string;
  sceneList: IScene[];
}

export interface IBook {
  totalElements: number;
  totalPages: number;
  size: number;
  content: IBookDetail[];

  number: number;
  sort: {
    empty: true;
    unsorted: true;
    sorted: true;
  };
  first: true;
  last: true;
  numberOfElements: number;
  pageable: {
    offset: number;
    sort: {
      empty: true;
      unsorted: true;
      sorted: true;
    };
    pageSize: number;
    paged: true;
    pageNumber: number;
    unpaged: true;
  };
  empty: true;
}
