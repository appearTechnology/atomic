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

  async newTask(task: any) {
    await this.afs.collection(`task`).add(task)
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
}
