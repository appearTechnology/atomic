import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from '../model/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  taskCollection: AngularFirestoreCollection<Task>;
  taskDoc: AngularFirestoreDocument<Task>;
  tasks: Observable<Task[]>;
  task: Observable<Task>;

  constructor(
    private afs: AngularFirestore
  ) { }

  newTask(task: any) {
    return this.afs.collection(`task`).add(task);
  }

  getTasks(id) {
    this.taskCollection = this.afs.collection<Task>('task', ref => ref.where('uid', '==', `${id}`))
    this.tasks = this.taskCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        if (a.payload.doc.exists == false) {
          return null
        } else {
          const data = a.payload.doc.data() as Task;
          const id = a.payload.doc.id;
          return { id, ...data };
        }
      }))
    );
    return this.tasks
  }

  updateTask(task, id) {
    return this.afs.collection<Task>('task').doc(id).update(task);
  }

  deleteTask(id) {
    return this.afs.collection<Task>('task').doc(id).delete();
  }
}
