export class Line {
  constructor(id, start) {
    this.id = id;
    this.start = start;
  }
  id;
  start;
  end;
  isComplete: boolean;
}
