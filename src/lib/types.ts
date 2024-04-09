export interface TEAM {
  teamName: string;
  _id: string;
  createdBy: string;
}

export interface FILE {
  teamId: string;
  _id: string;
  createdBy: string;
  fileName: string;
  archive: boolean;
  document: string;
  whiteboard: string;
  createdAt: string;
}
