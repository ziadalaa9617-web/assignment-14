export class User {
  public readonly id: number
  public name: string
  public email: string
  private password: string
  protected phone: string
  public readonly age: number
  private notebooks: NoteBook[] = []

  constructor(id: number, name: string, email: string, password: string, phone: string, age: number) {
    if (!Number.isInteger(age) || age < 18 || age > 60) {
      throw new Error("Age must be a whole number between 18 and 60.")
    }
    this.id = id
    this.name = name
    this.email = email
    this.password = password
    this.phone = phone
    this.age = age
  }

  addNotebook(notebook: NoteBook): void {
    if (!this.notebooks.includes(notebook)) this.notebooks.push(notebook)
  }

  displayInfo(): void {
    console.log(this.id, this.name, this.email, this.phone, this.age)
    console.log("Notebooks:", this.notebooks.map(book => book.name).join(", "))
  }
}

export class Note {
  public readonly id: number
  public title: string
  public content: string
  public readonly userId: User

  constructor(id: number, title: string, content: string, author: User) {
    this.id = id
    this.title = title
    this.content = content
    this.userId = author
  }

  preview(): string {
    if (this.content.length <= 30) return this.content
    return this.content.slice(0, 30) + "..."
  }
}

export class NoteBook {
  public name: string
  private notes: Note[] = []
  private nextId = 1

  constructor(name: string) {
    this.name = name
  }

  addNote(title: string, content: string, author: User): number {
    const note = new Note(this.nextId, title, content, author)
    this.notes.push(note)
    this.nextId++
    return note.id
  }

  removeNote(id: number): void {
    this.notes = this.notes.filter(note => note.id !== id)
  }

  showNotes(): void {
    for (const note of this.notes) {
      console.log(note.id, note.title, "-", note.preview(), "by", note.userId.name)
    }
  }
}

export class Admin extends User {
  removeNoteFrom(notebook: NoteBook, noteId: number): void {
    notebook.removeNote(noteId)
  }
}

export class Storage<T> {
  private items: T[] = []

  addItem(item: T): void {
    this.items.push(item)
  }

  removeItem(item: T): void {
    const index = this.items.indexOf(item)
    if (index !== -1) this.items.splice(index, 1)
  }

  getAllItems(): T[] {
    return [...this.items]
  }
}
