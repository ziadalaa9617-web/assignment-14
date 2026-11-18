import { Admin, NoteBook, Storage, User } from "./notes.ts"

const student = new User(1, "Ali", "ali@example.com", "demo1", "01000000000", 21)
const admin = new Admin(2, "Mona", "mona@example.com", "demo2", "01100000000", 30)
const study = new NoteBook("Study")
const ideas = new NoteBook("Ideas")
student.addNotebook(study)
student.addNotebook(ideas)
student.displayInfo()

study.addNote("OOP", "A notebook creates and owns its notes.", student)
const draftId = study.addNote("Draft", "Review later", student)
study.showNotes()
admin.removeNoteFrom(study, draftId)
console.log("After the admin removes Draft:")
study.showNotes()

const numbers = new Storage<number>()
numbers.addItem(10)
numbers.addItem(20)
numbers.removeItem(10)
console.log("Numbers:", numbers.getAllItems())

const books = new Storage<NoteBook>()
books.addItem(study)
console.log("Stored notebooks:", books.getAllItems().map(book => book.name))
