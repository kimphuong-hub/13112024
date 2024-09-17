export type MenuModal = {
  open: boolean;
  onClose: () => void;
};

export type MenuRoute = {
  id: string | number;
  icon?: string;
  path?: string;
  modal?: (props: MenuModal) => JSX.Element;
  title: string;
  children?: MenuRoute[];
};

export type BreadcrumbRoute =
  | {
      id: string | number;
      path?: string;
      title?: string;
      navigate?: boolean;
    }
  | {
      id: string | number;
      path: string;
      title?: string;
      navigate: boolean;
    };
