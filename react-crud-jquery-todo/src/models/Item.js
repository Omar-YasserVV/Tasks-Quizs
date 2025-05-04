// src/models/Item.js
export class Item {
  constructor(id, name, description) {
    this.id = id;
    this.name = name;
    this.description = description;
  }

  update(newName, newDescription) {
    this.name = newName;
    this.description = newDescription;
  }

  getInfo() {
    return `${this.name}: ${this.description}`;
  }
}
