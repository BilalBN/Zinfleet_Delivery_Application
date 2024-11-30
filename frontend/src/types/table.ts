export enum Align {
    left = 'left',
    right = 'right',
    center = 'center',
  }


  export type Column = {
    title: string;
    dataIndex: string;
    key: string;
    width: string;
    align?: Align;
    render?: (row: any) => JSX.Element | string;
  };
  