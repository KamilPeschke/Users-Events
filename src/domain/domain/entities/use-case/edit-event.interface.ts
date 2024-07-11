export class IEditEventInput {
  location?: string;
  date?: Date;
  description?: string;
}

export class IEditEventOutput {
  currentUser: number;
  id: number;
  location?: string;
  date?: Date;
  description?: string;
}
